const cols = [
  {
    title: "Leistungen",
    links: [
      { label: "Heizung", href: "/#leistungen" },
      { label: "Bad", href: "/#leistungen" },
      { label: "Lüftung", href: "/#leistungen" },
      { label: "Gebäudetechnik", href: "/#leistungen" },
      { label: "Fliesen", href: "/#leistungen" },
    ],
  },
  {
    title: "Unternehmen",
    links: [
      { label: "Über uns", href: "/#ueber-uns" },
      { label: "Jobs & Ausbildung SHK", href: "/kontakt" },
      { label: "Förderung", href: "/#foerderung" },
      { label: "Gewerbekunden", href: "/#gewerbe" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-white/70">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 sm:grid-cols-2 sm:px-8 lg:grid-cols-[1.4fr_0.9fr_1fr_0.9fr_2.2fr]">
        <div className="lg:pr-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-white.png"
            alt="NOUH-WEHRES"
            width={466}
            height={90}
            className="h-9 w-auto"
          />
          <p className="mt-5 max-w-xs text-sm leading-relaxed">
            Ihr Meisterbetrieb für Heizung, Bad und Gebäudetechnik in Düsseldorf
            und Umgebung.
          </p>
          <a
            href="https://www.instagram.com/nouhwehres/"
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center gap-2 text-sm transition-colors hover:text-brand"
          >
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
            </svg>
            @nouhwehres
          </a>
        </div>

        {cols.map((c) => (
          <div key={c.title}>
            <h4 className="text-sm font-bold uppercase tracking-wide text-white">
              {c.title}
            </h4>
            <ul className="mt-4 space-y-2.5">
              {c.links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-sm transition-colors hover:text-brand"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wide text-white">
            Kontakt
          </h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <a href="tel:+49215487670" className="hover:text-brand">
                02154 87670
              </a>
            </li>
            <li>
              <a href="mailto:info@nouh-wehres.de" className="hover:text-brand">
                info@nouh-wehres.de
              </a>
            </li>
            <li>Unterbruch 48b</li>
            <li>47877 Willich</li>
          </ul>
        </div>

        {/* Karte mit Business-Info-Karte */}
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="relative h-60 overflow-hidden rounded-2xl ring-1 ring-white/10">
            <iframe
              title="Standort NOUH-WEHRES – Unterbruch 48b, 47877 Willich"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1521.2478243237438!2d6.554279608226838!3d51.23647170252551!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b8b21aa8195a29%3A0xeccf59ab06c36cea!2sNouh-Wehres%20GmbH%20I%20Heizung%20Sanit%C3%A4r%20Klimatechnik!5e0!3m2!1sde!2sus!4v1784208179173!5m2!1sde!2sus"
              className="h-full w-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
            <a
              href="https://www.google.com/maps/search/?api=1&query=Nouh-Wehres%20GmbH%2C%20Unterbruch%2048b%2C%2047877%20Willich"
              target="_blank"
              rel="noreferrer"
              aria-label="Nouh-Wehres GmbH auf Google Maps öffnen"
              className="absolute left-3 top-3 flex max-w-[230px] items-start gap-2 rounded-xl bg-white p-3 text-left shadow-lg ring-1 ring-black/5 transition-shadow hover:shadow-xl"
            >
              <span className="min-w-0">
                <strong className="block truncate text-[13px] font-bold text-ink">
                  Nouh-Wehres GmbH
                </strong>
                <span className="block truncate text-[11px] text-muted">
                  Unterbruch 48b, 47877 Willich
                </span>
                <span className="mt-1 flex items-center gap-1 text-[11px]">
                  <strong className="font-bold text-ink">4,4</strong>
                  <span className="flex text-amber-400">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <FootStar key={i} half={i === 4} />
                    ))}
                  </span>
                  <span className="text-muted">(25)</span>
                </span>
              </span>
              <svg
                viewBox="0 0 24 24"
                width="15"
                height="15"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mt-0.5 shrink-0 text-brand"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-6 text-sm sm:flex-row sm:px-8">
          <span>
            © {new Date().getFullYear()} Nouh-Wehres GmbH. Alle Rechte
            vorbehalten.
          </span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-brand">
              Impressum
            </a>
            <a href="#" className="hover:text-brand">
              Datenschutz
            </a>
            <a href="#" className="hover:text-brand">
              AGB
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FootStar({ half }: { half?: boolean }) {
  const d =
    "M12 2l2.9 6.26 6.9.5-5.23 4.52 1.64 6.72L12 16.9 5.79 20.5l1.64-6.72L2.2 8.76l6.9-.5L12 2z";
  if (half) {
    return (
      <svg viewBox="0 0 24 24" width="11" height="11">
        <defs>
          <linearGradient id="foot-star-half">
            <stop offset="45%" stopColor="currentColor" />
            <stop offset="45%" stopColor="#d4d7dc" />
          </linearGradient>
        </defs>
        <path d={d} fill="url(#foot-star-half)" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" width="11" height="11" fill="currentColor">
      <path d={d} />
    </svg>
  );
}
