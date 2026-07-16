import Image from "next/image";

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
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
        <div className="lg:pr-6">
          <Image
            src="/logo.png"
            alt="NOUH-WEHRES"
            width={200}
            height={29}
            className="h-7 w-auto brightness-0 invert"
          />
          <p className="mt-5 max-w-xs text-sm leading-relaxed">
            Ihr Meisterbetrieb für Heizung, Bad und Gebäudetechnik in Düsseldorf
            und Umgebung.
          </p>
          <a
            href="https://instagram.com/nouhgmbh"
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
            @nouhgmbh
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
