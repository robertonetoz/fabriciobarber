import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Ícone da aba: monograma "FP" dourado, leve (poucos KB)
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default async function Icon() {
  const display = await readFile(join(process.cwd(), "assets/fonts/BigShoulders-ExtraBold.ttf"));
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#000",
          borderRadius: 12,
          color: "#c9a55c",
          fontFamily: "Big Shoulders",
          fontSize: 44,
          letterSpacing: -1,
        }}
      >
        FP
      </div>
    ),
    { ...size, fonts: [{ name: "Big Shoulders", data: display, weight: 800, style: "normal" }] }
  );
}
