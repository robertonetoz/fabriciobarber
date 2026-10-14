"use client";

import { motion, useReducedMotion } from "motion/react";
import { Plus } from "lucide-react";
import { services } from "@/data/site";
import { Reveal, SignHeading } from "./Reveal";

export function addToBooking(serviceId: string) {
  window.dispatchEvent(new CustomEvent("booking:add", { detail: serviceId }));
  document.getElementById("agendar")?.scrollIntoView({ behavior: "smooth" });
}

export default function Services() {
  const reduce = useReducedMotion();
  return (
    <section id="servicos" className="relative bg-coal py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <SignHeading lines={["O que sai", "da cadeira"]} className="text-[clamp(3rem,8vw,7rem)] text-bone lg:col-span-7" />
          <Reveal delay={0.1} className="lg:col-span-5">
            <p className="max-w-md text-lg leading-relaxed text-bone/70">
              Corte e barba podem ser com hora marcada ou por ordem de chegada. Toque em um serviço para já deixar ele no
              seu agendamento.
            </p>
          </Reveal>
        </div>

        <ul className="mt-16 border-t border-line">
          {services.map((s, i) => (
            <motion.li
              key={s.id}
              initial={reduce ? false : { opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -8% 0px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: i * 0.06 }}
              className="border-b border-line"
            >
              <button
                type="button"
                onClick={() => addToBooking(s.id)}
                className="group relative grid w-full gap-4 overflow-hidden py-8 text-left md:grid-cols-12 md:items-center md:gap-6 md:py-10"
                aria-label={`Adicionar ${s.name} ao agendamento`}
              >
                <span aria-hidden className="absolute inset-0 -z-0 origin-bottom scale-y-0 bg-brass transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-y-100 group-focus-visible:scale-y-100" />
                <span className="relative sign text-[clamp(2.4rem,5vw,4.2rem)] text-bone transition-colors duration-300 group-hover:text-ink md:col-span-5 md:pl-4">
                  {s.name}
                </span>
                <span className="relative max-w-md leading-relaxed text-steel transition-colors duration-300 group-hover:text-ink/80 md:col-span-4">
                  {s.description}
                </span>
                <span className="relative flex flex-wrap items-center gap-2 md:col-span-3 md:justify-end md:pr-4">
                  {s.modes && (
                    <>
                      <Tag>Hora marcada</Tag>
                      <Tag>Ordem de chegada</Tag>
                    </>
                  )}
                  <span className="ml-1 grid size-10 shrink-0 place-items-center rounded-full border border-brass/60 text-brass transition-all duration-300 group-hover:rotate-90 group-hover:border-ink group-hover:bg-ink">
                    <Plus className="size-4" />
                  </span>
                </span>
              </button>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-line px-3 py-1 text-xs text-bone/70 transition-colors duration-300 group-hover:border-ink/30 group-hover:text-ink">
      {children}
    </span>
  );
}
