"use client";

import { useMounted } from "@/lib/hooks";
import { MapPin, Navigation, Phone } from "lucide-react";
import { units, weekdayNames } from "@/data/site";
import { nowInAraguari, waLink } from "@/lib/utils";
import OpenBadge from "./OpenBadge";
import { WhatsAppIcon } from "./Icons";
import { Reveal, SignHeading } from "./Reveal";

const order = [1, 2, 3, 4, 5, 6, 0];

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
              <iframe
                title={`Mapa da ${main.name}`}
                src={`https://maps.google.com/maps?q=${encodeURIComponent(main.embedQuery)}&z=16&output=embed`}
                className="absolute inset-0 h-full w-full border-0 [filter:grayscale(1)_invert(0.92)_contrast(0.9)_brightness(0.95)]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div aria-hidden className="pointer-events-none absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.6)]" />
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
