import Image from "next/image";
import HeroSlider from "./HeroSlider";

const checks = ["Meisterqualität", "Festpreisgarantie", "Förder-Service"];

const slides = [
  { src: "/hero.webp", alt: "Bosch Wärmepumpen-Installation durch NOUH-WEHRES" },
  { src: "/hero-2.webp", alt: "NOUH-WEHRES Monteur bei der Badsanierung" },
  { src: "/hero-3.webp", alt: "NOUH-WEHRES Monteur vor dem Firmenfahrzeug" },
];

export default function Hero() {
  return (
    <section id="top" className="bg-white">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-12 sm:px-8 lg:grid-cols-12 lg:gap-10 lg:py-24">
        {/* Media slider — first on mobile, right on desktop */}
        <div className="relative order-1 lg:order-2 lg:col-span-5">
          <HeroSlider images={slides} />

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

        {/* Content — centered on mobile, left on desktop */}
        <div className="order-2 text-center lg:order-1 lg:col-span-7 lg:text-left">
          <p className="mb-5 flex items-center justify-center gap-3 text-[13px] font-bold uppercase tracking-[0.12em] text-brand lg:justify-start">
            <span className="h-[3px] w-8 rounded bg-accent" />
            Meisterbetrieb · Düsseldorf &amp; Umgebung
          </p>
          <h1 className="h-display text-ink">
            <span className="block">Ihr Meisterbetrieb</span>
            <span className="block">für Heizung &amp; Bad.</span>
          </h1>
          <p className="lead mx-auto mt-6 max-w-xl text-muted lg:mx-0">
            Von der Heizungsmodernisierung bis zum Traumbad – wir planen,
            installieren und warten. Effizient, fair und mit Festpreisgarantie.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4 lg:justify-start">
            <a
              href="#kontakt"
              className="btn-cta inline-flex items-center justify-center rounded-full bg-brand px-7 py-3.5 font-semibold text-white shadow-sm transition-colors hover:bg-brand-dark"
            >
              <span className="btn-label" data-text="Kostenlose Beratung →">
                Kostenlose Beratung →
              </span>
            </a>
            <a
              href="#leistungen"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-line bg-white px-7 py-3.5 font-semibold text-ink transition-colors hover:border-brand hover:text-brand"
            >
              Leistungen entdecken
            </a>
          </div>

          <ul className="mt-9 flex flex-wrap justify-center gap-x-8 gap-y-3 lg:justify-start">
            {checks.map((c) => (
              <li key={c} className="flex items-center gap-2 font-medium text-ink">
                <span className="text-brand">
                  <CheckIcon />
                </span>
                {c}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex items-center justify-center gap-4 border-t border-line pt-7 lg:justify-start">
            <Image
              src="/bosch-premium-partner.webp"
              alt="Bosch Premium Partner – Heizung. Klima. Warmwasser."
              width={1178}
              height={878}
              className="h-16 w-auto sm:h-[72px]"
            />
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
