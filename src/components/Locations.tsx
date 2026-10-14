"use client";

import { useState } from "react";
import { useMounted } from "@/lib/hooks";
import { MapPin, Navigation, Phone } from "lucide-react";
import { units, weekdayNames } from "@/data/site";
import { nowInAraguari, waLink } from "@/lib/utils";
import OpenBadge from "./OpenBadge";
import { WhatsAppIcon } from "./Icons";
import { Reveal, SignHeading } from "./Reveal";

const order = [1, 2, 3, 4, 5, 6, 0];

/**
 * O mapa do Google pesa bastante (vários scripts). Mostramos uma capa leve
 * e só carregamos o mapa quando a pessoa toca nela.
 */
function MapEmbed({ title, query, address }: { title: string; query: string; address: string }) {
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <>
        <iframe
          title={title}
          src={`https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=16&output=embed`}
          className="absolute inset-0 h-full w-full border-0 [filter:grayscale(1)_invert(0.92)_contrast(0.9)_brightness(0.95)]"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <div aria-hidden className="pointer-events-none absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.6)]" />
      </>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setLoaded(true)}
      className="group absolute inset-0 flex flex-col items-center justify-center gap-4 overflow-hidden bg-char text-center"
      style={{
        backgroundImage:
          "linear-gradient(rgba(239,237,232,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(239,237,232,0.05) 1px, transparent 1px)",
        backgroundSize: "44px 44px",
      }}
    >
      {/* ruas estilizadas */}
      <span aria-hidden className="absolute left-0 right-0 top-[46%] h-3 -rotate-6 bg-line/80" />
      <span aria-hidden className="absolute bottom-0 top-0 left-[58%] w-3 rotate-[8deg] bg-line/80" />
      <span className="relative grid size-14 place-items-center rounded-full bg-brass text-ink shadow-[0_0_0_10px_rgba(201,165,92,0.15)] transition-transform duration-300 group-hover:scale-110">
        <MapPin className="size-6" />
      </span>
      <span className="relative">
        <span className="block font-medium text-bone">{address}</span>
        <span className="mt-1 block text-sm text-steel underline decoration-brass/50 underline-offset-4 group-hover:text-bone">
          Toque para abrir o mapa
        </span>
      </span>
    </button>
  );
}

export default function Locations() {
  const [main, second] = units;
  const today = useMounted() ? nowInAraguari().day : null;

  return (
    <section id="unidades" className="relative bg-coal py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SignHeading lines={["Onde a gente", "está"]} className="text-[clamp(3rem,8vw,7rem)] text-bone" />

        <Reveal delay={0.1}>
          <article className="mt-14 grid overflow-hidden border border-line bg-ink lg:grid-cols-12">
            <div className="p-6 sm:p-10 lg:col-span-5">
              <p className="text-sm text-brass">{main.label}</p>
              <h3 className="sign mt-2 text-5xl text-bone md:text-6xl">{main.name}</h3>
              <OpenBadge className="mt-5" />

              <address className="mt-8 flex gap-3 not-italic leading-relaxed text-bone/85">
                <MapPin className="mt-1 size-5 shrink-0 text-brass" />
                <span>
                  {main.street}, {main.district}
                  <br />
                  {main.cityLine}
                </span>
              </address>
              <p className="mt-3 flex gap-3 text-bone/85">
                <Phone className="mt-0.5 size-5 shrink-0 text-brass" />
                <a href={`tel:+${main.whatsapp}`} className="hover:text-brass">{main.phoneDisplay}</a>
              </p>

              <table className="mt-8 w-full text-[15px]">
                <caption className="sr-only">Horário de funcionamento</caption>
                <tbody>
                  {order.map((d) => {
                    const h = main.hours![d];
                    const isToday = today === d;
                    return (
                      <tr key={d} className={`border-b border-line/70 ${isToday ? "text-brass-light" : "text-bone/75"}`}>
                        <th scope="row" className="py-2.5 text-left font-normal">
                          {weekdayNames[d]}
                          {isToday && <span className="ml-2 text-xs text-brass">hoje</span>}
                        </th>
                        <td className="py-2.5 text-right tabular-nums">{h ? `${h.open} – ${h.close}` : "Fechado"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href={main.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn-brass">
                  <Navigation className="size-4" /> Como chegar
                </a>
                <a href={waLink(main.whatsapp)} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                  <WhatsAppIcon className="size-5 text-brass" /> WhatsApp
                </a>
              </div>
            </div>
            <div className="relative min-h-[360px] lg:col-span-7">
              <MapEmbed title={`Mapa da ${main.name}`} query={main.embedQuery} address={`${main.street}, ${main.district}`} />
            </div>
          </article>
        </Reveal>

        <Reveal delay={0.1}>
          <article className="mt-6 flex flex-col gap-6 border border-line p-6 sm:p-8 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm text-steel">{second.label}</p>
              <h3 className="sign mt-1 text-4xl text-bone">{second.name}</h3>
              <p className="mt-3 flex gap-2 text-bone/80">
                <MapPin className="mt-0.5 size-4 shrink-0 text-brass" />
                {second.street}, {second.district}, {second.cityLine}
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a href={`tel:+${second.whatsapp}`} className="btn-ghost">
                <Phone className="size-4 text-brass" /> {second.phoneDisplay}
              </a>
              <a href={second.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                <Navigation className="size-4 text-brass" /> Como chegar
              </a>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
