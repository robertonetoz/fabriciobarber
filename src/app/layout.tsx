import type { Metadata, Viewport } from "next";
import { Big_Shoulders, Instrument_Sans } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const display = Big_Shoulders({
  variable: "--font-big-shoulders",
  subsets: ["latin"],
  axes: ["opsz"],
});

const sans = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  axes: ["wdth"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://fabriciobarber.vercel.app"),
  title: "Fabrício Pereira Barber Club | Barbearia em Araguari – MG",
  description:
    "Corte, barba, sobrancelha na navalha e cortes infantis no centro de Araguari. Hora marcada ou ordem de chegada. Nota 4,9 no Google. Agende pelo WhatsApp.",
  keywords: [
    "barbearia Araguari",
    "barbeiro Araguari",
    "Fabrício Pereira Barber Club",
    "corte de cabelo Araguari",
    "curso de barbeiro Araguari",
  ],
  icons: { icon: "/images/logo.png" },
  alternates: { canonical: "/" },
  // A imagem da prévia vem de src/app/opengraph-image.tsx
  openGraph: {
    title: "Fabrício Pereira Barber Club",
    description: "Barbearia em Araguari – MG. Corte, barba e sobrancelha na navalha. Agende pelo WhatsApp.",
    url: "/",
    siteName: "Fabrício Pereira Barber Club",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fabrício Pereira Barber Club",
    description: "Barbearia em Araguari – MG. Agende pelo WhatsApp.",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${sans.variable} antialiased`}>
      <body className="min-h-full">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
