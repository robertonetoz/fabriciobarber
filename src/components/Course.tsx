"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Check } from "lucide-react";
import { course, courseImage } from "@/data/site";
import { waLink } from "@/lib/utils";
import ImageSlot from "./ImageSlot";
import { WhatsAppIcon } from "./Icons";
import { Reveal, SignHeading } from "./Reveal";

const courseMessage =
  "Olá! Vi no site que tem turma nova do curso Fast Barber's para iniciantes. Quero saber datas, valores e como garantir minha vaga.";

export default function Course() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bigX = useTransform(scrollYProgress, [0, 1], ["8%", "-28%"]);

  return (
    <section id="curso" ref={ref} className="grain relative isolate overflow-hidden border-y border-brass/25 bg-[linear-gradient(180deg,#0f0d09_0%,#000_100%)] py-24 md:py-36">
      {/* Nome do curso gigante deslizando no fundo */}
      <motion.div
        aria-hidden
        style={reduce ? undefined : { x: bigX }}
        className="sign pointer-events-none absolute top-10 -z-10 whitespace-nowrap text-[26vw] leading-none text-transparent [-webkit-text-stroke:1px_rgba(201,165,92,0.16)]"
      >
        Fast Barber&apos;s Fast Barber&apos;s
      </motion.div>

      <div className="mx-auto grid max-w-7xl gap-14 px-5 md:px-8 lg:grid-cols-12 lg:items-center lg:gap-10">
        <div className="lg:col-span-6">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-brass/50 bg-brass/10 px-4 py-1.5 text-sm text-brass-light">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-brass opacity-70" />
                <span className="relative inline-flex size-2 rounded-full bg-brass" />
              </span>
              Nova turma aberta, vagas limitadas
            </span>
          </Reveal>

          <SignHeading
            lines={[<span key="a" className="brass-text">{course.name}</span>, "Curso de barbeiro", "para iniciantes"]}
            className="mt-6 text-[clamp(2.8rem,6.5vw,5.6rem)] text-bone"
          />

          <Reveal delay={0.15}>
            <p className="mt-8 max-w-[34rem] text-lg leading-relaxed text-bone/75">{course.pitch}</p>
          </Reveal>

          <div className="mt-10 space-y-5">
            {course.bullets.map((b, i) => (
              <Reveal key={b.title} delay={0.1 + i * 0.1}>
                <div className="flex gap-4">
                  <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-brass text-ink">
                    <Check className="size-4" strokeWidth={3} />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-bone">{b.title}</h3>
                    <p className="mt-0.5 leading-relaxed text-steel">{b.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3}>
            <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a href={waLink(course.whatsapp, courseMessage)} target="_blank" rel="noopener noreferrer" className="btn-brass text-base">
                <WhatsAppIcon className="size-5" />
                Quero minha vaga
              </a>
              <span className="text-sm text-steel">
                Inscrições pelo WhatsApp <span className="text-bone">{course.phoneDisplay}</span>
              </span>
            </div>
          </Reveal>
        </div>

        <div className="relative lg:col-span-6">
          <motion.div
            initial={reduce ? false : { opacity: 0, rotate: -4, y: 60 }}
            whileInView={{ opacity: 1, rotate: -2, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -5% 0px" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto max-w-[520px] border border-brass/40 bg-coal p-3 shadow-[0_50px_100px_-40px_rgba(201,165,92,0.35)]"
          >
            <ImageSlot
              src={courseImage.src}
              alt={courseImage.alt}
              hint="Foto da turma ou dos instrutores"
              sizes="(min-width:1024px) 520px, 90vw"
              className="aspect-[4/5] w-full"
            />
            <div className="absolute -bottom-6 -right-3 rotate-[4deg] bg-brass px-5 py-3 text-ink shadow-xl md:-right-8">
              <span className="sign block text-3xl">Vagas limitadas</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
