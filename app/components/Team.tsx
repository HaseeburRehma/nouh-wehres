import Carousel from "./Carousel";

// Platzhalter – echte Team-Fotos & Namen folgen.
const team: { name: string; role: string; photo: string; focus?: string }[] =
  Array.from({ length: 5 }, () => ({
    name: "Auf der Baustelle",
    role: "Team folgt in Kürze",
    photo: "/auf-der-baustelle.png",
    focus: "center",
  }));

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
            Echte Handwerker mit Herz und Handschlagqualität – lernen Sie das
            Team kennen, das Ihr Projekt persönlich betreut.
          </p>
        </div>

        <div className="reveal mt-14">
          <Carousel label="Unser Team">
            {team.map((m, idx) => (
              <article
                key={idx}
                className="w-[75%] shrink-0 snap-start overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-line sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]"
              >
                <div
                  className="aspect-[4/5] w-full bg-[#e3e9ee]"
                  style={{
                    backgroundImage: `url(${m.photo})`,
                    backgroundSize: "cover",
                    backgroundPosition: m.focus ?? "center top",
                  }}
                />
                <div className="p-5">
                  <h3 className="font-bold text-ink">{m.name}</h3>
                  <p className="mt-0.5 text-sm font-semibold text-brand">
                    {m.role}
                  </p>
                  <div className="mt-4 flex gap-2.5">
                    <a
                      href="tel:+49215487670"
                      aria-label={`${m.name} anrufen`}
                      className="grid h-9 w-9 place-items-center rounded-full border border-line text-muted transition-colors hover:border-brand hover:text-brand"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        width="15"
                        height="15"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    </a>
                    <a
                      href="mailto:info@nouh-wehres.de"
                      aria-label={`E-Mail an ${m.name}`}
                      className="grid h-9 w-9 place-items-center rounded-full border border-line text-muted transition-colors hover:border-brand hover:text-brand"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        width="15"
                        height="15"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="2" y="4" width="20" height="16" rx="2" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
}
