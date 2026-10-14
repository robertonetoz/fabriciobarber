"use client";

import { useSyncExternalStore } from "react";

const noop = () => () => {};

/** true só no navegador — evita divergência de datas/horários com o HTML do servidor */
export function useMounted() {
  return useSyncExternalStore(noop, () => true, () => false);
}
