"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Horizontaler Scroll-Snap-Slider (nur < lg) mit Punkt-Navigation.
 * Ab lg wird daraus über die Klassen ein normales Grid.
 */
export default function SnapDots({
  children,
  count,
  className = "",
  label,
}: {
  children: React.ReactNode;
  count: number;
  className?: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const kids = Array.from(el.children) as HTMLElement[];
      const left = el.scrollLeft + el.clientWidth * 0.35;
      let idx = 0;
      kids.forEach((k, i) => {
        if (k.offsetLeft - el.offsetLeft <= left) idx = i;
      });
      setActive(idx);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const go = (i: number) => {
    const el = ref.current;
    const kid = el?.children[i] as HTMLElement | undefined;
    if (el && kid) el.scrollTo({ left: kid.offsetLeft - el.offsetLeft, behavior: "smooth" });
  };

  return (
    <div>
      <div ref={ref} className={`fl-snap no-scrollbar ${className}`} aria-label={label} role="region">
        {children}
      </div>
      <div className="mt-5 flex justify-center gap-2 lg:hidden">
        {Array.from({ length: count }).map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => go(i)}
            aria-label={`Eintrag ${i + 1} anzeigen`}
            aria-current={active === i}
            className={`h-2 rounded-full transition-all duration-300 ${active === i ? "w-6 bg-fl-brand" : "w-2 bg-fl-line"}`}
          />
        ))}
      </div>
    </div>
  );
}
