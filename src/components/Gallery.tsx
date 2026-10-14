"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { brand, gallery } from "@/data/site";
import ImageSlot from "./ImageSlot";
import { InstagramIcon } from "./Icons";
import { Reveal, SignHeading } from "./Reveal";

export default function Gallery() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const step = useCallback(
    (dir: 1 | -1) => setActive((a) => (a === null ? a : (a + dir + gallery.length) % gallery.length)),
    []
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close, step]);

  return (
    <section id="trabalhos" className="relative bg-coal py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SignHeading lines={["Trabalhos", "da casa"]} className="text-[clamp(3rem,8vw,7rem)] text-bone" />
          <Reveal delay={0.1}>
            <a href={brand.instagram} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              <InstagramIcon className="size-5 text-brass" />
              Ver mais no Instagram
            </a>
          </Reveal>
        </div>

        {/* colunas pares descem um pouco no desktop, como fotos presas no espelho */}
        <div className="mt-14 grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4 lg:pb-20">
          {gallery.map((g, i) => (
            <div key={g.src || i} className={i % 2 === 1 ? "lg:translate-y-20" : ""}>
              <motion.button
                type="button"
                onClick={() => setActive(i)}
                initial={reduce ? false : { opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -5% 0px" }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: (i % 4) * 0.08 }}
                className="group relative block aspect-[4/5] w-full overflow-hidden text-left"
                aria-label={`Ampliar: ${g.alt}`}
              >
                <span className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105">
                  <ImageSlot src={g.src} alt={g.alt} blur={g.blur} sizes="(min-width:1024px) 25vw, 50vw" className="h-full w-full" />
                </span>
                <span className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-ink/70 text-bone opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
                  <Expand className="size-4" />
                </span>
              </motion.button>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            role="dialog"
            data-lenis-prevent
            aria-modal="true"
            aria-label={gallery[active].alt}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/95 p-4 md:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[4/5] w-[min(88vw,64vh)]"
              onClick={(e) => e.stopPropagation()}
            >
              <ImageSlot src={gallery[active].src} alt={gallery[active].alt} blur={gallery[active].blur} sizes="(min-width:768px) 64vh, 88vw" className="h-full w-full" />
              <p className="absolute -bottom-9 left-0 right-0 text-center text-sm tabular-nums text-smoke">
                {active + 1}/{gallery.length}
              </p>
            </motion.div>

            <button type="button" onClick={close} aria-label="Fechar" className="absolute right-4 top-4 grid size-12 place-items-center rounded-full border border-line bg-coal text-bone hover:border-brass">
              <X className="size-5" />
            </button>
            <button type="button" onClick={(e) => { e.stopPropagation(); step(-1); }} aria-label="Foto anterior" className="absolute left-3 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full border border-line bg-coal text-bone hover:border-brass md:left-6">
              <ChevronLeft className="size-5" />
            </button>
            <button type="button" onClick={(e) => { e.stopPropagation(); step(1); }} aria-label="Próxima foto" className="absolute right-3 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full border border-line bg-coal text-bone hover:border-brass md:right-6">
              <ChevronRight className="size-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
