"use client";

import { useSyncExternalStore } from "react";

const noop = () => () => {};

/** true só no navegador — evita divergência de datas/horários com o HTML do servidor */
export function useMounted() {
  return useSyncExternalStore(noop, () => true, () => false);
}

/** Acompanha uma media query; no servidor sempre false */
export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia(query).matches,
    () => false
  );
}
