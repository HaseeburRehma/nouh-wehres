"use client";

import Image from "next/image";
import { useEffect, useState, type ReactNode } from "react";

const links = [
  { href: "/#leistungen", label: "Leistungen" },
  { href: "/#gewerbe", label: "Gewerbe" },
  { href: "/#ueber-uns", label: "Über uns" },
  { href: "/#foerderung", label: "Förderung" },
  { href: "/kontakt", label: "Kontakt" },
];

const socials = [
  { label: "Instagram", href: "https://instagram.com/nouhgmbh", icon: <Instagram /> },
  { label: "Facebook", href: "https://facebook.com/nouhwehres", icon: <Facebook /> },
  { label: "WhatsApp", href: "https://wa.me/49215487670", icon: <WhatsApp /> },
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
      {/* Top utility bar */}
      <div className="w-full bg-brand text-white">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between gap-3 px-5 text-[13px] sm:px-8">
          <div className="flex min-w-0 items-center gap-3 sm:gap-4">
            <a
              href="tel:+49215487670"
              className="flex items-center gap-1.5 font-semibold transition-colors hover:text-white/85"
            >
              <PhoneIcon size={14} />
              02154 87670
            </a>
            <span className="hidden text-white/75 sm:inline">
              Mo–Fr 8:00–17:00 Uhr
            </span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="flex items-center gap-1.5 font-semibold">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
              </span>
              Verfügbar
            </span>
            <div className="flex items-center gap-0.5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="grid h-7 w-7 place-items-center rounded-full text-white/90 transition-colors hover:bg-white/15 hover:text-white"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 w-full bg-white/95 backdrop-blur transition-shadow ${
          scrolled ? "shadow-sm" : ""
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
          <a href="/" aria-label="NOUH-WEHRES Startseite" className="shrink-0">
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
                <PhoneIcon size={20} />
              </span>
              <span className="leading-tight">
                <small className="block text-xs text-muted">Mo–Fr 8–17 Uhr</small>
                <strong className="block text-[15px] font-bold text-ink">
                  02154 87670
                </strong>
              </span>
            </a>
            <a
              href="/kontakt#anfrage"
              className="btn-cta rounded-full bg-brand px-6 py-3 text-[15px] font-semibold text-white shadow-sm transition-colors hover:bg-brand-dark"
            >
              <span className="btn-label" data-text="Beratung anfragen">
                Beratung anfragen
              </span>
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
            open ? "max-h-[26rem]" : "max-h-0"
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
              href="/kontakt#anfrage"
              onClick={() => setOpen(false)}
              className="btn-cta mt-4 rounded-full bg-brand px-5 py-3 text-center font-semibold text-white"
            >
              Beratung anfragen
            </a>
          </nav>
        </div>
      </header>
    </>
  );
}

function PhoneIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
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

function iconProps(): { viewBox: string; width: number; height: number; fill: string } {
  return { viewBox: "0 0 24 24", width: 15, height: 15, fill: "currentColor" };
}

function Instagram(): ReactNode {
  return (
    <svg {...iconProps()}>
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.43.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.43.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.43-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.43-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.3-1.46.72-2.12 1.38A5.86 5.86 0 0 0 .63 4.14c-.3.76-.5 1.64-.56 2.91C.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.3.79.72 1.46 1.38 2.12.66.66 1.33 1.08 2.12 1.38.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.86 5.86 0 0 0 2.12-1.38c.66-.66 1.08-1.33 1.38-2.12.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.86 5.86 0 0 0-1.38-2.12A5.86 5.86 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0z" />
      <path d="M12 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84zm0 10.16A4 4 0 1 1 16 12a4 4 0 0 1-4 4z" />
      <circle cx="18.41" cy="5.59" r="1.44" />
    </svg>
  );
}

function Facebook(): ReactNode {
  return (
    <svg {...iconProps()}>
      <path d="M24 12a12 12 0 1 0-13.88 11.85v-8.38H7.08V12h3.04V9.36c0-3 1.79-4.67 4.53-4.67 1.31 0 2.68.24 2.68.24v2.95h-1.51c-1.49 0-1.95.92-1.95 1.87V12h3.32l-.53 3.47h-2.79v8.38A12 12 0 0 0 24 12z" />
    </svg>
  );
}

function WhatsApp(): ReactNode {
  return (
    <svg {...iconProps()}>
      <path d="M.06 24l1.68-6.13A11.8 11.8 0 0 1 .16 11.9C.16 5.33 5.5 0 12.07 0a11.82 11.82 0 0 1 8.4 3.49 11.75 11.75 0 0 1 3.48 8.4c0 6.56-5.34 11.9-11.9 11.9a11.9 11.9 0 0 1-5.7-1.45L.06 24zM6.6 20.13c1.68 1 3.28 1.6 5.46 1.6 5.45 0 9.9-4.43 9.9-9.88A9.86 9.86 0 0 0 12.07 2c-5.46 0-9.9 4.44-9.9 9.9 0 2.28.67 4 1.8 5.7l-.99 3.63 3.63-1.1zm11.4-4.9c-.07-.12-.27-.2-.57-.35s-1.76-.87-2.03-.97-.47-.15-.67.15-.77.96-.94 1.16-.35.22-.64.07a8.11 8.11 0 0 1-2.39-1.47 8.94 8.94 0 0 1-1.65-2.06c-.17-.3-.02-.46.13-.6.14-.14.3-.35.44-.53.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52s-.67-1.62-.92-2.22c-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37s-1.04 1.02-1.04 2.48 1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.72.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.42.25-.7.25-1.28.17-1.4z" />
    </svg>
  );
}
