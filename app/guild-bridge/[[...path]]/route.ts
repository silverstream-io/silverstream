import { NextResponse } from "next/server"
import { handleRoutedRequest } from "../../../guild-bridge/lib/app.mjs"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"
/** IMAP fetches can exceed the default 10s on Vercel Hobby. */
export const maxDuration = 60

type RouteContext = { params: { path?: string[] } }

function segmentsToPathname(path: string[] | undefined) {
  if (!path || path.length === 0) return "/"
  return `/${path.join("/")}`
}

/**
 * The bridge was written for `IncomingMessage` / `ServerResponse`.
 * It only uses: method, url, headers, and async-iterable body; plus writeHead + end on the response.
 */
function webToBridgeRequest(
  request: Request,
  pathname: string,
  body: ArrayBuffer | null
): { method: string; url: string; headers: Record<string, string>; [Symbol.asyncIterator](): AsyncIterableIterator<Buffer> } {
  const h: Record<string, string> = {}
  request.headers.forEach((value, key) => {
    h[key] = value
  })
  return {
    method: request.method,
    url: `http://localhost${pathname}`,
    headers: h,
    async *[Symbol.asyncIterator]() {
      if (body && body.byteLength) {
        yield Buffer.from(body)
      }
    },
  }
}

function newCollectingRes() {
  const chunks: Buffer[] = []
  let status = 200
  const outHeaders: Record<string, string> = {}
  const res = {
    writeHead(
      s: number,
      headersOrReason?: { [k: string]: string } | string,
      mayBeHeaders?: { [k: string]: string }
    ) {
      status = s
      if (headersOrReason && typeof headersOrReason === "object") {
        Object.assign(outHeaders, headersOrReason)
      } else if (mayBeHeaders && typeof mayBeHeaders === "object") {
        Object.assign(outHeaders, mayBeHeaders)
      }
    },
    end(body?: string | Buffer) {
      if (body === undefined) return
      chunks.push(Buffer.isBuffer(body) ? body : Buffer.from(String(body), "utf8"))
    },
  }
  return { res, finish: () => new NextResponse(chunks.length ? Buffer.concat(chunks) : null, { status, headers: outHeaders }) }
}

async function runBridge(request: Request, ctx: RouteContext) {
  const internalPath = segmentsToPathname(ctx.params.path)
  const body =
    request.method === "GET" || request.method === "HEAD" ? null : await request.arrayBuffer()
  const req = webToBridgeRequest(request, internalPath, body)
  const { res, finish } = newCollectingRes()
  await handleRoutedRequest(req, res)
  return finish()
}

export function GET(request: Request, context: RouteContext) {
  return runBridge(request, context)
}

export function HEAD(request: Request, context: RouteContext) {
  return runBridge(request, context)
}

export function POST(request: Request, context: RouteContext) {
  return runBridge(request, context)
}
