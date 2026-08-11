"use client";

import Image from "next/image";
import { useRef, useState } from "react";

type Props = {
  before: string;
  after: string;
  beforeAlt?: string;
  afterAlt?: string;
};

// Smooth draggable before/after image comparison (Vorher · Nachher).
export default function BeforeAfter({
  before,
  after,
  beforeAlt = "Vorher",
  afterAlt = "Nachher",
}: Props) {
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  function moveTo(clientX: number) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const p = ((clientX - r.left) / r.width) * 100;
    setPos(Math.max(0, Math.min(100, p)));
  }

  // Eased transition when the user taps a spot; instant while actively dragging.
  const ease = dragging ? "" : "transition-[clip-path,left] duration-200 ease-out";

  return (
    <div
      ref={ref}
      className="group relative aspect-[4/3] w-full touch-none select-none overflow-hidden bg-surface"
      onPointerDown={(e) => {
        setDragging(true);
        e.currentTarget.setPointerCapture(e.pointerId);
        moveTo(e.clientX);
      }}
      onPointerMove={(e) => {
        if (dragging) moveTo(e.clientX);
      }}
      onPointerUp={() => setDragging(false)}
      onPointerCancel={() => setDragging(false)}
      role="slider"
      aria-label="Vorher-Nachher-Vergleich"
      aria-valuenow={Math.round(pos)}
      aria-valuemin={0}
      aria-valuemax={100}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 4));
        if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 4));
      }}
    >
      {/* After (full) */}
      <Image
        src={after}
        alt={afterAlt}
        fill
        sizes="(max-width:768px) 100vw, 33vw"
        className="object-cover"
        draggable={false}
      />

      {/* Before (clipped to the left of the handle) */}
      <div
        className={`absolute inset-0 will-change-[clip-path] ${ease}`}
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <Image
          src={before}
          alt={beforeAlt}
          fill
          sizes="(max-width:768px) 100vw, 33vw"
          className="object-cover"
          draggable={false}
        />
      </div>

      {/* Labels */}
      <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-ink/80 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white backdrop-blur">
        Vorher
      </span>
      <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-brand px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white backdrop-blur">
        Nachher
      </span>

      {/* Divider */}
      <div
        className={`pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.08)] ${ease}`}
        style={{ left: `${pos}%`, transform: "translateX(-50%)" }}
      />

      {/* Handle */}
      <div
        className={`pointer-events-none absolute top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-brand shadow-lg ring-1 ring-black/5 ${ease}`}
        style={{ left: `${pos}%` }}
        aria-hidden
      >
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 3 12 9 6" />
          <polyline points="15 6 21 12 15 18" />
        </svg>
      </div>
    </div>
  );
}
