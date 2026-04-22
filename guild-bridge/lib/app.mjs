/**
 * Shared bridge logic: IMAP, Twilio, auth. Used by the local `server.mjs` and
 * Vercel `api/*` entrypoints.
 */
import Imap from "imap"
import { simpleParser } from "mailparser"

export function getBridgeKey() {
  return process.env.BRIDGE_API_KEY
}

const imap = {
  get host() {
    return process.env.IMAP_HOST
  },
  get user() {
    return process.env.IMAP_USER
  },
  get password() {
    return process.env.IMAP_PASSWORD
  },
  get port() {
    return parseInt(process.env.IMAP_PORT || "993", 10)
  },
  get useTls() {
    return process.env.IMAP_TLS !== "0" && process.env.IMAP_TLS !== "false"
  },
  get mailbox() {
    return process.env.IMAP_MAILBOX || "INBOX"
  },
  get max() {
    return Math.min(50, Math.max(1, parseInt(process.env.IMAP_MAX_MESSAGES || "20", 10) || 20))
  },
  get markSeen() {
    return process.env.IMAP_MARK_SEEN === "1" || process.env.IMAP_MARK_SEEN === "true"
  },
}

function requireImap() {
  if (!imap.host || !imap.user || !imap.password) {
    throw new Error("Missing IMAP_HOST, IMAP_USER, or IMAP_PASSWORD")
  }
}

function requireTwilio() {
  const a = process.env.TWILIO_ACCOUNT_SID
  const t = process.env.TWILIO_AUTH_TOKEN
  const f = process.env.TWILIO_FROM
  const to = process.env.SMS_TO
  if (!a || !t || !f || !to) {
    throw new Error("Missing TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM, or SMS_TO")
  }
  return { accountSid: a, token: t, from: f, to }
}

function strip(h) {
  return String(h).replace(/<[^>]+>/g, " ")
}

/**
 * @returns {Promise<{ ok: boolean, messages: Array, error?: string }>}
 */
export function listUnread() {
  requireImap()
  return new Promise((resolve) => {
    const client = new Imap({
      user: imap.user,
      password: imap.password,
      host: imap.host,
      port: imap.port,
      tls: imap.useTls,
      tlsOptions: { servername: imap.host },
      connTimeout: 20000,
      authTimeout: 20000,
    })
    const fail = (e) => resolve({ ok: false, messages: [], error: String(e?.message || e) })
    client.on("error", fail)
    client.connect()
    client.once("ready", () => {
      client.openBox(imap.mailbox, false, (err) => {
        if (err) {
          return fail(err)
        }
        client.search(["UNSEEN"], (e, uids) => {
          if (e) {
            return fail(e)
          }
          if (!uids?.length) {
            client.end()
            return resolve({ ok: true, messages: [] })
          }
          const pick = uids.slice(-imap.max)
          const f = client.fetch(pick, { bodies: "", markSeen: imap.markSeen, struct: false })
          const raws = []
          f.on("message", (msg) => {
            msg.on("body", (stream) => {
              const ch = []
              stream.on("data", (c) => ch.push(c))
              stream.on("end", () => raws.push(Buffer.concat(ch)))
            })
          })
          f.on("error", (ex) => fail(ex))
          f.on("end", () => {
            Promise.all(
              raws.map(async (raw) => {
                let subject = ""
                let from = ""
                let date = ""
                let text = ""
                try {
                  const p = await simpleParser(raw)
                  subject = p.subject || ""
                  from =
                    (p.from && p.from.value && p.from.value[0] && p.from.value[0].address) || ""
                  date = p.date ? String(p.date) : ""
                  text = (p.text || strip(p.html || "")) || ""
                } catch {
                  text = raw.toString("utf8", 0, Math.min(raw.length, 4000))
                }
                return { subject, from, date, bodyPreview: text.slice(0, 12000) }
              })
            )
              .then((messages) => {
                client.end()
                resolve({ ok: true, messages })
              })
              .catch(fail)
          })
        })
      })
    })
  })
}

function btoa(s) {
  if (globalThis.btoa) {
    return globalThis.btoa(s)
  }
  return Buffer.from(s, "utf8").toString("base64")
}

export async function sendSms(body) {
  const { accountSid, token, from, to } = requireTwilio()
  const u = new URL(
    `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`
  )
  const form = new URLSearchParams()
  form.set("To", to)
  form.set("From", from)
  form.set("Body", String(body).slice(0, 1500))
  const r = await fetch(u, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${btoa(`${accountSid}:${token}`)}`,
    },
    body: form,
  })
  const t = await r.text()
  if (!r.ok) {
    throw new Error(`Twilio ${r.status}: ${t.slice(0, 500)}`)
  }
  return { status: r.status, raw: t }
}

export function auth(h, bridgeKey) {
  if (!bridgeKey) {
    return false
  }
  const key = h["x-api-key"] || h["X-Api-Key"] || h["X-API-Key"]
  if (key && key === bridgeKey) {
    return true
  }
  const authH = h.authorization || h["Authorization"] || h["AUTHORIZATION"] || ""
  if (authH.toLowerCase().startsWith("bearer ")) {
    return authH.slice(7).trim() === bridgeKey
  }
  if (authH.toLowerCase().startsWith("basic ")) {
    return false
  }
  return false
}

/**
 * Vercel / local Node `IncomingMessage` / `ServerResponse`
 */
export function publicPathname(req) {
  const u = new URL(req.url || "/", "http://localhost")
  let p = u.pathname
  if (p === "/api" || p.startsWith("/api/")) {
    p = p.replace(/^\/api/, "") || "/"
  }
  if (!p.startsWith("/")) {
    p = `/${p}`
  }
  return p
}

export async function handleRoutedRequest(req, res) {
  const pathname = publicPathname(req)
  if (pathname === "/health" && (req.method === "GET" || req.method === "HEAD")) {
    res.writeHead(200, { "Content-Type": "application/json" })
    return res.end(JSON.stringify({ ok: true }))
  }

  const k = getBridgeKey()
  if (!k) {
    res.writeHead(503, { "Content-Type": "application/json" })
    return res.end(
      JSON.stringify({ error: "BRIDGE_API_KEY is not set (add it in the host’s environment)." })
    )
  }
  if (!req.headers) {
    res.writeHead(401, { "Content-Type": "application/json" })
    return res.end(JSON.stringify({ error: "Unauthorized" }))
  }
  if (!auth(req.headers, k)) {
    res.writeHead(401, { "Content-Type": "application/json" })
    return res.end(JSON.stringify({ error: "Invalid or missing API key" }))
  }

  if (req.method === "GET" && pathname === "/v1/messages/unread") {
    try {
      const r = await listUnread()
      res.writeHead(200, { "Content-Type": "application/json" })
      return res.end(JSON.stringify(r))
    } catch (e) {
      res.writeHead(500, { "Content-Type": "application/json" })
      return res.end(JSON.stringify({ error: String(e) }))
    }
  }
  if (req.method === "POST" && pathname === "/v1/sms") {
    let b = ""
    for await (const c of req) {
      b += c
    }
    let j = {}
    try {
      j = b ? JSON.parse(b) : {}
    } catch {
      res.writeHead(400, { "Content-Type": "application/json" })
      return res.end(JSON.stringify({ error: "Invalid JSON" }))
    }
    if (typeof j.body !== "string") {
      res.writeHead(400, { "Content-Type": "application/json" })
      return res.end(JSON.stringify({ error: 'Request JSON must be { "body": "SMS text" }' }))
    }
    try {
      const out = await sendSms(j.body)
      res.writeHead(200, { "Content-Type": "application/json" })
      return res.end(JSON.stringify({ ok: true, ...out }))
    } catch (e) {
      res.writeHead(502, { "Content-Type": "application/json" })
      return res.end(JSON.stringify({ error: String(e) }))
    }
  }
  res.writeHead(404, { "Content-Type": "application/json" })
  res.end(JSON.stringify({ error: "Not found" }))
}
