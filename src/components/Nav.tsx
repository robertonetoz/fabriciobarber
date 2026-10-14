"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { navLinks, brand, mainUnit } from "@/data/site";
import { InstagramIcon, WhatsAppIcon } from "./Icons";
import { waLink } from "@/lib/utils";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,padding] duration-500 ${
        scrolled ? "border-b border-line/70 bg-ink/80 py-3 backdrop-blur-xl" : "border-b border-transparent py-5"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-8" aria-label="Principal">
        <a href="#topo" className="relative z-10 shrink-0" aria-label="Fabrício Pereira Barber Club — início">
          <Image src="/images/logo-crop.png" alt="Fabrício Pereira Barber Club" width={397} height={121} className="h-9 w-auto md:h-10" preload />
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="group relative text-[15px] text-bone/80 transition-colors hover:text-bone">
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-brass transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <a href={brand.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="grid size-11 place-items-center rounded-full text-bone/70 transition-colors hover:text-brass">
            <InstagramIcon className="size-5" />
          </a>
          <a href="#agendar" className="btn-brass !py-2.5 text-[15px]">
            Agendar horário
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="relative z-10 grid size-11 place-items-center rounded-full border border-line text-bone lg:hidden"
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-mobile"
            data-lenis-prevent
            className="fixed inset-0 flex flex-col bg-ink px-6 pb-10 pt-28 lg:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <div aria-hidden className="pole-stripes animate-pole absolute right-0 top-0 h-full w-2 opacity-60" />
            <ul className="flex flex-col gap-1">
              {[...navLinks, { href: "#agendar", label: "Agendar" }].map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.05, duration: 0.5 }}
                >
                  <a href={l.href} onClick={() => setOpen(false)} className="sign block py-2 text-5xl text-bone transition-colors hover:text-brass">
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="mt-auto flex flex-col gap-3">
              <a href={waLink(mainUnit.whatsapp)} target="_blank" rel="noopener noreferrer" className="btn-brass">
                <WhatsAppIcon className="size-5" /> {mainUnit.phoneDisplay}
              </a>
              <a href={brand.instagram} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                <InstagramIcon className="size-5" /> {brand.instagramHandle}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
