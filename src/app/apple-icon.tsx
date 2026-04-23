import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  const font = await readFile(
    join(process.cwd(), "public/fonts/Unbounded-ExtraBold.ttf"),
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          background: "#FF6D1F",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 36,
        }}
      >
        <span
          style={{
            fontFamily: "Unbounded",
            fontWeight: 800,
            fontSize: 120,
            color: "rgba(255,255,255,0.55)",
            lineHeight: 1,
            marginTop: 4,
          }}
        >
          C
        </span>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Unbounded", data: font, weight: 800 }],
    },
  );
}
