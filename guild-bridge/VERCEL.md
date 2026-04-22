# Host the bridge on Vercel (from GitHub)

## Repo layout

- **This monorepo:** point Vercel at the **Root Directory** `bridge` (Project → Settings → General), not the repository root. The service lives entirely under `bridge/`.
- **Own repo only for the bridge:** copy the `bridge/` folder into a new repository (or use `git sparse-checkout`) so the Vercel root is the project root; no Root Directory change needed.

## Configure

1. Connect the GitHub repo to Vercel and import the project.
2. Set **Root Directory** to `bridge` if you use the monorepo layout.
3. In **Environment Variables**, add everything from `bridge/.env.example` (same names). Use your production IMAP, Twilio, and a long `BRIDGE_API_KEY`.
4. Deploy. Your public base URL is `https://<project>.vercel.app` (or a custom domain).

## URLs (unchanged for the email agent)

After deploy, rewrites make these work (same as local/Docker):

- `GET  /health`
- `GET  /v1/messages/unread` (header `X-API-Key`)
- `POST /v1/sms` (header `X-API-Key`, body `{ "body": "..." }` )

`bridgeBaseUrl` in the agent should be the deployment origin, e.g. `https://inbox-bridge.vercel.app` — no path suffix.

## IMAP and serverless limits

Each request opens an IMAP connection, fetches, and disconnects. Vercel functions have a **max duration** (10s on Hobby, higher on Pro). A slow IMAP server can hit that. If you see timeouts, use Pro, split work, or run the long-lived `node server.mjs` on a VM/Run instead of Vercel.

## Local vs Vercel

- **Local / Docker:** `node server.mjs` or the shipped `Dockerfile` (port `PORT` / 8080).
- **Vercel:** the `api/*.mjs` files use the same `lib/app.mjs` logic; `vercel.json` rewrites public paths so the Guild agent’s `fetch` code does not change.
