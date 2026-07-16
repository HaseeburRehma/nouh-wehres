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
            <span className="block">Ihr Meisterbetrieb für</span>
            <span className="block">Wärme, Wasser &amp; Klima.</span>
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

          <div className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-4 border-t border-line pt-7 lg:justify-start">
            <Image
              src="/bosch-premium-partner.webp"
              alt="Bosch Premium Partner – Heizung. Klima. Warmwasser."
              width={1178}
              height={878}
              className="h-16 w-auto sm:h-[72px]"
            />

            <a
              href="https://share.google/sBdmZw0ISqJS6ejaF"
              target="_blank"
              rel="noreferrer"
              aria-label="Google Bewertungen: 4,4 von 5 Sternen aus 25 Rezensionen"
              className="inline-flex items-center gap-3 rounded-xl border border-line bg-white px-4 py-2.5 shadow-sm transition-shadow hover:shadow-md"
            >
              <GoogleG />
              <span className="leading-tight">
                <span className="flex items-center gap-1">
                  <strong className="text-[15px] font-bold text-ink">4,4</strong>
                  <span className="flex text-amber-400" aria-hidden>
                    {[0, 1, 2, 3, 4].map((i) => (
                      <Star key={i} filled={i < 4} half={i === 4} />
                    ))}
                  </span>
                </span>
                <span className="text-xs text-muted">
                  25 Google-Rezensionen
                </span>
              </span>
            </a>
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

function GoogleG() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden className="shrink-0">
      <path
        fill="#4285F4"
        d="M23.5 12.27c0-.79-.07-1.54-.2-2.27H12v4.51h6.47a5.53 5.53 0 0 1-2.4 3.63v3h3.87c2.27-2.09 3.56-5.17 3.56-8.87z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.08 7.94-2.91l-3.87-3c-1.08.72-2.45 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.28v3.09A12 12 0 0 0 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.28a7.2 7.2 0 0 1 0-4.56V6.63H1.28a12 12 0 0 0 0 10.74l3.99-3.09z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0A12 12 0 0 0 1.28 6.63l3.99 3.09C6.22 6.86 8.87 4.75 12 4.75z"
      />
    </svg>
  );
}

function Star({ filled, half }: { filled: boolean; half?: boolean }) {
  const d =
    "M12 2l2.9 6.26 6.9.5-5.23 4.52 1.64 6.72L12 16.9 5.79 20.5l1.64-6.72L2.2 8.76l6.9-.5L12 2z";
  if (half) {
    return (
      <svg viewBox="0 0 24 24" width="13" height="13">
        <defs>
          <linearGradient id="star-half">
            <stop offset="45%" stopColor="currentColor" />
            <stop offset="45%" stopColor="#d4d7dc" />
          </linearGradient>
        </defs>
        <path d={d} fill="url(#star-half)" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" width="13" height="13" fill={filled ? "currentColor" : "#d4d7dc"}>
      <path d={d} />
    </svg>
  );
}
