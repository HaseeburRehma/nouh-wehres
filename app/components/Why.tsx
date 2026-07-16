import Image from "next/image";
import type { ReactNode } from "react";

type Feature = { title: string; text: string; icon: ReactNode };

const features: Feature[] = [
  {
    title: "Meisterbetrieb",
    text: "Geprüfte Qualität und Fachwissen aus einer Hand.",
    icon: (
      <>
        <path d="M12 2l2.4 4.9 5.4.8-3.9 3.8.9 5.4-4.8-2.5-4.8 2.5.9-5.4L4.2 7.7l5.4-.8L12 2z" />
      </>
    ),
  },
  {
    title: "Festpreisgarantie",
    text: "Klare Kosten ohne böse Überraschungen.",
    icon: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 10h18M7 15h2" />
      </>
    ),
  },
  {
    title: "Alles aus einer Hand",
    text: "Planung, Montage und Wartung von einem Team.",
    icon: (
      <>
        <path d="M20 11.08V8a2 2 0 0 0-2-2h-3.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 9.93 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6" />
        <path d="m14 19 2 2 4-4" />
      </>
    ),
  },
  {
    title: "Förder-Service",
    text: "Wir kümmern uns um Ihre Fördermittel.",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M14.5 9.5a2.5 2.5 0 0 0-2.5-1.5c-1.5 0-2.5.8-2.5 2s1 1.8 2.5 2 2.5.8 2.5 2-1 2-2.5 2a2.5 2.5 0 0 1-2.5-1.5M12 6.5v11" />
      </>
    ),
  },
];

export default function Why() {
  return (
    <section id="ueber-uns" className="bg-white py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
        <div className="reveal relative order-2 lg:order-1">
          <div className="relative aspect-[5/4] overflow-hidden rounded-2xl bg-gradient-to-br from-brand-100 to-surface shadow-xl ring-1 ring-line">
            <Image
              src="/team.webp"
              alt="NOUH-WEHRES Team vor dem Firmenfahrzeug"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-2 rounded-xl bg-brand px-6 py-4 text-white shadow-lg sm:right-6">
            <strong className="block text-3xl font-extrabold leading-none">
              20+
            </strong>
            <span className="text-sm text-white/85">Jahre Erfahrung</span>
          </div>
        </div>

        <div className="reveal order-1 lg:order-2">
          <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-brand">
            Warum Nouh-Wehres
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.02em] text-ink sm:text-4xl lg:text-[42px] lg:leading-[1.12]">
            Zuverlässig – von der ersten Idee bis zur Wartung.
          </h2>
          <p className="lead mt-5 text-muted">
            Als eingetragener Meisterbetrieb stehen wir für saubere Arbeit,
            ehrliche Beratung und Technik, die zu Ihnen passt. Alles aus einer
            Hand – ohne Umwege, ohne Stress.
          </p>

          <div className="mt-8 grid gap-x-8 gap-y-7 sm:grid-cols-2">
            {features.map((f) => (
              <div key={f.title} className="flex gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand">
                  <svg
                    viewBox="0 0 24 24"
                    width="22"
                    height="22"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {f.icon}
                  </svg>
                </span>
                <div>
                  <h3 className="font-bold text-ink">{f.title}</h3>
                  <p className="mt-1 text-[15px] leading-relaxed text-muted">
                    {f.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
