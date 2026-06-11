export default function Foerderung() {
  return (
    <section id="foerderung" className="bg-white py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-brand px-6 py-12 text-white sm:px-10 lg:px-14 lg:py-14">
          <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/10" />
          <div className="pointer-events-none absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-white/10" />
          <div className="relative grid items-center gap-10 lg:grid-cols-[1fr_auto] lg:gap-14">
            <div>
              <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-white/80">
                Staatliche Förderung
              </p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.02em] sm:text-4xl lg:text-[38px] lg:leading-[1.15]">
                Bis zu 70 % Zuschuss – wir übernehmen den Papierkram.
              </h2>
              <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-white/85">
                BAFA, KfW &amp; Co.: Wir prüfen Ihre Fördermöglichkeiten für
                Heizung und Bad und stellen die Anträge für Sie. So sichern Sie
                sich maximale Zuschüsse – ohne Aufwand.
              </p>
              <a
                href="#kontakt"
                className="mt-7 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3.5 font-semibold text-brand shadow-sm transition-transform hover:scale-[1.02]"
              >
                Fördercheck starten <span aria-hidden>→</span>
              </a>
            </div>

            <div className="flex items-center justify-center rounded-2xl bg-accent px-10 py-10 text-center text-ink shadow-lg lg:w-64">
              <div>
                <span className="block text-sm font-semibold">bis zu</span>
                <strong className="block text-5xl font-extrabold leading-none lg:text-6xl">
                  70%
                </strong>
                <span className="mt-1 block text-lg font-bold">Förderung</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
