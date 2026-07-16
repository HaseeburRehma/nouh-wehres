import Image from "next/image";
import Carousel from "./Carousel";

const avatars = [
  "/rev-1.png",
  "/rev-2.png",
  "/rev-3.png",
  "/rev-4.png",
  "/rev-5.png",
  "/rev-6.png",
];

// Echte Google-Rezensionen. Orte = Einsatzgebiet (bei Bedarf anpassen).
const reviews = [
  {
    name: "Mohamed Cheffadi",
    city: "Willich",
    avatar: avatars[0],
    text: "Ich bin absolut begeistert! Meine alte Heizung wurde professionell ausgebaut und durch eine moderne, hocheffiziente Anlage ersetzt. Von der Beratung bis zur Installation lief alles reibungslos – pünktlich, sauber und präzise. Absolute Weiterempfehlung!",
  },
  {
    name: "Khalil Nibou",
    city: "Krefeld",
    avatar: avatars[1],
    text: "Von der Planung bis zur Ausführung – alles top! Die Beratung war klasse, man hat sich sicher gefühlt und alles aus einer Hand bekommen. Vielen Dank an das Team, das Ergebnis kann sich sehen lassen!",
  },
  {
    name: "Beate Leister",
    city: "Viersen",
    avatar: avatars[2],
    text: "Nach dem Defekt unserer 27 Jahre alten Gasheizung war das Team innerhalb weniger Stunden da. Die Monteure arbeiteten gewissenhaft, sauber und schnell, dazu eine super Einweisung. Mega top – 100 % Weiterempfehlung!",
  },
  {
    name: "Marco Jerkovic",
    city: "Mönchengladbach",
    avatar: avatars[3],
    text: "Sämtliche Arbeiten wurden sauber, pünktlich und zu meiner vollsten Zufriedenheit ausgeführt. Obwohl der Plan mehrmals geändert wurde, blieben die veranschlagten Kosten stabil. Ein eingespieltes Team – wärmstens zu empfehlen!",
  },
  {
    name: "Frank Tovornik",
    city: "Nettetal",
    avatar: avatars[4],
    text: "Wir haben Neu-Installationen erfolgreich mit dem Team realisiert, die Wartung erfolgt termingerecht. Freundliche und zuverlässige Menschen – die Zusammenarbeit macht einfach Freude.",
  },
  {
    name: "C. K.",
    city: "Kempen",
    avatar: avatars[5],
    text: "Sehr guter Service. Zeitnaher Termin, freundlicher Monteur und ein angemessener Preis. Jederzeit gerne wieder!",
  },
];

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

          {/* Avatar-Reihe */}
          <div className="mt-7 flex items-center justify-center -space-x-3">
            {avatars.map((a) => (
              <span
                key={a}
                className="inline-block h-11 w-11 overflow-hidden rounded-full ring-2 ring-white"
              >
                <Image
                  src={a}
                  alt=""
                  width={44}
                  height={44}
                  unoptimized
                  className="h-full w-full object-cover"
                />
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
                    <Image
                      src={r.avatar}
                      alt={r.name}
                      width={44}
                      height={44}
                      unoptimized
                      className="h-11 w-11 rounded-full object-cover"
                    />
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
