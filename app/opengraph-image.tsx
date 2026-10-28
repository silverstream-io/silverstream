import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/site";

export const alt = `${SITE_NAME}: practical AI for small and midsize businesses`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Default preview image shown when a page is shared on social media or chat.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "radial-gradient(circle at 70% 20%, #3730a3 0%, #030712 60%)",
          color: "#e5e7eb",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 36, color: "#a5b4fc", marginBottom: 24 }}>
          {SITE_NAME}
        </div>
        <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.1 }}>
          Practical AI for small and midsize businesses
        </div>
        <div style={{ fontSize: 32, color: "#9ca3af", marginTop: 32 }}>
          Inventory · Billing · HR · Compliance
        </div>
      </div>
    ),
    size,
  );
}
