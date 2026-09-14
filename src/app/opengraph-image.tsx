import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = "MANJIM'UP — Un paddle. Un QR code. Et vous êtes sur l'eau.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(160deg, #FBF7EF 0%, #F7F0E3 55%, #E8D5B5 100%)",
          color: "#06394B",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", right: 90, top: 70, width: 150, height: 150, borderRadius: 999, background: "#F39A4A" }} />
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 150, background: "linear-gradient(180deg, #1FA7A5 0%, #075E6B 100%)" }} />
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 40, fontWeight: 800, letterSpacing: -1 }}>
          <div style={{ width: 56, height: 56, borderRadius: 999, background: "#075E6B", display: "flex" }} />
          {site.name}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18, marginBottom: 120 }}>
          <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.02, letterSpacing: -2 }}>Un paddle. Un QR code.</div>
          <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.02, letterSpacing: -2 }}>{"Et vous êtes sur l'eau."}</div>
          <div style={{ fontSize: 30, color: "#4B6570", marginTop: 8 }}>{`Location de paddle en libre-service · ${site.launch.region}`}</div>
        </div>
      </div>
    ),
    size,
  );
}
