"use client";

import { useState } from "react";
import type { FaqItem } from "../../lib/landing";

export default function LandingFaq({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState(0);

  return (
    <div translate="no" className="notranslate mx-auto mt-12 max-w-3xl space-y-3.5">
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <div
            key={f.q}
            className={`rounded-xl border transition-colors ${
              isOpen ? "border-brand/40 bg-white shadow-sm" : "border-line bg-white"
            }`}
          >
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? -1 : i)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
            >
              <span className="font-bold text-ink">{f.q}</span>
              <span
                className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-lg font-semibold transition-colors ${
                  isOpen ? "bg-brand text-white" : "bg-surface text-ink"
                }`}
                aria-hidden
              >
                {isOpen ? "−" : "+"}
              </span>
            </button>
            {isOpen && (
              <p className="px-6 pb-5 text-[15px] leading-relaxed text-muted">
                {f.a}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
