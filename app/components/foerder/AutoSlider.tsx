"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type Slide = { src: string; alt: string };

/**
 * Automatischer Bild-Slider (Crossfade + leichter Zoom).
 * Pausiert bei Hover/Fokus und wenn außerhalb des Viewports,
 * Swipe auf Touch, Punkte-Navigation, ohne Autoplay bei reduced motion.
 */
export default function AutoSlider({
  slides,
  interval = 4500,
  sizes = "100vw",
  className = "",
}: {
  slides: Slide[];
  interval?: number;
  sizes?: string;
  className?: string;
}) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const touchX = useRef<number | null>(null);
  const n = slides.length;

  const go = useCallback((to: number) => setI(((to % n) + n) % n), [n]);

  // Nur laufen, wenn sichtbar
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (paused || !visible || n < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setTimeout(() => go(i + 1), interval);
    return () => window.clearTimeout(t);
  }, [i, paused, visible, interval, n, go]);

  return (
    <div
      ref={ref}
      className={`group/slider absolute inset-0 ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 40) go(i + (dx < 0 ? 1 : -1));
        touchX.current = null;
      }}
      role="region"
      aria-roledescription="Karussell"
      aria-label="Bilder unserer Wärmepumpen-Installationen"
    >
      {slides.map((s, k) => (
        <div
          key={s.src}
          aria-hidden={k !== i}
          className={`absolute inset-0 transition-opacity duration-[1100ms] ease-out ${k === i ? "opacity-100" : "opacity-0"}`}
        >
          <Image
            src={s.src}
            alt={s.alt}
            fill
            sizes={sizes}
            priority={k === 0}
            className={`object-cover transition-transform duration-[6000ms] ease-out ${k === i ? "scale-[1.06]" : "scale-100"}`}
          />
        </div>
      ))}

      {/* Punkte */}
      <div className="absolute inset-x-0 top-4 z-10 flex justify-end gap-2 pr-4 sm:bottom-4 sm:top-auto sm:justify-center sm:pr-0">
        {slides.map((s, k) => (
          <button
            key={s.src}
            type="button"
            onClick={() => go(k)}
            aria-label={`Bild ${k + 1} von ${n} anzeigen`}
            aria-current={k === i}
            className={`h-2 rounded-full shadow-sm ring-1 ring-black/10 transition-all duration-300 ${k === i ? "w-7 bg-white" : "w-2 bg-white/60 hover:bg-white/90"}`}
          />
        ))}
      </div>

      {/* Fortschritt des aktuellen Bilds */}
      {!paused && visible && n > 1 && (
        <div key={i} className="fl-slide-progress absolute inset-x-0 top-0 z-10 h-[3px] origin-left bg-fl-yellow/90" style={{ animationDuration: `${interval}ms` }} />
      )}
    </div>
  );
}
