import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "#0b0d12",
          color: "#e8eaf0",
        }}
      >
        <div style={{ fontSize: 36, color: "#5eead4" }}>{profile.role}</div>
        <div style={{ fontSize: 96, fontWeight: 700, marginTop: 16 }}>{profile.name}</div>
        <div style={{ fontSize: 32, color: "#9aa3b5", marginTop: 24 }}>Portfolio</div>
      </div>
    ),
    { ...size },
  );
}
