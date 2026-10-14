"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Star } from "lucide-react";
import { brand, heroImage, mainUnit } from "@/data/site";
import ImageSlot from "./ImageSlot";
import OpenBadge from "./OpenBadge";
import { GoogleIcon, WhatsAppIcon } from "./Icons";
import { waLink } from "@/lib/utils";

const headline = ["Do jeito", "que você", "pediu."];

/*
 * A entrada do topo usa animações em CSS (classes hero-*), não JavaScript:
 * elas começam já na primeira pintura, então o conteúdo aparece mesmo
 * antes do JS carregar no celular. O JS só cuida do parallax ao rolar.
 */
export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section id="topo" ref={ref} className="grain relative isolate overflow-hidden pb-16 pt-32 md:pb-24 md:pt-36 lg:min-h-svh">
      {/* luz de espelho ao fundo (gradiente simples, sem filtro de desfoque) */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 55% at 92% 8%, rgba(201,165,92,0.11), transparent 70%), radial-gradient(45% 40% at 0% 100%, rgba(239,237,232,0.035), transparent 70%)",
        }}
      />

      <div className="mx-auto grid max-w-7xl items-end gap-14 px-5 md:px-8 lg:grid-cols-12 lg:gap-8">
        <motion.div style={reduce ? undefined : { y: textY, opacity: fade }} className="lg:col-span-7">
          <div className="hero-fade" style={{ animationDelay: "0.05s" }}>
            <OpenBadge />
          </div>

          <h1 className="sign mt-7 text-[clamp(4.2rem,12vw,8.6rem)] text-bone">
            {headline.map((line, i) => (
              <span key={line} className="-mt-[0.14em] block overflow-hidden pb-[0.05em] pt-[0.14em]">
                <span
                  className={`hero-line block ${i === 2 ? "brass-text" : ""}`}
                  style={{ animationDelay: `${0.1 + i * 0.1}s` }}
                >
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <span
            aria-hidden
            className="hero-razor mt-8 block h-px w-full max-w-md origin-left bg-gradient-to-r from-brass via-brass-light/60 to-transparent"
            style={{ animationDelay: "0.5s" }}
          />

          {/* sem esconder: o texto já aparece na primeira pintura */}
          <div className="hero-rise" style={{ animationDelay: "0.35s" }}>
            <p className="mt-8 max-w-[34rem] text-lg leading-relaxed text-bone/75">
              Corte, barba e sobrancelha na navalha no centro de Araguari. Escolha hora marcada ou ordem de chegada, o
              ambiente é climatizado e a cerveja está sempre gelada.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href="#agendar" className="btn-brass text-base">
                Montar meu horário
              </a>
              <a href={waLink(mainUnit.whatsapp)} target="_blank" rel="noopener noreferrer" className="btn-ghost text-base">
                <WhatsAppIcon className="size-5 text-brass" />
                Falar no WhatsApp
              </a>
            </div>

            <a
              href={brand.googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-10 inline-flex items-center gap-4 text-sm text-bone/70"
            >
              <span className="grid size-10 place-items-center rounded-full bg-bone">
                <GoogleIcon className="size-5" />
              </span>
              <span>
                <span className="flex items-center gap-1.5">
                  <span className="sign text-2xl text-bone">{brand.rating}</span>
                  <span className="flex text-brass">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="size-3.5 fill-current" strokeWidth={0} />
                    ))}
                  </span>
                </span>
                <span className="transition-colors group-hover:text-bone">{brand.reviewsCount} avaliações no Google</span>
              </span>
            </a>
          </div>
        </motion.div>

        {/* Espelho em arco com a foto principal */}
        <div className="relative lg:col-span-5">
          <div
            className="hero-arch relative mx-auto aspect-[3/4] w-full max-w-[420px] overflow-hidden rounded-t-full border border-brass/40 p-2"
            style={{ animationDelay: "0.2s" }}
          >
            <motion.div style={reduce ? undefined : { y: imgY }} className="absolute inset-2 -top-[10%] overflow-hidden rounded-t-full">
              <ImageSlot
                src={heroImage.src}
                alt={heroImage.alt}
                sizes="(min-width: 1024px) 420px, 90vw"
                preload
                hint=" "
                plain
                className="h-[115%] w-full"
              />
            </motion.div>
            <div aria-hidden className="pointer-events-none absolute inset-x-2 bottom-2 h-1/3 bg-gradient-to-t from-ink/90 to-transparent" />
            <div className="absolute inset-x-0 bottom-8 flex justify-center">
              <Image src="/images/logo-crop.png" alt="" width={397} height={121} sizes="176px" className="w-44 opacity-90" />
            </div>
          </div>

          {/* poste de barbeiro girando */}
          <div
            aria-hidden
            className="hero-rise absolute -left-2 bottom-10 hidden flex-col items-center sm:flex lg:-left-6"
            style={{ animationDelay: "0.7s" }}
          >
            <span className="h-4 w-7 rounded-t-full bg-gradient-to-b from-brass-light to-brass-deep" />
            <span className="relative h-44 w-5 overflow-hidden rounded-sm border border-bone/20">
              <span className="pole-stripes pole-run-y absolute inset-x-0 -top-10 bottom-0" />
              <span className="absolute inset-0 bg-gradient-to-r from-ink/50 via-transparent to-ink/60" />
            </span>
            <span className="h-4 w-7 rounded-b-full bg-gradient-to-t from-brass-light to-brass-deep" />
          </div>
        </div>
      </div>

      <a
        href="#servicos"
        aria-label="Rolar para os serviços"
        className="hero-fade absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs text-steel lg:flex"
        style={{ animationDelay: "1.2s" }}
      >
        Role para ver
        <span className="relative h-10 w-px overflow-hidden bg-line">
          <span className="scroll-cue absolute inset-x-0 top-0 h-4 bg-brass" />
        </span>
      </a>
    </section>
  );
}
