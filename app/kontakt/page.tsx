import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AnfrageForm from "../components/AnfrageForm";
import Faq from "../components/Faq";
import GsapReveal from "../components/GsapReveal";

export const metadata: Metadata = {
  title: "Kontakt — NOUH-WEHRES | Heizung & Bad in Willich",
  description:
    "Kontaktieren Sie NOUH-WEHRES: Telefon 02154 87670, info@nouh-wehres.de oder besuchen Sie uns – Unterbruch 48b, 47877 Willich.",
};

const cards = [
  {
    label: "Anrufen",
    value: "02154 87670",
    sub: "Mo–Fr 8:00–17:00 Uhr",
    href: "tel:+49215487670",
    icon: (
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    ),
  },
  {
    label: "E-Mail",
    value: "info@nouh-wehres.de",
    sub: "Antwort innerhalb von 24 Stunden",
    href: "mailto:info@nouh-wehres.de",
    icon: (
      <>
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <polyline points="22,6 12,13 2,6" />
      </>
    ),
  },
  {
    label: "Standort",
    value: "Unterbruch 48b",
    sub: "47877 Willich",
    icon: (
      <>
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </>
    ),
  },
];

export default function Kontakt() {
  return (
    <>
      <GsapReveal />
      <Header />
      <main className="flex-1">
        {/* Intro + Info-Karten */}
        <section className="bg-white pb-16 pt-16 lg:pb-20 lg:pt-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="reveal mx-auto max-w-2xl text-center">
              <p className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-brand">
                <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                Kontakt
              </p>
              <h1 className="mt-4 text-4xl font-extrabold tracking-[-0.02em] text-ink sm:text-5xl lg:leading-[1.1]">
                Wie können wir Ihnen helfen?
              </h1>
              <p className="lead mt-5 text-muted">
                Ob neue Heizung, Traumbad oder Wartung – wir sind für Sie da.
                Rufen Sie an, schreiben Sie uns eine Nachricht oder besuchen
                Sie uns direkt vor Ort.
              </p>
            </div>

            <div className="reveal mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {cards.map((c) => {
                const inner = (
                  <>
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand">
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
                        {c.icon}
                      </svg>
                    </span>
                    <span className="leading-snug">
                      <small className="block text-sm text-muted">
                        {c.label}
                      </small>
                      <strong className="block text-[17px] font-bold text-ink">
                        {c.value}
                      </strong>
                      <span className="text-sm text-muted">{c.sub}</span>
                    </span>
                  </>
                );
                const cls =
                  "flex items-start gap-4 rounded-2xl border border-line bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-md";
                return c.href ? (
                  <a key={c.label} href={c.href} className={cls}>
                    {inner}
                  </a>
                ) : (
                  <div key={c.label} className={cls}>
                    {inner}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Karte + Anfrageformular */}
        <section id="anfrage" className="bg-surface py-16 lg:py-20">
          <div className="reveal mx-auto grid max-w-7xl gap-6 px-5 sm:px-8 lg:grid-cols-2">
            <div className="min-h-80 overflow-hidden rounded-2xl ring-1 ring-line lg:min-h-full">
              <iframe
                title="Karte: NOUH-WEHRES, Unterbruch 48b, 47877 Willich"
                src="https://www.google.com/maps?q=Unterbruch%2048b%2C%2047877%20Willich&output=embed&hl=de"
                className="h-full min-h-80 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
            <div className="rounded-2xl border border-line bg-white p-7 shadow-sm sm:p-9">
              <AnfrageForm />
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="bg-white py-20 lg:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
            <div className="reveal">
              <p className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-brand">
                <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                FAQ
              </p>
              <h2 className="mt-4 text-3xl font-extrabold tracking-[-0.02em] text-ink sm:text-4xl lg:text-[40px] lg:leading-[1.12]">
                Häufig gestellte Fragen
              </h2>
              <p className="lead mt-4 text-muted">
                Sie haben Fragen zu Heizung, Bad oder Förderung? Hier finden
                Sie schnelle Antworten – oder sprechen Sie uns direkt an.
              </p>
              <a
                href="#anfrage"
                className="btn-cta mt-7 inline-flex items-center rounded-full bg-ink px-7 py-3.5 font-semibold text-white shadow-sm transition-colors hover:bg-ink/85"
              >
                <span className="btn-label" data-text="Zum Hilfe-Center →">
                  Zum Hilfe-Center →
                </span>
              </a>
            </div>
            <Faq />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
