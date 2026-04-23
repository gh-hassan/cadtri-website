import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default async function Icon() {
  const font = await readFile(
    join(process.cwd(), "public/fonts/Unbounded-ExtraBold.ttf"),
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: "#FF6D1F",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 6,
        }}
      >
        <span
          style={{
            fontFamily: "Unbounded",
            fontWeight: 800,
            fontSize: 22,
            color: "rgba(255,255,255,0.55)",
            lineHeight: 1,
            marginTop: 1,
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
