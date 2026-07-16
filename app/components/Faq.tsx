"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Ist die Erstberatung wirklich kostenlos?",
    a: "Ja. Das Erstgespräch und der Vor-Ort-Termin sind für Sie unverbindlich und kostenlos. Anschließend erhalten Sie ein transparentes Angebot mit Festpreisgarantie.",
  },
  {
    q: "Welche Leistungen bietet Nouh-Wehres an?",
    a: "Heizung, Bad & Sanitär, Lüftung, Gebäudetechnik, Photovoltaik und Fliesenarbeiten – als Meisterbetrieb decken wir alles rund um Wärme, Wasser und Wohlfühlen aus einer Hand ab.",
  },
  {
    q: "Übernehmen Sie die Förderanträge für mich?",
    a: "Ja. Wir prüfen Ihre Fördermöglichkeiten (BAFA, KfW & Co.), stellen die Anträge für Sie und sichern Ihnen bis zu 70 % staatlichen Zuschuss – ohne Papierkram für Sie.",
  },
  {
    q: "In welchem Umkreis sind Sie tätig?",
    a: "Wir sind in Willich und im Umkreis von rund 25 km für Sie unterwegs – unter anderem in Düsseldorf, Krefeld, Neuss und Mönchengladbach.",
  },
  {
    q: "Wie schnell bekomme ich einen Termin?",
    a: "In der Regel melden wir uns innerhalb von 24 Stunden bei Ihnen und finden kurzfristig einen Termin – bei dringenden Fällen oft noch am selben Tag.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <div className="space-y-4">
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <div
            key={f.q}
            className={`rounded-xl border bg-white transition-colors ${
              isOpen ? "border-brand/30 bg-surface/60" : "border-line"
            }`}
          >
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? -1 : i)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
            >
              <span className="font-bold text-ink">{f.q}</span>
              <span
                className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-lg font-semibold transition-colors ${
                  isOpen ? "bg-brand text-white" : "bg-surface text-ink"
                }`}
                aria-hidden
              >
                {isOpen ? "−" : "+"}
              </span>
            </button>
            {isOpen && (
              <p className="px-6 pb-5 text-[15px] leading-relaxed text-muted">
                {f.a}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
