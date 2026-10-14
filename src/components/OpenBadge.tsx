"use client";

import { useEffect, useState } from "react";
import { mainUnit } from "@/data/site";
import { openStatus } from "@/lib/utils";

export default function OpenBadge({ className = "" }: { className?: string }) {
  const [status, setStatus] = useState<ReturnType<typeof openStatus> | null>(null);

  useEffect(() => {
    const tick = () => setStatus(openStatus(mainUnit.hours!));
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className={`inline-flex items-center gap-2.5 rounded-full border border-line bg-coal px-3.5 py-1.5 text-[13px] text-bone/85 ${className}`}>
      <span className="relative flex size-2">
        {status?.open && <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />}
        <span className={`relative inline-flex size-2 rounded-full ${status ? (status.open ? "bg-emerald-400" : "bg-smoke") : "bg-line"}`} />
      </span>
      {status ? status.text : "Seg 13h–20h, ter a sáb a partir das 8h"}
    </span>
  );
}
