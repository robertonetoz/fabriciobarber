"use client";

import { motion, useReducedMotion } from "motion/react";
import { team } from "@/data/site";
import ImageSlot from "./ImageSlot";
import { Reveal, SignHeading } from "./Reveal";

export default function Team() {
  const reduce = useReducedMotion();
  return (
    <section id="equipe" className="relative py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SignHeading lines={["Quem segura", "a navalha"]} className="text-[clamp(3rem,8vw,7rem)] text-bone" />
          <Reveal delay={0.1}>
            <p className="max-w-sm text-lg leading-relaxed text-bone/70">
              Dois barbeiros, um padrão. Na hora de agendar, você escolhe com quem quer cortar.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-10 md:grid-cols-2 md:gap-8">
          {team.map((m, i) => (
            <motion.article
              key={m.id}
              initial={reduce ? false : { opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: i * 0.15 }}
              className={`group ${i === 1 ? "md:mt-24" : ""}`}
            >
              <div className="relative overflow-hidden">
                <motion.div
                  initial={reduce ? false : { clipPath: "inset(0 0 100% 0)" }}
                  whileInView={{ clipPath: "inset(0 0 0% 0)" }}
                  viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                  transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1], delay: 0.1 + i * 0.15 }}
                >
                  <ImageSlot
                    src={m.src}
                    alt={`Foto de ${m.name}`}
                    hint="Foto do barbeiro"
                    sizes="(min-width:768px) 45vw, 100vw"
                    className="aspect-[4/5] w-full transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.03]"
                  />
                </motion.div>
                <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <p className="text-sm text-brass">{m.role}</p>
                  <h3 className="sign mt-2 text-5xl text-bone md:text-6xl">{m.name}</h3>
                </div>
              </div>
              <p className="mt-6 max-w-md leading-relaxed text-steel">{m.bio}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
