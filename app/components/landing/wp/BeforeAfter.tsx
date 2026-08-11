"use client";

import Image from "next/image";
import { useRef, useState } from "react";

type Props = {
  before: string;
  after: string;
  beforeAlt?: string;
  afterAlt?: string;
};

// Draggable before/after image comparison (Vorher · Nachher), like the Figma.
export default function BeforeAfter({
  before,
  after,
  beforeAlt = "Vorher",
  afterAlt = "Nachher",
}: Props) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);

  function moveTo(clientX: number) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const p = ((clientX - r.left) / r.width) * 100;
    setPos(Math.max(0, Math.min(100, p)));
  }

  return (
    <div
      ref={ref}
      className="group relative aspect-[4/3] w-full cursor-ew-resize select-none overflow-hidden bg-surface"
      onPointerDown={(e) => {
        e.currentTarget.setPointerCapture(e.pointerId);
        moveTo(e.clientX);
      }}
      onPointerMove={(e) => {
        if (e.buttons === 1) moveTo(e.clientX);
      }}
    >
      {/* After (full) */}
      <Image src={after} alt={afterAlt} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover" />

      {/* Before (clipped to the left of the handle) */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <Image src={before} alt={beforeAlt} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover" />
      </div>

      {/* Labels */}
      <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-ink/80 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white backdrop-blur">
        Vorher
      </span>
      <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-brand px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white backdrop-blur">
        Nachher
      </span>

      {/* Divider + handle */}
      <div
        className="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.08)]"
        style={{ left: `${pos}%`, transform: "translateX(-50%)" }}
      />
      <div
        className="pointer-events-none absolute top-1/2 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-brand shadow-lg ring-1 ring-black/5"
        style={{ left: `${pos}%` }}
        aria-hidden
      >
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 3 12 9 6" />
          <polyline points="15 6 21 12 15 18" />
        </svg>
      </div>
    </div>
  );
}
