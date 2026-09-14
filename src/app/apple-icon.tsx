import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#075E6B", borderRadius: 40 }}>
        <svg viewBox="0 0 32 32" width="180" height="180">
          <circle cx="21.5" cy="10.5" r="3.6" fill="#F39A4A" />
          <path d="M5.5 19c2.6-2.6 5.2-2.6 7.8 0s5.2 2.6 7.8 0 5.2-2.6 7.8 0" fill="none" stroke="#F7F0E3" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M7 24c2.4-2.4 4.8-2.4 7.2 0s4.8 2.4 7.2 0 3.6-1.8 4.8-1.2" fill="none" stroke="#1FA7A5" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
      </div>
    ),
    size,
  );
}
