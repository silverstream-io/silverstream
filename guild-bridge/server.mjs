/**
 * Local / Docker entry: one HTTP server. Vercel uses `api/*` and `vercel.json` rewrites
 * to the same handler logic in `lib/app.mjs`.
 */
import "dotenv/config"
import http from "node:http"
import { handleRoutedRequest, getBridgeKey } from "./lib/app.mjs"

const port = parseInt(process.env.PORT || "8080", 10)

if (!getBridgeKey()) {
  console.error("Set BRIDGE_API_KEY")
  process.exit(1)
}

const server = http.createServer((req, res) => {
  void handleRoutedRequest(req, res)
})

server.listen(port, "0.0.0.0", () => {
  console.log("Inbox-SMS bridge listening on", port)
})
