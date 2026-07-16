"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// GSAP fade/slide-up reveal, triggered by IntersectionObserver so it fires
// reliably and re-plays every time an element enters the viewport — on the
// way down AND on the way back up (like go.ruempelwelt.de).
export default function GsapReveal() {
  const pathname = usePathname();

  useEffect(() => {
    let io: IntersectionObserver | null = null;
    let cancelled = false;

    (async () => {
      const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
      if (!els.length) return;

      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (reduce) {
        els.forEach((el) => (el.style.visibility = "visible"));
        return;
      }

      let gsap: typeof import("gsap").gsap;
      try {
        const mod = await import("gsap");
        gsap = mod.gsap ?? mod.default;
      } catch {
        els.forEach((el) => (el.style.visibility = "visible"));
        return;
      }
      if (cancelled) return;

      // Start hidden + shifted down.
      els.forEach((el) => gsap.set(el, { autoAlpha: 0, y: 48 }));

      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const el = entry.target;
            if (entry.isIntersecting) {
              gsap.to(el, {
                autoAlpha: 1,
                y: 0,
                duration: 0.9,
                ease: "power3.out",
                overwrite: "auto",
              });
            } else {
              // Reset so it animates again next time it scrolls into view.
              gsap.set(el, { autoAlpha: 0, y: 48 });
            }
          });
        },
        // threshold 0 (not a fraction): the reveal's own translateY movement
        // must not re-cross the trigger line and retrigger the observer.
        { threshold: 0, rootMargin: "0px 0px -12% 0px" }
      );

      els.forEach((el) => io!.observe(el));
    })();

    return () => {
      cancelled = true;
      io?.disconnect();
    };
  }, [pathname]);

  return null;
}
