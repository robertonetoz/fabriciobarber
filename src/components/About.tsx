"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { aboutImage, brand } from "@/data/site";
import ImageSlot from "./ImageSlot";
import { Reveal, SignHeading } from "./Reveal";

const facts = [
  { value: brand.rating, label: "nota no Google" },
  { value: String(brand.reviewsCount), label: "avaliações de clientes" },
  { value: "2", label: "unidades em Araguari" },
  { value: brand.followers, label: "seguidores no Instagram" },
];

const perks = [
  { title: "Hora marcada ou por chegada", text: "Você escolhe. Marcou, sentou. Chegou, entra na fila do dia." },
  { title: "Ambiente climatizado", text: "Ar ligado, som no volume certo e lugar limpo e organizado." },
  { title: "Cerveja gelada", text: "Aquela pausa enquanto espera, ou para comemorar o corte novo." },
  { title: "Família toda", text: "Pai, filho e os pequenos. Paciência com criança é parte do serviço." },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section id="sobre" className="relative py-24 md:py-36">
      <div className="mx-auto grid max-w-7xl gap-16 px-5 md:px-8 lg:grid-cols-12 lg:gap-10">
        <div ref={ref} className="relative lg:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2px]">
            <motion.div style={reduce ? undefined : { y }} className="absolute -inset-y-[10%] inset-x-0">
              <ImageSlot src={aboutImage.src} alt={aboutImage.alt} sizes="(min-width:1024px) 40vw, 100vw" className="h-full w-full" />
            </motion.div>
          </div>
          <div aria-hidden className="absolute -bottom-5 -right-5 -z-10 hidden h-2/3 w-2/3 border border-brass/30 md:block" />
        </div>

        <div className="lg:col-span-7 lg:pl-8">
          <SignHeading lines={["Barbearia de bairro,", "padrão de clube."]} className="text-[clamp(2.8rem,6vw,5.2rem)] text-bone" />
          <Reveal delay={0.15}>
            <p className="mt-8 max-w-[36rem] text-lg leading-relaxed text-bone/75">
              O Barber Club nasceu no centro de Araguari para ser aquele lugar onde você chega, conversa, toma uma gelada e
              sai com o corte que pediu. Sem pressa e sem surpresa. Hoje são duas unidades e uma equipe que também forma
              novos barbeiros.
            </p>
          </Reveal>

          <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden border border-line bg-line sm:grid-cols-4">
            {facts.map((f, i) => (
              <Reveal key={f.label} delay={0.1 + i * 0.08} className="bg-ink p-5">
                <dt className="sr-only">{f.label}</dt>
                <dd>
                  <span className="sign block text-5xl text-brass">{f.value}</span>
                  <span className="mt-2 block text-sm leading-snug text-steel">{f.label}</span>
                </dd>
              </Reveal>
            ))}
          </dl>

          <div className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {perks.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08}>
                <div className="border-l border-brass/50 pl-5">
                  <h3 className="text-lg font-semibold text-bone">{p.title}</h3>
                  <p className="mt-1.5 leading-relaxed text-steel">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
