import Image from "next/image";

const checks = ["Meisterqualität", "Festpreisgarantie", "Förder-Service"];

export default function Hero() {
  return (
    <section id="top" className="bg-white">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-14 sm:px-8 lg:grid-cols-12 lg:gap-10 lg:py-24">
        <div className="lg:col-span-7">
          <p className="mb-5 flex items-center gap-3 text-[13px] font-bold uppercase tracking-[0.12em] text-brand">
            <span className="h-[3px] w-8 rounded bg-accent" />
            Meisterbetrieb · Düsseldorf &amp; Umgebung
          </p>
          <h1 className="h-display text-ink">
            Ihr Meisterbetrieb
            <br />
            für Heizung &amp; Bad.
          </h1>
          <p className="lead mt-6 max-w-xl text-muted">
            Von der Heizungsmodernisierung bis zum Traumbad – wir planen,
            installieren und warten. Effizient, fair und mit Festpreisgarantie.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            <a
              href="#kontakt"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-6 py-3.5 font-semibold text-white shadow-sm transition-colors hover:bg-brand-dark"
            >
              Kostenlose Beratung
              <span aria-hidden>→</span>
            </a>
            <a
              href="#leistungen"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-line bg-white px-6 py-3.5 font-semibold text-ink transition-colors hover:border-brand hover:text-brand"
            >
              Leistungen entdecken
            </a>
          </div>

          <ul className="mt-9 flex flex-wrap gap-x-8 gap-y-3">
            {checks.map((c) => (
              <li key={c} className="flex items-center gap-2 font-medium text-ink">
                <span className="text-brand">
                  <CheckIcon />
                </span>
                {c}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative lg:col-span-5">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-brand-100 to-surface shadow-xl ring-1 ring-line">
            <Image
              src="/hero.jpg"
              alt="Modernes Badezimmer und Heizungsmontage"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover"
            />
          </div>

          <div className="absolute -bottom-5 left-5 flex items-center gap-3 rounded-xl bg-white px-5 py-4 shadow-lg ring-1 ring-line">
            <span className="grid h-11 w-11 place-items-center rounded-lg bg-accent text-lg font-bold text-ink">
              €
            </span>
            <span className="leading-tight">
              <strong className="block text-[17px] font-extrabold text-ink">
                Bis zu 70 %
              </strong>
              <span className="text-sm text-muted">staatliche Förderung</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
