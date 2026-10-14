import { RazorIcon } from "./Icons";

const items = ["Corte de cabelo", "Barba na navalha", "Sobrancelha", "Cortes infantis", "Hora marcada", "Ordem de chegada", "Curso de barbeiro"];

export default function Marquee() {
  const row = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-line bg-coal py-5" aria-hidden>
      <div aria-hidden className="pole-stripes pole-run-x absolute -left-10 right-0 top-0 h-[3px] opacity-70" />
      <div className="flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        <div className="animate-marquee flex shrink-0 items-center gap-10 pr-10">
          {row.map((t, i) => (
            <span key={i} className="flex shrink-0 items-center gap-10">
              <span className="sign text-4xl text-bone/90 md:text-5xl">{t}</span>
              <RazorIcon className="h-4 w-12 text-brass" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
