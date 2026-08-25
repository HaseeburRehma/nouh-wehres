import Image from "next/image";

const members = [
  { name: "Guido Krüger", role: "Kundendienst Monteur" },
  { name: "Maximilian Eid", role: "Geselle" },
  { name: "Jürgen Wehres", role: "SHK Meister" },
];

export default function Team() {
  return (
    <section id="team" className="bg-surface py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="reveal mx-auto max-w-2xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-brand">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            Unser Team
          </p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-[-0.02em] text-ink sm:text-4xl lg:text-[44px] lg:leading-[1.1]">
            Die <span className="text-brand">Meister</span> hinter Nouh-Wehres
          </h2>
          <p className="lead mt-4 text-muted">
            Echte Handwerker mit Herz und Handschlagqualität – seit 29 Jahren
            als Meisterbetrieb in der Region.
          </p>
        </div>

        <div className="reveal mx-auto mt-14 grid max-w-6xl items-center gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
          <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-line">
            <Image
              src="/bad-monteur.webp"
              alt="NOUH-WEHRES Monteur bei einer Badsanierung"
              width={4800}
              height={3584}
              className="h-auto w-full object-cover"
            />
          </div>

          <div>
            <h3 className="text-xl font-bold text-ink">Ihre Ansprechpartner</h3>
            <p className="mt-2 text-[15px] text-muted">
              Von der Beratung über die Montage bis zur Wartung – bei uns hat
              alles ein Gesicht. Kein Callcenter, keine Subunternehmer.
            </p>
            <ul className="mt-6 divide-y divide-line rounded-2xl border border-line bg-white">
              {members.map((m) => (
                <li key={m.name} className="flex items-start gap-3 px-5 py-4">
                  <span className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-50 text-sm font-bold text-brand">
                    {m.name.charAt(0)}
                  </span>
                  <div>
                    <div className="font-bold text-ink">{m.name}</div>
                    <div className="text-sm font-semibold text-brand">
                      {m.role}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <a
              href="/kontakt#anfrage"
              className="btn-cta mt-6 inline-flex items-center rounded-full bg-brand px-6 py-3 font-semibold text-white shadow-sm transition-colors hover:bg-brand-dark"
            >
              <span className="btn-label" data-text="Team kennenlernen →">
                Team kennenlernen →
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
