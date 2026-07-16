"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

export default function Carousel({
  label,
  children,
  autoPlay = false,
  interval = 4500,
}: {
  label: string;
  children: ReactNode;
  autoPlay?: boolean;
  interval?: number;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const fallbackRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [pages, setPages] = useState(1);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  // Snap targets = offset of the first slide of each page (exact snap
  // positions, so programmatic smooth scrolling isn't cancelled by CSS snap).
  const getTargets = useCallback(() => {
    const el = trackRef.current;
    if (!el) return null;
    const slides = Array.from(el.children) as HTMLElement[];
    if (!slides.length) return null;
    const gap = parseFloat(getComputedStyle(el).columnGap || "0") || 0;
    const perView = Math.max(
      1,
      Math.round((el.clientWidth + gap) / (slides[0].offsetWidth + gap))
    );
    const maxScroll = el.scrollWidth - el.clientWidth;
    const base = slides[0].offsetLeft;
    const targets: number[] = [];
    for (let i = 0; i < slides.length; i += perView) {
      targets.push(Math.min(slides[i].offsetLeft - base, maxScroll));
    }
    return { el, targets };
  }, []);

  const update = useCallback(() => {
    const m = getTargets();
    if (!m) return;
    setPages(m.targets.length);
    let nearest = 0;
    m.targets.forEach((t, i) => {
      if (
        Math.abs(m.el.scrollLeft - t) <
        Math.abs(m.el.scrollLeft - m.targets[nearest])
      ) {
        nearest = i;
      }
    });
    setActive(nearest);
  }, [getTargets]);

  useEffect(() => {
    update();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      if (fallbackRef.current) clearTimeout(fallbackRef.current);
    };
  }, [update]);

  // Auto-advance one page at a time, looping back to the start.
  useEffect(() => {
    if (!autoPlay || paused || pages <= 1) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const id = setTimeout(
      () => goTo(active >= pages - 1 ? 0 : active + 1),
      interval
    );
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlay, paused, pages, active, interval]);

  function goTo(i: number) {
    const m = getTargets();
    if (!m) return;
    const clamped = Math.max(0, Math.min(m.targets.length - 1, i));
    const el = m.el;
    const target = m.targets[clamped];
    // Native smooth scrolling is unreliable inside snap-mandatory containers —
    // animate scrollLeft manually via rAF, with a timer fallback that
    // guarantees the final position when rAF is suspended (hidden tab).
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    if (fallbackRef.current) clearTimeout(fallbackRef.current);
    const from = el.scrollLeft;
    const delta = target - from;
    if (Math.abs(delta) < 1) return;
    el.style.scrollSnapType = "none";
    const duration = 450;
    const start = performance.now();
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      el.scrollLeft = target;
      el.style.scrollSnapType = "";
      // Scroll events don't fire in hidden/suspended tabs — sync state here.
      update();
    };
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    const step = (now: number) => {
      if (done) return;
      const t = Math.min(1, (now - start) / duration);
      el.scrollLeft = from + delta * ease(t);
      if (t < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        finish();
      }
    };
    rafRef.current = requestAnimationFrame(step);
    fallbackRef.current = setTimeout(finish, duration + 150);
  }

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
    >
      <div
        ref={trackRef}
        aria-label={label}
        className="no-scrollbar -mx-1 flex snap-x snap-mandatory gap-6 overflow-x-auto px-1 pb-2"
      >
        {children}
      </div>

      <div className="mt-8 flex items-center justify-center gap-5">
        <button
          type="button"
          aria-label="Zurück"
          onClick={() => goTo(active - 1)}
          disabled={active === 0}
          className="grid h-11 w-11 place-items-center rounded-full border border-line bg-white text-ink shadow-sm transition-colors hover:border-brand hover:text-brand disabled:cursor-default disabled:opacity-40 disabled:hover:border-line disabled:hover:text-ink"
        >
          <svg
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <div className="flex items-center gap-2">
          {Array.from({ length: pages }).map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Seite ${i + 1}`}
              aria-current={i === active}
              onClick={() => goTo(i)}
              className={`rounded-full transition-all ${
                i === active
                  ? "h-2 w-6 bg-brand"
                  : "h-2 w-2 bg-line hover:bg-muted/50"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          aria-label="Weiter"
          onClick={() => goTo(active + 1)}
          disabled={active >= pages - 1}
          className="grid h-11 w-11 place-items-center rounded-full border border-line bg-white text-ink shadow-sm transition-colors hover:border-brand hover:text-brand disabled:cursor-default disabled:opacity-40 disabled:hover:border-line disabled:hover:text-ink"
        >
          <svg
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
