"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const links = [
  { href: "#leistungen", label: "Leistungen" },
  { href: "#gewerbe", label: "Gewerbe" },
  { href: "#ueber-uns", label: "Über uns" },
  { href: "#foerderung", label: "Förderung" },
  { href: "#kontakt", label: "Kontakt" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="h-1 w-full bg-brand" />
      <header
        className={`sticky top-0 z-50 w-full bg-white/95 backdrop-blur transition-shadow ${
          scrolled ? "shadow-sm" : ""
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
          <a href="#top" aria-label="NOUH-WEHRES Startseite" className="shrink-0">
            <Image
              src="/logo.png"
              alt="NOUH-WEHRES"
              width={200}
              height={29}
              priority
              className="h-7 w-auto"
            />
          </a>

          <nav className="hidden items-center gap-8 lg:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-[15px] font-medium text-ink/80 transition-colors hover:text-brand"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-5 lg:flex">
            <a href="tel:+49215487670" className="flex items-center gap-2.5">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-50 text-brand">
                <PhoneIcon />
              </span>
              <span className="leading-tight">
                <small className="block text-xs text-muted">Mo–Fr 8–17 Uhr</small>
                <strong className="block text-[15px] font-bold text-ink">
                  02154 87670
                </strong>
              </span>
            </a>
            <a
              href="#kontakt"
              className="rounded-lg bg-brand px-5 py-3 text-[15px] font-semibold text-white shadow-sm transition-colors hover:bg-brand-dark"
            >
              Beratung anfragen
            </a>
          </div>

          <button
            type="button"
            aria-label="Menü öffnen"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-11 w-11 place-items-center rounded-lg border border-line lg:hidden"
          >
            <span className="relative block h-4 w-5">
              <span
                className={`absolute left-0 block h-0.5 w-5 bg-ink transition-all ${
                  open ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-1.5 block h-0.5 w-5 bg-ink transition-all ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 block h-0.5 w-5 bg-ink transition-all ${
                  open ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`overflow-hidden border-t border-line bg-white lg:hidden ${
            open ? "max-h-96" : "max-h-0"
          } transition-[max-height] duration-300`}
        >
          <nav className="flex flex-col px-5 py-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-line/70 py-3 font-medium text-ink/85"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#kontakt"
              onClick={() => setOpen(false)}
              className="mt-4 rounded-lg bg-brand px-5 py-3 text-center font-semibold text-white"
            >
              Beratung anfragen
            </a>
            <a
              href="tel:+49215487670"
              className="py-4 text-center font-bold text-ink"
            >
              02154 87670 · Mo–Fr 8–17 Uhr
            </a>
          </nav>
        </div>
      </header>
    </>
  );
}

function PhoneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
