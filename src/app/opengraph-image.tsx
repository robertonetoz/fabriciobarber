import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { brand } from "@/data/site";

// Prévia que aparece ao colar o link no Instagram, WhatsApp, Facebook etc.
export const alt = "Fabrício Pereira Barber Club, barbearia em Araguari – MG";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  // Caminhos escritos por extenso para o build incluir só esses arquivos
  const [display, sansMedium, sansSemi, logo, photo] = await Promise.all([
    readFile(join(process.cwd(), "assets/fonts/BigShoulders-ExtraBold.ttf")),
    readFile(join(process.cwd(), "assets/fonts/InstrumentSans-Medium.ttf")),
    readFile(join(process.cwd(), "assets/fonts/InstrumentSans-SemiBold.ttf")),
    readFile(join(process.cwd(), "public/images/logo-crop.png")),
    readFile(join(process.cwd(), "public/images/trabalhos/degrade-risco.jpg")),
  ]);
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;
  const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;

  const bone = "#efede8";
  const brass = "#c9a55c";
  const brassLight = "#e6cd93";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "radial-gradient(circle at 18% 0%, #2a2216 0%, #0a0a0a 45%, #000 100%)",
          fontFamily: "Instrument Sans",
          color: bone,
        }}
      >
        {/* poste de barbeiro na borda esquerda */}
        <div
          style={{
            width: 14,
            height: "100%",
            display: "flex",
            backgroundImage: `repeating-linear-gradient(-45deg, ${bone} 0px, ${bone} 10px, #000 10px, #000 14px, ${brass} 14px, ${brass} 24px, #000 24px, #000 28px)`,
          }}
        />

        {/* texto */}
        <div style={{ display: "flex", flexDirection: "column", flex: 1, padding: "44px 40px 44px 64px" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={210} height={64} alt="" />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 28,
              fontFamily: "Big Shoulders",
              fontSize: 108,
              lineHeight: 0.86,
              letterSpacing: -1,
              textTransform: "uppercase",
            }}
          >
            <span>Do jeito</span>
            <span>que você</span>
            <span style={{ color: brassLight }}>pediu.</span>
          </div>

          <div style={{ display: "flex", width: 380, height: 2, marginTop: 24, background: `linear-gradient(90deg, ${brass}, rgba(201,165,92,0))` }} />

          <div style={{ display: "flex", marginTop: 20, fontSize: 26, color: "rgba(239,237,232,0.82)" }}>
            Barbearia em Araguari – MG
          </div>

          <div style={{ display: "flex", alignItems: "center", marginTop: "auto", gap: 18, fontSize: 24 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 22px",
                borderRadius: 999,
                background: brass,
                color: "#000",
                fontWeight: 600,
              }}
            >
              Agende pelo WhatsApp
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, color: "rgba(239,237,232,0.75)" }}>
              <div style={{ display: "flex", gap: 3 }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} width="22" height="22" viewBox="0 0 24 24">
                    <path fill={brass} d="M12 2.5l2.9 6 6.6.8-4.9 4.5 1.3 6.5L12 17.1l-5.9 3.2 1.3-6.5-4.9-4.5 6.6-.8z" />
                  </svg>
                ))}
              </div>
              <span style={{ color: bone, fontWeight: 600 }}>{brand.rating}</span>
              <span>no Google</span>
            </div>
          </div>
        </div>

        {/* foto em arco, como o espelho da barbearia */}
        <div style={{ display: "flex", alignItems: "flex-end", padding: "40px 56px 0 0" }}>
          <div
            style={{
              display: "flex",
              width: 400,
              height: 590,
              padding: 8,
              border: `2px solid rgba(201,165,92,0.55)`,
              borderBottom: "none",
              borderRadius: "200px 200px 0 0",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photoSrc}
              width={380}
              height={582}
              alt=""
              style={{ objectFit: "cover", objectPosition: "50% 30%", borderRadius: "190px 190px 0 0" }}
            />
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Big Shoulders", data: display, weight: 800, style: "normal" },
        { name: "Instrument Sans", data: sansMedium, weight: 500, style: "normal" },
        { name: "Instrument Sans", data: sansSemi, weight: 600, style: "normal" },
      ],
    }
  );
}
