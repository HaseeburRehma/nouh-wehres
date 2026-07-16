import Image from "next/image";

const points = [
  "3D-Badplanung – sehen Sie Ihr Bad vorab",
  "Barrierefreie & altersgerechte Bäder",
  "Festpreis und ein fester Ansprechpartner",
  "Komplett: Sanitär, Fliesen & Elektro",
];

export default function Traumbad() {
  return (
    <section id="traumbad" className="bg-white py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
        <div className="reveal">
          <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-brand">
            Ihr Traumbad
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.02em] text-ink sm:text-4xl lg:text-[42px] lg:leading-[1.12]">
            Vom 3D-Entwurf bis zum fertigen Bad – alles aus einer Hand.
          </h2>
          <p className="lead mt-5 text-muted">
            Mit unserer 3D-Badplanung sehen Sie Ihr neues Bad schon vor dem
            ersten Handgriff. Sanitär, Fliesen und Elektro – koordiniert von
            einem festen Ansprechpartner.
          </p>

          <ul className="mt-7 space-y-3.5">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-3 font-medium text-ink">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-50 text-brand">
                  <svg
                    viewBox="0 0 24 24"
                    width="15"
                    height="15"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                {p}
              </li>
            ))}
          </ul>

          <a
            href="#kontakt"
            className="btn-cta mt-8 inline-flex items-center rounded-full bg-brand px-7 py-3.5 font-semibold text-white shadow-sm transition-colors hover:bg-brand-dark"
          >
            <span className="btn-label" data-text="Badplanung starten →">
              Badplanung starten →
            </span>
          </a>
        </div>

        <div className="reveal relative">
          <div className="relative aspect-[5/4] overflow-hidden rounded-2xl bg-gradient-to-br from-brand-100 to-surface shadow-xl ring-1 ring-line">
            <Image
              src="/bad.webp"
              alt="Moderne Badsanierung durch NOUH-WEHRES"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <span className="absolute left-5 top-5 rounded-lg bg-accent px-3 py-1.5 text-sm font-bold text-ink shadow">
            3D-Badplaner
          </span>
        </div>
      </div>
    </section>
  );
}
