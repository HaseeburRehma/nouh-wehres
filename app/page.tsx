import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Wartung — NOUH-WEHRES",
  description:
    "Unsere neue Website ist bald für Sie da. Erreichen Sie uns wie gewohnt telefonisch oder per E-Mail.",
  robots: { index: false, follow: false },
};

export default function Wartung() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-white px-5 py-16 text-center">
      {/* soft brand glows (kept to the corners so the logo sits on clean white) */}
      <div className="pointer-events-none absolute -bottom-40 -right-24 h-96 w-96 rounded-full bg-amber-100/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-brand-50/60 blur-3xl" />

      <div className="relative flex w-full max-w-2xl flex-col items-center">
        <h1 className="sr-only">NOUH-WEHRES — Wartung</h1>

        {/* Logo */}
        <Image
          src="/logo-wordmark.jpg"
          alt="NOUH-WEHRES – Heizung, Sanitär, Solar, Wärmepumpen, Sanierung"
          width={1560}
          height={720}
          priority
          className="h-auto w-[300px] sm:w-[430px]"
        />

        <div className="mt-10 h-px w-24 bg-line" />

        {/* Message */}
        <h2 className="mt-10 text-2xl font-extrabold leading-snug tracking-[-0.01em] text-ink sm:text-[34px] sm:leading-[1.2]">
          <span aria-hidden className="mr-2">
            🔧
          </span>
          Wir modernisieren gerade —
          <br className="hidden sm:block" /> genau wie Ihre Heizung.
        </h2>

        <p className="mt-5 max-w-md text-[17px] leading-relaxed text-muted">
          Unsere neue Website ist bald für Sie da. Bis dahin erreichen Sie uns
          wie gewohnt:
        </p>

        {/* Contact */}
        <div className="mt-8 flex w-full flex-col items-stretch justify-center gap-3 sm:flex-row">
          <a
            href="tel:+49215487670"
            className="group inline-flex items-center justify-center gap-3 rounded-xl bg-brand px-6 py-4 font-semibold text-white shadow-sm transition-colors hover:bg-brand-dark"
          >
            <span aria-hidden className="text-lg">
              📞
            </span>
            02154 87670
          </a>
          <a
            href="mailto:info@nouh-wehres.de"
            className="inline-flex items-center justify-center gap-3 rounded-xl border border-line bg-white px-6 py-4 font-semibold text-ink transition-colors hover:border-brand hover:text-brand"
          >
            <span aria-hidden className="text-lg">
              ✉️
            </span>
            info@nouh-wehres.de
          </a>
        </div>

        {/* Footer meta */}
        <div className="mt-14 space-y-1 text-sm text-muted">
          <p className="font-semibold text-ink/80">
            Meisterbetrieb · Heizung · Sanitär · Klima
          </p>
          <p>Willich &amp; +25 km</p>
        </div>
      </div>
    </main>
  );
}
