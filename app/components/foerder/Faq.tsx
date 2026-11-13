"use client";

import { useId, useState } from "react";

export type FaqItem = { q: string; a: string };

export default function Faq({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState(0);
  const uid = useId();

  return (
    <div className="border-t border-fl-line" data-stagger="0.08">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={it.q} className={`fl-faq border-b border-fl-line ${isOpen ? "is-open" : ""}`}>
            <h3>
              <button
                type="button"
                id={`${uid}-q${i}`}
                aria-expanded={isOpen}
                aria-controls={`${uid}-a${i}`}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="group flex w-full items-center justify-between gap-6 py-6 text-left"
              >
                <span className="text-[17px] font-semibold leading-snug text-fl-ink transition-colors duration-300 group-hover:text-fl-brand sm:text-[19px]">
                  {it.q}
                </span>
                <span className="fl-faq-icon" aria-hidden>
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
                    <path d="M5 12h14" />
                    <path className="fl-faq-v" d="M12 5v14" />
                  </svg>
                </span>
              </button>
            </h3>
            <div id={`${uid}-a${i}`} role="region" aria-labelledby={`${uid}-q${i}`} className="fl-faq-panel">
              <div className="overflow-hidden">
                <p className="max-w-[560px] pb-6 text-[15px] leading-relaxed text-fl-muted">{it.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
