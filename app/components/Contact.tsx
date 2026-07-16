import AnfrageForm from "./AnfrageForm";

const info = [
  {
    label: "Adresse",
    value: "Unterbruch 48b, 47877 Willich",
    icon: (
      <>
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </>
    ),
  },
  {
    label: "Telefon",
    value: "02154 87670",
    href: "tel:+49215487670",
    icon: (
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    ),
  },
  {
    label: "E-Mail",
    value: "info@nouh-wehres.de",
    href: "mailto:info@nouh-wehres.de",
    icon: (
      <>
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <polyline points="22,6 12,13 2,6" />
      </>
    ),
  },
  {
    label: "Öffnungszeiten",
    value: "Mo–Fr 8:00–17:00 Uhr",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <polyline points="12 7 12 12 15 14" />
      </>
    ),
  },
];

export default function Contact() {
  return (
    <section id="kontakt" className="bg-surface py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
        <div className="reveal">
          <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-brand">
            Kontakt
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.02em] text-ink sm:text-4xl lg:text-[42px] lg:leading-[1.12]">
            Jetzt kostenlos beraten lassen.
          </h2>
          <p className="lead mt-5 text-muted">
            Schreiben Sie uns oder rufen an – wir melden uns schnell und
            unverbindlich bei Ihnen.
          </p>

          <ul className="mt-9 space-y-5">
            {info.map((i) => {
              const content = (
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
                      {i.icon}
                    </svg>
                  </span>
                  <span className="leading-tight">
                    <small className="block text-sm text-muted">{i.label}</small>
                    <strong className="block text-[17px] font-bold text-ink">
                      {i.value}
                    </strong>
                  </span>
                </>
              );
              return (
                <li key={i.label}>
                  {i.href ? (
                    <a href={i.href} className="flex items-center gap-4">
                      {content}
                    </a>
                  ) : (
                    <div className="flex items-center gap-4">{content}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="reveal rounded-2xl border border-line bg-white p-7 shadow-sm sm:p-9">
          <AnfrageForm />
        </div>
      </div>
    </section>
  );
}
