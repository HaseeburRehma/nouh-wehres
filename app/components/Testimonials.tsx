import Carousel from "./Carousel";

// Echte Google-Rezensionen. Orte = Einsatzgebiet (bei Bedarf anpassen).
const reviews = [
  {
    name: "Mohamed Cheffadi",
    city: "Willich",
    text: "Ich bin absolut begeistert! Meine alte Heizung wurde professionell ausgebaut und durch eine moderne, hocheffiziente Anlage ersetzt. Von der Beratung bis zur Installation lief alles reibungslos – pünktlich, sauber und präzise. Absolute Weiterempfehlung!",
  },
  {
    name: "Khalil Nibou",
    city: "Krefeld",
    text: "Von der Planung bis zur Ausführung – alles top! Die Beratung war klasse, man hat sich sicher gefühlt und alles aus einer Hand bekommen. Vielen Dank an das Team, das Ergebnis kann sich sehen lassen!",
  },
  {
    name: "Beate Leister",
    city: "Viersen",
    text: "Nach dem Defekt unserer 27 Jahre alten Gasheizung war das Team innerhalb weniger Stunden da. Die Monteure arbeiteten gewissenhaft, sauber und schnell, dazu eine super Einweisung. Mega top – 100 % Weiterempfehlung!",
  },
  {
    name: "Marco Jerkovic",
    city: "Mönchengladbach",
    text: "Sämtliche Arbeiten wurden sauber, pünktlich und zu meiner vollsten Zufriedenheit ausgeführt. Obwohl der Plan mehrmals geändert wurde, blieben die veranschlagten Kosten stabil. Ein eingespieltes Team – wärmstens zu empfehlen!",
  },
  {
    name: "Frank Tovornik",
    city: "Nettetal",
    text: "Wir haben Neu-Installationen erfolgreich mit dem Team realisiert, die Wartung erfolgt termingerecht. Freundliche und zuverlässige Menschen – die Zusammenarbeit macht einfach Freude.",
  },
  {
    name: "C. K.",
    city: "Kempen",
    text: "Sehr guter Service. Zeitnaher Termin, freundlicher Monteur und ein angemessener Preis. Jederzeit gerne wieder!",
  },
];

// Fixed palette so the same name always gets the same background color.
const AVATAR_COLORS = [
  "bg-brand text-white",
  "bg-amber-500 text-white",
  "bg-emerald-600 text-white",
  "bg-rose-500 text-white",
  "bg-indigo-500 text-white",
  "bg-slate-700 text-white",
];

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const first = parts[0]?.charAt(0) ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1].charAt(0) : "";
  return (first + last).toUpperCase().replace(/\./g, "");
}

export default function Testimonials() {
  return (
    <section id="bewertungen" className="bg-surface py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="reveal mx-auto max-w-2xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-brand">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            Bewertungen
          </p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-[-0.02em] text-ink sm:text-4xl lg:text-[44px] lg:leading-[1.1]">
            Das sagen unsere <span className="text-brand">Kunden</span>
          </h2>
          <p className="lead mt-4 text-muted">
            Echte Google-Rezensionen aus Willich, Krefeld und der ganzen Region –
            überzeugen Sie sich von unserer Handwerksqualität.
          </p>

          {/* Initial-Reihe (aus echten Rezensent:innen-Namen, keine Fotos) */}
          <div className="mt-7 flex items-center justify-center -space-x-2">
            {reviews.map((r, i) => (
              <span
                key={r.name}
                className={`inline-grid h-11 w-11 place-items-center rounded-full text-sm font-bold ring-2 ring-white ${AVATAR_COLORS[i % AVATAR_COLORS.length]}`}
                aria-label={r.name}
              >
                {initials(r.name)}
              </span>
            ))}
          </div>
        </div>

        <div className="reveal mt-12">
          <Carousel label="Kundenstimmen" autoPlay interval={5500}>
            {reviews.map((r, idx) => (
              <article
                key={idx}
                className="flex w-[85%] shrink-0 snap-start flex-col rounded-2xl border border-line bg-white p-7 shadow-sm sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span
                      className={`inline-grid h-11 w-11 place-items-center rounded-full text-sm font-bold ${AVATAR_COLORS[idx % AVATAR_COLORS.length]}`}
                      aria-hidden
                    >
                      {initials(r.name)}
                    </span>
                    <div className="leading-tight">
                      <strong className="block font-bold text-ink">
                        {r.name}
                      </strong>
                      <span className="text-sm text-muted">{r.city}</span>
                    </div>
                  </div>
                  <Stars />
                </div>
                <p className="mt-4 text-[15px] leading-relaxed text-muted">
                  {`„${r.text}“`}
                </p>
              </article>
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
}

function Stars() {
  return (
    <div className="flex shrink-0 gap-0.5 text-amber-400">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
          <path d="M12 2l2.9 6.26 6.9.5-5.23 4.52 1.64 6.72L12 16.9 5.79 20.5l1.64-6.72L2.2 8.76l6.9-.5L12 2z" />
        </svg>
      ))}
    </div>
  );
}
