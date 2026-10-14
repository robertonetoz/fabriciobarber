"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";
import type { ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
  y?: number;
  children: ReactNode;
};

/** Entra subindo e aparecendo quando o bloco chega na tela */
export function Reveal({ delay = 0, y = 32, children, ...rest }: RevealProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -5% 0px" }}
      transition={{ duration: 0.75, ease, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/**
 * Título de letreiro: cada linha sobe de trás de uma "máscara",
 * como uma placa sendo revelada.
 */
export function SignHeading({
  lines,
  as: Tag = "h2",
  className = "",
  lineClassName = "",
  delay = 0,
}: {
  lines: ReactNode[];
  as?: "h1" | "h2" | "h3";
  className?: string;
  lineClassName?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[Tag];
  // O gatilho fica no título inteiro: as linhas escondidas atrás da máscara
  // nunca "entram na tela" sozinhas.
  return (
    <MotionTag
      className={`sign ${className}`}
      initial={reduce ? false : "hidden"}
      whileInView="shown"
      viewport={{ once: true, margin: "0px 0px -5% 0px" }}
    >
      {lines.map((line, i) => (
        <span key={i} className="-mt-[0.14em] block overflow-hidden pb-[0.06em] pt-[0.14em]">
          <motion.span
            className={`block ${lineClassName}`}
            variants={{ hidden: { y: "120%" }, shown: { y: "0%" } }}
            transition={{ duration: 1, ease, delay: delay + i * 0.09 }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}

/** Linha dourada que "corta" a tela da esquerda para a direita */
export function RazorLine({ className = "", delay = 0 }: { className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      aria-hidden
      className={`block h-px origin-left bg-gradient-to-r from-brass via-brass-light to-transparent ${className}`}
      initial={reduce ? false : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.3, ease, delay }}
    />
  );
}
