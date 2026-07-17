import Image from "next/image";

const rows = [
  {
    label: "Zahlung",
    nouh: "Festpreisgarantie",
    andere: "Nachträge möglich",
    selbst: "Kalkulation unklar",
  },
  {
    label: "Qualifikation",
    nouh: "Eingetragener Meisterbetrieb",
    andere: "Oft ohne Meister",
    selbst: "Fehlerrisiko hoch",
  },
  {
    label: "Tempo",
    nouh: "Termintreue Montage",
    andere: "Lange Wartezeiten",
    selbst: "Wochenlanger Aufwand",
  },
  {
    label: "Ansprechpartner",
    nouh: "Fester Ansprechpartner",
    andere: "Wechselnde Kräfte",
    selbst: "Auf sich gestellt",
  },
  {
    label: "Förderung",
    nouh: "Anträge inklusive",
    andere: "Kein Förderservice",
    selbst: "Selbst beantragen",
  },
  {
    label: "Gewährleistung",
    nouh: "Meister-Gewährleistung",
    andere: "Oft ohne Garantie",
    selbst: "Keine Absicherung",
  },
];

export default function Vergleich() {
  return (
    <section id="vergleich" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="reveal mx-auto max-w-2xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-brand">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            Im Vergleich
          </p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-[-0.02em] text-ink sm:text-4xl lg:text-[44px] lg:leading-[1.1]">
            Warum <span className="text-brand">Nouh-Wehres</span> die bessere
            Wahl ist
          </h2>
          <p className="lead mt-4 text-muted">
            Meisterqualität, Festpreis und ein fester Ansprechpartner – sehen
            Sie auf einen Blick, was uns von anderen unterscheidet.
          </p>
        </div>

        <div className="reveal no-scrollbar mt-14 overflow-x-auto rounded-2xl">
          <table className="w-full min-w-[760px] border-separate border-spacing-0 rounded-2xl ring-1 ring-line">
            <thead>
              <tr>
                <th className="rounded-tl-2xl border-b border-line bg-white p-5" />
                <th className="border-b border-brand/30 border-t-2 border-x-2 border-t-brand/60 border-x-brand/60 bg-brand-50/60 p-5">
                  <Image
                    src="/logo-wordmark.jpg"
                    alt="NOUH-WEHRES"
                    width={1560}
                    height={720}
                    className="mx-auto h-12 w-auto"
                  />
                </th>
                <th className="border-b border-line bg-white p-5 text-[15px] font-semibold text-muted">
                  Andere Anbieter
                </th>
                <th className="rounded-tr-2xl border-b border-line bg-white p-5 text-[15px] font-semibold text-muted">
                  Alles selbst
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => {
                const last = i === rows.length - 1;
                const rowBorder = last ? "" : "border-b border-line";
                return (
                  <tr key={r.label}>
                    <td
                      className={`${rowBorder} bg-white p-5 text-[15px] font-bold text-ink ${
                        last ? "rounded-bl-2xl" : ""
                      }`}
                    >
                      {r.label}
                    </td>
                    <td
                      className={`border-x-2 border-x-brand/60 bg-brand-50/60 p-5 ${
                        last
                          ? "border-b-2 border-b-brand/60"
                          : "border-b border-b-brand/20"
                      }`}
                    >
                      <span className="flex items-center gap-2.5 text-[15px] font-semibold text-ink">
                        <CheckBadge />
                        {r.nouh}
                      </span>
                    </td>
                    <td className={`${rowBorder} bg-white p-5`}>
                      <span className="flex items-center gap-2.5 text-[15px] text-muted">
                        <CrossBadge />
                        {r.andere}
                      </span>
                    </td>
                    <td
                      className={`${rowBorder} bg-white p-5 ${
                        last ? "rounded-br-2xl" : ""
                      }`}
                    >
                      <span className="flex items-center gap-2.5 text-[15px] text-muted">
                        <CrossBadge />
                        {r.selbst}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-10 text-center">
          <a
            href="#kontakt"
            className="btn-cta inline-flex items-center rounded-full bg-brand px-7 py-3.5 font-semibold text-white shadow-sm transition-colors hover:bg-brand-dark"
          >
            <span
              className="btn-label"
              data-text="Kostenlose Beratung anfragen →"
            >
              Kostenlose Beratung anfragen →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

function CheckBadge() {
  return (
    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand text-white">
      <svg
        viewBox="0 0 24 24"
        width="12"
        height="12"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </span>
  );
}

function CrossBadge() {
  return (
    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-red-800 text-white">
      <svg
        viewBox="0 0 24 24"
        width="11"
        height="11"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </span>
  );
}
