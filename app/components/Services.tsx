import type { ReactNode } from "react";

type Service = {
  id?: string;
  title: string;
  text: string;
  icon: ReactNode;
};

const services: Service[] = [
  {
    title: "Heizung",
    text: "Wärmepumpe, Solar, Öl- & Gasheizung, Modernisierung und Wartung.",
    icon: (
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    ),
  },
  {
    title: "Bad",
    text: "Komplettbäder, barrierefrei, 3D-Badplanung und faire Festpreise.",
    icon: <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />,
  },
  {
    title: "Lüftung",
    text: "Zentrale & dezentrale Wohnraumlüftung und Raumklimatisierung.",
    icon: (
      <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" />
    ),
  },
  {
    title: "Gebäudetechnik",
    text: "Photovoltaik, Smart Home, Trinkwasserfilter und Installation.",
    icon: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" />
      </>
    ),
  },
  {
    title: "Fliesen",
    text: "Fliesenarbeiten für Bad, Küche und Wohnräume – sauber verlegt.",
    icon: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </>
    ),
  },
  {
    id: "gewerbe",
    title: "Gewerbe",
    text: "Sanitär, Heizung und erneuerbare Energien für Gewerbekunden.",
    icon: (
      <>
        <path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-3" />
        <path d="M9 9v.01M9 12v.01M9 15v.01" />
      </>
    ),
  },
];

export default function Services() {
  return (
    <section id="leistungen" className="bg-surface py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="reveal mx-auto max-w-2xl text-center">
          <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-brand">
            Unsere Leistungen
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.02em] text-ink sm:text-4xl lg:text-[44px] lg:leading-[1.1]">
            Alles für Wärme, Wasser &amp; Wohlfühlen
          </h2>
          <p className="lead mt-4 text-muted">
            Ein Ansprechpartner für Ihr ganzes Zuhause – von der Heizung über das
            Bad bis zur Gebäudetechnik.
          </p>
        </div>

        <div className="reveal mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <article
              id={s.id}
              key={s.title}
              className="group rounded-2xl border border-line bg-white p-7 transition-all hover:-translate-y-1 hover:border-brand/40 hover:shadow-lg"
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                <svg
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {s.icon}
                </svg>
              </span>
              <h3 className="mt-5 text-xl font-bold text-ink">{s.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">
                {s.text}
              </p>
              <a
                href="#kontakt"
                className="mt-4 inline-flex items-center gap-1.5 font-semibold text-brand transition-all hover:gap-2.5"
              >
                Mehr erfahren <span aria-hidden>→</span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
