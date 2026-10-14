"use client";

import { motion, useReducedMotion } from "motion/react";
import { Star } from "lucide-react";
import { brand, reviews } from "@/data/site";
import { GoogleIcon } from "./Icons";
import { Reveal } from "./Reveal";

export default function Reviews() {
  const reduce = useReducedMotion();
  const [featured, ...rest] = reviews;

  return (
    <section id="avaliacoes" className="relative py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <a href={brand.googleReviewsUrl} target="_blank" rel="noopener noreferrer" className="group block">
                <span className="sign block text-[clamp(6rem,14vw,11rem)] text-bone">{brand.rating}</span>
                <span className="mt-2 flex gap-1 text-brass">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-6 fill-current" strokeWidth={0} />
                  ))}
                </span>
                <span className="mt-4 flex items-center gap-2 text-steel transition-colors group-hover:text-bone">
                  <GoogleIcon className="size-5" /> {brand.reviewsCount} avaliações no Google
                </span>
              </a>
            </Reveal>
          </div>

          <figure className="lg:col-span-8">
            <Reveal delay={0.1}>
              <span aria-hidden className="sign block h-16 text-[8rem] leading-none text-brass/60">“</span>
              <blockquote className="text-[clamp(1.6rem,3.2vw,2.6rem)] font-medium leading-[1.25] tracking-[-0.01em] text-bone">
                {featured.text}
              </blockquote>
              <figcaption className="mt-6 text-steel">
                <span className="text-bone">{featured.author}</span>, {featured.meta}, {featured.when}
              </figcaption>
            </Reveal>
          </figure>
        </div>

        <div className="mt-20 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {rest.map((r, i) => (
            <motion.figure
              key={r.author}
              initial={reduce ? false : { opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -5% 0px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: (i % 3) * 0.1 }}
              className="mb-4 break-inside-avoid border border-line bg-coal p-6"
            >
              <span className="flex gap-0.5 text-brass">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} className="size-4 fill-current" strokeWidth={0} />
                ))}
              </span>
              <blockquote className="mt-4 leading-relaxed text-bone/85">{r.text}</blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-full bg-char text-sm font-semibold text-brass">
                  {r.author.charAt(0)}
                </span>
                <span className="text-sm">
                  <span className="block text-bone">{r.author}</span>
                  <span className="block text-steel">{r.meta}, {r.when}</span>
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
