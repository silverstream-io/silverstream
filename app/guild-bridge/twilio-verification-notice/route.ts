import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { NextResponse } from "next/server"

export const runtime = "nodejs"

/**
 * Serves `guild-bridge/twilio-verification-notice.html` for opt-in / compliance
 * URL checks (e.g. Twilio). Unauthenticated; does not go through the API bridge.
 */
export async function GET() {
  const path = join(process.cwd(), "guild-bridge", "twilio-verification-notice.html")
  const html = await readFile(path, "utf8")
  return new NextResponse(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  })
}
