"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowRight, Phone } from "./icons";

/**
 * Kompakte Kopfzeile, die einfährt, sobald der Hero aus dem Bild ist,
 * plus Mobile-CTA-Leiste am unteren Rand (Anruf + Formular).
 */
export default function StickyBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hero = document.querySelector("[data-hero]");
    if (!hero) return;
    const io = new IntersectionObserver(([e]) => setShow(!e.isIntersecting), {
      rootMargin: "-120px 0px 0px 0px",
    });
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <header
        aria-hidden={!show}
        className={`fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-fl-navy/85 backdrop-blur-xl transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] ${
          show ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="fl-container flex h-[68px] items-center justify-between gap-4">
          <a href="#top" tabIndex={show ? 0 : -1} aria-label="Nach oben" className="shrink-0">
            <Image src="/logo-white.png" alt="NOUH-WEHRES" width={466} height={90} className="h-8 w-auto sm:h-9" />
          </a>
          <div className="flex items-center gap-5">
            <a href="tel:+49215487670" tabIndex={show ? 0 : -1} className="hidden items-center gap-2 text-[15px] font-bold text-white transition-colors hover:text-fl-yellow md:flex">
              <Phone size={16} /> 02154 87670
            </a>
            <a href="tel:+49215487670" tabIndex={show ? 0 : -1} aria-label="Anrufen: 02154 87670" className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/20 transition hover:bg-white/20 md:hidden">
              <Phone size={16} />
            </a>
            <a href="#anfrage" tabIndex={show ? 0 : -1} className="fl-btn btn-cta !hidden !h-11 !px-5 !text-[14px] md:!inline-flex">
              <span className="btn-label" data-text="Förder-Beratung sichern">Förder-Beratung sichern</span>
              <ArrowRight className="fl-btn-arrow" size={14} />
            </a>
          </div>
        </div>
        <div id="fl-progress" className="h-[2px] origin-left scale-x-0 bg-fl-yellow" />
      </header>

      {/* Mobile: Daumen-CTA */}
      <div
        className={`fixed inset-x-0 bottom-0 z-50 grid grid-cols-[auto_1fr] gap-2.5 border-t border-black/5 bg-white/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-8px_30px_rgba(0,0,0,0.08)] backdrop-blur-xl transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] md:hidden ${
          show ? "translate-y-0" : "translate-y-full"
        }`}
        aria-hidden={!show}
      >
        <a href="tel:+49215487670" tabIndex={show ? 0 : -1} aria-label="Anrufen: 02154 87670" className="grid h-12 w-12 place-items-center rounded-xl border border-fl-line text-fl-ink active:scale-95">
          <Phone size={18} />
        </a>
        <a href="#anfrage" tabIndex={show ? 0 : -1} className="fl-btn btn-cta !h-12 w-full !text-[15px]">
          <span className="btn-label" data-text="Förder-Beratung sichern">Förder-Beratung sichern</span>
          <ArrowRight className="fl-btn-arrow" size={15} />
        </a>
      </div>
    </>
  );
}
