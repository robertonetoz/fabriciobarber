import type { DayHours } from "@/data/site";

export function waLink(number: string, text?: string) {
  const base = `https://wa.me/${number}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export function toMinutes(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

export function fromMinutes(min: number) {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

/** Hora atual em Araguari (America/Sao_Paulo), independente do fuso do visitante */
export function nowInAraguari() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Sao_Paulo",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const hour = Number(get("hour")) % 24;
  return { day: days.indexOf(get("weekday")), minutes: hour * 60 + Number(get("minute")) };
}

export function openStatus(hours: DayHours[]) {
  const { day, minutes } = nowInAraguari();
  const today = hours[day];
  if (today && minutes >= toMinutes(today.open) && minutes < toMinutes(today.close)) {
    return { open: true, day, text: `Aberto agora · fecha às ${today.close.replace(":00", "h")}` };
  }
  // próxima abertura
  for (let i = 0; i < 7; i++) {
    const d = (day + i) % 7;
    const h = hours[d];
    if (!h) continue;
    if (i === 0 && minutes < toMinutes(h.open)) {
      return { open: false, day, text: `Fechado · abre hoje às ${h.open.replace(":00", "h")}` };
    }
    if (i > 0) {
      const when = i === 1 ? "amanhã" : ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"][d];
      return { open: false, day, text: `Fechado · abre ${when} às ${h.open.replace(":00", "h")}` };
    }
  }
  return { open: false, day, text: "Fechado" };
}

export function slotsFor(h: DayHours, step = 30) {
  if (!h) return [];
  const out: string[] = [];
  for (let t = toMinutes(h.open); t <= toMinutes(h.close) - step; t += step) out.push(fromMinutes(t));
  return out;
}
