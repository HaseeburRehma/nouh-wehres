import Carousel from "./Carousel";
import ImageGallery from "./ImageGallery";

function imgs(project: number, count: number) {
  return Array.from({ length: count }, (_, i) => `/projekte/${project}/${i + 1}.webp`);
}

// caption = grober Projekttyp als Platzhalter – finale "wo & was" folgt.
const projects = [
  { images: imgs(1, 4), caption: "Fußbodenheizung · Düsseldorf" },
  { images: imgs(2, 5), caption: "Heizungsinstallation" },
  { images: imgs(3, 2), caption: "Badsanierung" },
  { images: imgs(5, 7), caption: "Heizungsmodernisierung" },
  { images: imgs(6, 6), caption: "Heizzentrale & Pufferspeicher" },
  { images: imgs(7, 7), caption: "Sanitär- & Rohrinstallation" },
  { images: imgs(8, 7), caption: "Druckerhöhungsanlage" },
];

export default function Ergebnisse() {
  return (
    <section id="ergebnisse" className="bg-surface py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="reveal mx-auto max-w-2xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-brand">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            Unsere Projekte
          </p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-[-0.02em] text-ink sm:text-4xl lg:text-[44px] lg:leading-[1.1]">
            <span className="text-brand">Ergebnisse</span>, die überzeugen
          </h2>
          <p className="lead mt-4 text-muted">
            Ein Blick sagt mehr als tausend Worte – echte Projekte aus Heizung,
            Bad und Sanitär, umgesetzt von unserem Meisterteam.
          </p>
        </div>

        <div className="reveal mt-14">
          <Carousel label="Unsere Projekte" autoPlay interval={5000}>
            {projects.map((p, idx) => (
              <article
                key={idx}
                className="w-[85%] shrink-0 snap-start overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-line sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]"
              >
                <ImageGallery
                  images={p.images}
                  alt={p.caption}
                  caption={p.caption}
                />
              </article>
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
}
