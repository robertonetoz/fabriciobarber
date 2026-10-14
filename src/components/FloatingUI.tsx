"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from "motion/react";
import { mainUnit } from "@/data/site";
import { waLink } from "@/lib/utils";
import { useMediaQuery } from "@/lib/hooks";
import { WhatsAppIcon } from "./Icons";

/** Poste de barbeiro que marca o progresso da rolagem (só em telas grandes) */
function ScrollPole() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const stripeY = useTransform(scrollYProgress, [0, 1], [0, 900]);

  return (
    <div aria-hidden className="fixed right-5 top-1/2 z-40 flex h-[38vh] -translate-y-1/2 flex-col items-center">
      <span className="h-2.5 w-4 rounded-t-full bg-gradient-to-b from-brass-light to-brass-deep" />
      <span className="relative w-2 flex-1 overflow-hidden bg-line/60">
        {/* scaleY em vez de height: só a GPU trabalha, sem recalcular layout */}
        <motion.span className="absolute inset-0 origin-top overflow-hidden" style={{ scaleY: progress }}>
          <motion.span className="pole-stripes absolute inset-x-0 -top-[900px] h-[calc(38vh+1800px)]" style={{ y: stripeY }} />
        </motion.span>
      </span>
      <span className="h-2.5 w-4 rounded-b-full bg-gradient-to-t from-brass-light to-brass-deep" />
    </div>
  );
}

/** Botão flutuante do WhatsApp + poste de progresso no desktop */
export default function FloatingUI() {
  const [show, setShow] = useState(false);
  const wide = useMediaQuery("(min-width: 1280px)");

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {wide && <ScrollPole />}

      <AnimatePresence>
        {show && (
          <motion.a
            href={waLink(mainUnit.whatsapp, "Olá! Vim pelo site e gostaria de agendar um horário.")}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Conversar no WhatsApp"
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className="fixed bottom-5 right-5 z-50 grid size-14 place-items-center rounded-full bg-[#25d366] text-ink shadow-[0_12px_30px_-8px_rgba(37,211,102,0.55)] transition-transform hover:scale-105 xl:right-12"
          >
            <span className="absolute inset-0 animate-ping rounded-full bg-[#25d366] opacity-20" />
            <WhatsAppIcon className="relative size-7 text-white" />
          </motion.a>
        )}
      </AnimatePresence>
    </>
  );
}
