"use client";

import { useEffect } from "react";
import "lenis/dist/lenis.css";

/**
 * Motion-Layer der Förder-LP.
 *
 *  • Lenis-Smooth-Scroll (Desktop; Touch bleibt nativ), an GSAP-Ticker gekoppelt
 *  • Anker-Links (#anfrage …) scrollen weich mit Header-Offset
 *  • [data-reveal="up|down|left|right|scale|fade"]  – einzelnes Element
 *  • [data-stagger]  – direkte Kinder erscheinen nacheinander
 *  • [data-hero]     – Intro-Timeline beim Laden (Kinder mit [data-hero-item])
 *  • [data-parallax="0.15"] – Bild-Parallax beim Scrollen
 *  • [data-count="70"] – Zähler beim Sichtbarwerden
 *  • #fl-progress   – Scroll-Fortschrittsbalken
 *
 * Elemente sind per CSS (html.fl-js) vorab unsichtbar; ohne JS / bei
 * reduzierter Bewegung bleibt alles sichtbar (siehe Inline-Script in page.tsx).
 */
export default function Motion() {
  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let cleanup = () => {};
    let cancelled = false;

    const revealAll = () => {
      root.classList.remove("fl-js");
      root.classList.add("fl-ready");
    };

    if (reduce) {
      revealAll();
      return;
    }

    (async () => {
      try {
        const [{ gsap }, { ScrollTrigger }, { default: Lenis }] = await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
          import("lenis"),
        ]);
        if (cancelled) return;
        gsap.registerPlugin(ScrollTrigger);

        // ── Smooth Scroll ────────────────────────────────────────────
        const lenis = new Lenis({
          duration: 1.15,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
        });
        lenis.on("scroll", ScrollTrigger.update);
        const raf = (time: number) => lenis.raf(time * 1000);
        gsap.ticker.add(raf);
        gsap.ticker.lagSmoothing(0);

        // Anker-Links weich scrollen (Offset für Sticky-Header)
        const onClick = (e: MouseEvent) => {
          const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
          if (!a) return;
          const id = a.getAttribute("href")!;
          if (id.length < 2) return;
          const el = document.querySelector<HTMLElement>(id);
          if (!el) return;
          e.preventDefault();
          lenis.scrollTo(el, { offset: -88, duration: 1.4 });
          history.replaceState(null, "", id);
          // Fokus aufs erste Feld, damit Tastatur-Nutzer direkt tippen können
          const input = el.querySelector<HTMLInputElement>("input:not([tabindex='-1'])");
          if (input) window.setTimeout(() => input.focus({ preventScroll: true }), 1450);
        };
        document.addEventListener("click", onClick);

        const ctx = gsap.context(() => {
          // ── Hero-Intro ─────────────────────────────────────────────
          document.querySelectorAll<HTMLElement>("[data-hero]").forEach((hero) => {
            const items = hero.querySelectorAll<HTMLElement>("[data-hero-item]");
            const card = hero.querySelector<HTMLElement>("[data-hero-card]");
            const bg = hero.querySelector<HTMLElement>("[data-hero-bg]");
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
            if (bg) tl.fromTo(bg, { scale: 1.14 }, { scale: 1.02, duration: 2.4, ease: "power2.out" }, 0);
            tl.fromTo(items, { autoAlpha: 0, y: 34 }, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.09 }, 0.15);
            if (card)
              tl.fromTo(card, { autoAlpha: 0, x: 60, scale: 0.97 }, { autoAlpha: 1, x: 0, scale: 1, duration: 1.1 }, 0.35);
            // Leichte Parallax des Hero-Hintergrunds beim Wegscrollen
            if (bg)
              gsap.to(bg, {
                yPercent: 12,
                ease: "none",
                scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true },
              });
          });

          // ── Einzel-Reveals ────────────────────────────────────────
          const from: Record<string, gsap.TweenVars> = {
            up: { y: 56 },
            down: { y: -40 },
            left: { x: -70 },
            right: { x: 70 },
            scale: { scale: 0.92, y: 30 },
            fade: {},
          };
          gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
            const kind = el.dataset.reveal || "up";
            const delay = parseFloat(el.dataset.delay || "0");
            gsap.fromTo(
              el,
              { autoAlpha: 0, ...from[kind] },
              {
                autoAlpha: 1,
                x: 0,
                y: 0,
                scale: 1,
                duration: 1.05,
                delay,
                ease: "power3.out",
                scrollTrigger: { trigger: el, start: "top 88%", once: true },
              }
            );
          });

          // ── Gestaffelte Gruppen ──────────────────────────────────
          gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((group) => {
            const kids = Array.from(group.children) as HTMLElement[];
            gsap.fromTo(
              kids,
              { autoAlpha: 0, y: 44 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.9,
                ease: "power3.out",
                stagger: parseFloat(group.dataset.stagger || "0.12") || 0.12,
                scrollTrigger: { trigger: group, start: "top 86%", once: true },
              }
            );
          });

          // ── Parallax-Bilder ──────────────────────────────────────
          gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
            const amt = parseFloat(el.dataset.parallax || "0.12");
            gsap.fromTo(
              el,
              { yPercent: -amt * 50 },
              {
                yPercent: amt * 50,
                ease: "none",
                scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true },
              }
            );
          });

          // ── Zähler ───────────────────────────────────────────────
          gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
            const end = parseFloat(el.dataset.count || "0");
            const obj = { v: 0 };
            el.textContent = "0";
            gsap.to(obj, {
              v: end,
              duration: 1.8,
              ease: "power2.out",
              scrollTrigger: { trigger: el, start: "top 85%", once: true },
              onUpdate: () => {
                el.textContent = String(Math.round(obj.v));
              },
            });
          });

          // ── Fortschrittsbalken ───────────────────────────────────
          const bar = document.getElementById("fl-progress");
          if (bar)
            gsap.fromTo(
              bar,
              { scaleX: 0 },
              { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.2 } }
            );
        });

        root.classList.add("fl-ready");
        // Bilder laden nach → Trigger-Positionen neu berechnen
        const refresh = () => ScrollTrigger.refresh();
        window.addEventListener("load", refresh);

        cleanup = () => {
          document.removeEventListener("click", onClick);
          window.removeEventListener("load", refresh);
          gsap.ticker.remove(raf);
          ctx.revert();
          lenis.destroy();
        };
      } catch (err) {
        console.error("Motion init failed", err);
        revealAll();
      }
    })();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  return null;
}
