"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, CheckCheck } from "lucide-react";
import { services, team, units, unitOneHours, weekdayNames } from "@/data/site";
import { nowInAraguari, slotsFor, toMinutes, waLink } from "@/lib/utils";
import { useMounted } from "@/lib/hooks";
import { WhatsAppIcon } from "./Icons";
import { Reveal, SignHeading } from "./Reveal";

type Mode = "marcada" | "chegada";
type Period = "manha" | "tarde" | "noite";

const periods: { id: Period; label: string; range: [number, number] }[] = [
  { id: "manha", label: "Manhã", range: [0, 12 * 60] },
  { id: "tarde", label: "Tarde", range: [12 * 60, 18 * 60] },
  { id: "noite", label: "Noite", range: [18 * 60, 24 * 60] },
];

const monthShort = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];

type DayOption = { key: string; date: Date; weekday: number; label: string; sub: string };

function buildDays(): DayOption[] {
  const out: DayOption[] = [];
  const base = new Date();
  for (let i = 0; out.length < 12 && i < 21; i++) {
    const d = new Date(base.getFullYear(), base.getMonth(), base.getDate() + i);
    const wd = d.getDay();
    if (!unitOneHours[wd]) continue;
    out.push({
      key: d.toISOString().slice(0, 10),
      date: d,
      weekday: wd,
      label: i === 0 ? "Hoje" : i === 1 ? "Amanhã" : weekdayNames[wd].slice(0, 3),
      sub: `${d.getDate()} ${monthShort[d.getMonth()]}`,
    });
  }
  return out;
}

export default function Booking() {
  const [selected, setSelected] = useState<string[]>(["corte"]);
  const [mode, setMode] = useState<Mode>("marcada");
  const [barber, setBarber] = useState<string>("sem-preferencia");
  const [unitId, setUnitId] = useState(units[0].id);
  const [rawDay, setDay] = useState<string>("");
  const [rawTime, setTime] = useState<string>("");
  const [rawPeriod, setPeriod] = useState<Period | "">("");
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [flash, setFlash] = useState<string | null>(null);

  // Datas só no navegador, para não divergir do HTML gerado no servidor
  const mounted = useMounted();
  const days = useMemo(() => (mounted ? buildDays() : []), [mounted]);
  const day = rawDay || days[0]?.key || "";

  // Serviço adicionado a partir da seção "Serviços"
  useEffect(() => {
    const onAdd = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      setSelected((s) => (s.includes(id) ? s : [...s, id]));
      setFlash(id);
      setTimeout(() => setFlash(null), 1400);
    };
    window.addEventListener("booking:add", onAdd);
    return () => window.removeEventListener("booking:add", onAdd);
  }, []);

  const dayInfo = days.find((d) => d.key === day);
  const unit = units.find((u) => u.id === unitId)!;

  const slots = useMemo(() => {
    if (!dayInfo) return [];
    const all = slotsFor(unitOneHours[dayInfo.weekday]);
    const isToday = dayInfo.label === "Hoje";
    if (!isToday) return all;
    const { minutes } = nowInAraguari();
    return all.filter((s) => toMinutes(s) > minutes + 20);
  }, [dayInfo]);

  const availablePeriods = useMemo(() => {
    if (!dayInfo) return [];
    const h = unitOneHours[dayInfo.weekday];
    if (!h) return [];
    const [o, c] = [toMinutes(h.open), toMinutes(h.close)];
    return periods.filter((p) => p.range[0] < c && p.range[1] > o);
  }, [dayInfo]);

  // Ao trocar de dia, descarta horário/período que não existem nele
  const time = slots.includes(rawTime) ? rawTime : "";
  const period = availablePeriods.some((p) => p.id === rawPeriod) ? rawPeriod : "";

  const toggle = (id: string) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const chosenServices = services.filter((s) => selected.includes(s.id));
  const barberName = team.find((t) => t.id === barber)?.name;
  const dateText = dayInfo
    ? `${weekdayNames[dayInfo.weekday].toLowerCase()}, ${dayInfo.date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" })}`
    : "";
  const periodLabel = periods.find((p) => p.id === period)?.label.toLowerCase();

  const message = useMemo(() => {
    const lines = [
      `Olá! ${name.trim() ? `Meu nome é ${name.trim()} e g` : "G"}ostaria de agendar na ${unit.name} (${unit.label}).`,
      "",
      `✂️ Serviços: ${chosenServices.length ? chosenServices.map((s) => s.name).join(", ") : "a definir"}`,
      `📅 Dia: ${dateText || "a combinar"}`,
      mode === "marcada"
        ? `🕒 Horário: ${time || "a combinar"} (hora marcada)`
        : `🚶 Por ordem de chegada${periodLabel ? `, no período da ${periodLabel}` : ""}`,
      `💈 Barbeiro: ${barberName ?? "sem preferência"}`,
    ];
    if (note.trim()) lines.push(`📝 Obs.: ${note.trim()}`);
    lines.push("", mode === "marcada" ? "Esse horário está disponível?" : "Qual o movimento nesse período?");
    return lines.join("\n");
  }, [name, unit, chosenServices, dateText, mode, time, periodLabel, barberName, note]);

  const ready = chosenServices.length > 0 && !!day && (mode === "chegada" || !!time);

  return (
    <section id="agendar" className="relative overflow-hidden py-24 md:py-36">
      <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-[700px]" style={{ background: "radial-gradient(50% 60% at 50% 0%, rgba(201,165,92,0.08), transparent 70%)" }} />
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <SignHeading lines={["Monte seu", "horário"]} className="text-[clamp(3rem,8vw,7rem)] text-bone lg:col-span-7" />
          <Reveal delay={0.1} className="lg:col-span-5">
            <p className="max-w-md text-lg leading-relaxed text-bone/70">
              Escolha o que vai fazer, o dia e o horário. A mensagem sai pronta no WhatsApp da barbearia, é só enviar e
              aguardar a confirmação.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Formulário */}
          <Reveal className="min-w-0 lg:col-span-7">
            <div className="space-y-10 border border-line bg-coal p-5 sm:p-8">
              <Step n={1} title="Serviços" hint="Pode marcar mais de um">
                <div className="grid gap-3 sm:grid-cols-2">
                  {services.map((s) => {
                    const on = selected.includes(s.id);
                    return (
                      <motion.button
                        key={s.id}
                        type="button"
                        onClick={() => toggle(s.id)}
                        aria-pressed={on}
                        animate={flash === s.id ? { scale: [1, 1.04, 1] } : undefined}
                        transition={{ duration: 0.5 }}
                        className={`flex items-center justify-between gap-3 border px-4 py-4 text-left transition-colors duration-300 ${
                          on ? "border-brass bg-brass/10 text-bone" : "border-line text-bone/75 hover:border-smoke"
                        }`}
                      >
                        <span className="font-medium">{s.name}</span>
                        <span className={`grid size-6 shrink-0 place-items-center rounded-full border transition-colors ${on ? "border-brass bg-brass text-ink" : "border-smoke"}`}>
                          {on && <Check className="size-3.5" strokeWidth={3} />}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              </Step>

              <Step n={2} title="Como prefere ser atendido">
                <Segmented
                  value={mode}
                  onChange={(v) => setMode(v as Mode)}
                  options={[
                    { id: "marcada", label: "Hora marcada", sub: "Você escolhe o horário" },
                    { id: "chegada", label: "Ordem de chegada", sub: "Chega e entra na fila" },
                  ]}
                />
              </Step>

              <Step n={3} title="Com quem">
                <div className="flex flex-wrap gap-2">
                  {[{ id: "sem-preferencia", name: "Sem preferência" }, ...team].map((b) => (
                    <Chip key={b.id} active={barber === b.id} onClick={() => setBarber(b.id)}>
                      {b.name}
                    </Chip>
                  ))}
                </div>
              </Step>

              <Step n={4} title="Unidade">
                <div className="grid gap-3 sm:grid-cols-2">
                  {units.map((u) => (
                    <button
                      key={u.id}
                      type="button"
                      onClick={() => setUnitId(u.id)}
                      aria-pressed={unitId === u.id}
                      className={`border px-4 py-3 text-left transition-colors ${unitId === u.id ? "border-brass bg-brass/10" : "border-line hover:border-smoke"}`}
                    >
                      <span className="block font-medium text-bone">{u.name}</span>
                      <span className="block text-sm text-steel">{u.street}, {u.district}</span>
                    </button>
                  ))}
                </div>
              </Step>

              <Step n={5} title="Dia" hint="Domingo fechado">
                <div className="-mx-1 flex snap-x gap-2 overflow-x-auto px-1 pb-2 [scrollbar-width:thin]" data-lenis-prevent>
                  {days.length === 0
                    ? Array.from({ length: 7 }).map((_, i) => <span key={i} className="h-[68px] w-[72px] shrink-0 animate-pulse bg-char" />)
                    : days.map((d) => (
                        <button
                          key={d.key}
                          type="button"
                          onClick={() => setDay(d.key)}
                          aria-pressed={day === d.key}
                          className={`w-[72px] shrink-0 snap-start border py-2.5 text-center transition-colors ${
                            day === d.key ? "border-brass bg-brass text-ink" : "border-line text-bone/80 hover:border-smoke"
                          }`}
                        >
                          <span className="block text-xs">{d.label}</span>
                          <span className="sign block text-2xl">{d.sub.split(" ")[0]}</span>
                          <span className="block text-[11px] opacity-70">{d.sub.split(" ")[1]}</span>
                        </button>
                      ))}
                </div>
              </Step>

              <AnimatePresence mode="wait" initial={false}>
                {mode === "marcada" ? (
                  <motion.div key="hora" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                    <Step n={6} title="Horário" hint={dayInfo ? `${unitOneHours[dayInfo.weekday]?.open.replace(":00", "h")} às ${unitOneHours[dayInfo.weekday]?.close.replace(":00", "h")}` : undefined}>
                      {slots.length ? (
                        <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
                          {slots.map((s) => (
                            <button
                              key={s}
                              type="button"
                              onClick={() => setTime(s)}
                              aria-pressed={time === s}
                              className={`border py-2 text-sm tabular-nums transition-colors ${time === s ? "border-brass bg-brass text-ink" : "border-line text-bone/80 hover:border-smoke"}`}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <p className="text-steel">Os horários de hoje já passaram. Escolha outro dia.</p>
                      )}
                    </Step>
                  </motion.div>
                ) : (
                  <motion.div key="periodo" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                    <Step n={6} title="Período em que pretende ir" hint="Opcional">
                      <div className="flex flex-wrap gap-2">
                        {availablePeriods.map((p) => (
                          <Chip key={p.id} active={period === p.id} onClick={() => setPeriod(period === p.id ? "" : p.id)}>
                            {p.label}
                          </Chip>
                        ))}
                      </div>
                    </Step>
                  </motion.div>
                )}
              </AnimatePresence>

              <Step n={7} title="Seus dados">
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1.5 block text-sm text-steel">Seu nome</span>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      autoComplete="given-name"
                      placeholder="Como podemos te chamar"
                      className="w-full border border-line bg-ink px-4 py-3 text-bone placeholder:text-smoke focus:border-brass focus:outline-none"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-sm text-steel">Observação</span>
                    <input
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="Ex.: degradê baixo, é para meu filho"
                      className="w-full border border-line bg-ink px-4 py-3 text-bone placeholder:text-smoke focus:border-brass focus:outline-none"
                    />
                  </label>
                </div>
              </Step>
            </div>
          </Reveal>

          {/* Prévia da mensagem */}
          <Reveal delay={0.15} className="min-w-0 lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <div className="overflow-hidden rounded-[22px] border border-line bg-[#0b141a] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)]">
                <div className="flex items-center gap-3 bg-[#1f2c34] px-4 py-3">
                  <span className="grid size-10 place-items-center rounded-full bg-ink">
                    <span className="sign text-lg text-brass">FP</span>
                  </span>
                  <span>
                    <span className="block text-[15px] font-medium text-bone">{unit.name}</span>
                    <span className="block text-xs text-steel">{unit.phoneDisplay}</span>
                  </span>
                  <WhatsAppIcon className="ml-auto size-5 text-[#25d366]" />
                </div>
                <div
                  className="min-h-[340px] p-4"
                  style={{
                    backgroundImage:
                      "radial-gradient(rgba(255,255,255,0.035) 1px, transparent 1px)",
                    backgroundSize: "14px 14px",
                  }}
                >
                  <motion.div
                    layout
                    transition={{ duration: 0.3 }}
                    className="ml-auto max-w-[92%] rounded-lg rounded-tr-none bg-[#005c4b] px-3.5 pb-2 pt-2.5 text-[14.5px] leading-relaxed text-[#e9edef]"
                  >
                    <p className="whitespace-pre-line break-words">{message}</p>
                    <span className="mt-1 flex items-center justify-end gap-1 text-[11px] text-[#e9edef]/60">
                      agora <CheckCheck className="size-4 text-[#53bdeb]" />
                    </span>
                  </motion.div>
                </div>
              </div>

              <a
                href={ready ? waLink(unit.whatsapp, message) : undefined}
                target="_blank"
                rel="noopener noreferrer"
                aria-disabled={!ready}
                onClick={(e) => !ready && e.preventDefault()}
                className={`btn-brass mt-5 w-full text-base ${ready ? "" : "pointer-events-auto cursor-not-allowed opacity-50"}`}
              >
                <WhatsAppIcon className="size-5" />
                Enviar pelo WhatsApp
              </a>
              <p className="mt-3 text-center text-sm text-steel" aria-live="polite">
                {ready
                  ? "Abre o WhatsApp com a mensagem acima já escrita."
                  : chosenServices.length === 0
                    ? "Escolha pelo menos um serviço."
                    : "Escolha um horário para continuar."}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Step({ n, title, hint, children }: { n: number; title: string; hint?: string; children: React.ReactNode }) {
  return (
    <fieldset className="min-w-0">
      <legend className="mb-4 flex w-full items-baseline gap-3">
        <span className="sign text-xl text-brass">{n}</span>
        <span className="text-lg font-semibold text-bone">{title}</span>
        {hint && <span className="ml-auto text-sm text-steel">{hint}</span>}
      </legend>
      {children}
    </fieldset>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-4 py-2.5 text-[15px] transition-colors ${active ? "border-brass bg-brass text-ink" : "border-line text-bone/80 hover:border-smoke"}`}
    >
      {children}
    </button>
  );
}

function Segmented({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { id: string; label: string; sub: string }[];
}) {
  return (
    <div className="relative grid grid-cols-2 border border-line p-1">
      {options.map((o) => (
        <button key={o.id} type="button" onClick={() => onChange(o.id)} aria-pressed={value === o.id} className="relative px-3 py-3 text-left">
          {value === o.id && (
            <motion.span layoutId="seg-bg" className="absolute inset-0 bg-brass" transition={{ type: "spring", stiffness: 420, damping: 36 }} />
          )}
          <span className={`relative block font-medium transition-colors ${value === o.id ? "text-ink" : "text-bone"}`}>{o.label}</span>
          <span className={`relative block text-sm transition-colors ${value === o.id ? "text-ink/70" : "text-steel"}`}>{o.sub}</span>
        </button>
      ))}
    </div>
  );
}
