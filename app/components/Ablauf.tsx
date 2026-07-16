const steps = [
  {
    no: "01",
    title: "Beratung",
    text: "Kostenloses Erstgespräch und unverbindlicher Vor-Ort-Termin.",
  },
  {
    no: "02",
    title: "Planung & Angebot",
    text: "Maßgeschneidertes Konzept mit transparentem Festpreis.",
  },
  {
    no: "03",
    title: "Ausführung",
    text: "Saubere Montage termintreu durch unser Meisterteam.",
  },
  {
    no: "04",
    title: "Service & Wartung",
    text: "Wartung und Kundendienst – auch Jahre nach dem Einbau.",
  },
];

export default function Ablauf() {
  return (
    <section id="ablauf" className="bg-surface py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="reveal mx-auto max-w-2xl text-center">
          <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-brand">
            Ablauf
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.02em] text-ink sm:text-4xl lg:text-[44px] lg:leading-[1.1]">
            In 4 Schritten zu Ihrem Projekt
          </h2>
          <p className="lead mt-4 text-muted">
            Klar, transparent und ohne Umwege – so arbeiten wir mit Ihnen
            zusammen.
          </p>
        </div>

        <ol className="reveal mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <li
              key={s.no}
              className="relative rounded-2xl border border-line bg-white p-7"
            >
              <span className="grid h-12 w-12 place-items-center rounded-full bg-brand-50 text-lg font-extrabold text-brand">
                {s.no}
              </span>
              <h3 className="mt-5 text-lg font-bold text-ink">{s.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">
                {s.text}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
