import Image from "next/image";
import CheckWizard from "./CheckWizard";
import type { WizardStep } from "../../lib/landing";

export interface LandingHeroProps {
  eyebrow: string;
  h1: string;
  intro: string;
  checks: string[];
  badge: { small: string; big: string };
  wizard: { name: string; topic: string; steps: WizardStep[] };
}

export default function LandingHero({
  eyebrow,
  h1,
  intro,
  checks,
  badge,
  wizard,
}: LandingHeroProps) {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-gradient-to-br from-brand to-brand-dark text-white"
    >
      <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-32 h-80 w-80 rounded-full bg-black/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-start gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:py-16">
        {/* Left — copy */}
        <div className="pt-2 lg:pt-6">
          <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-white/75">
            {eyebrow}
          </p>
          <h1 className="h-display mt-4 max-w-[16ch] text-white">{h1}</h1>
          <p className="lead mt-5 max-w-xl text-white/85">{intro}</p>

          <ul className="mt-7 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-x-7 sm:gap-y-2.5">
            {checks.map((h) => (
              <li key={h} className="flex items-center gap-2 font-medium text-white">
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent text-ink">
                  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                {h}
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <span className="inline-flex items-center gap-2.5 rounded-full bg-white px-5 py-2.5 shadow-sm">
              <Image
                src="/bosch-premium-partner.webp"
                alt="Bosch Premium Partner"
                width={1178}
                height={878}
                className="h-7 w-auto"
              />
              <span className="text-[13px] font-bold text-ink">
                Bosch Premium Partner
              </span>
            </span>
          </div>
        </div>

        {/* Right — wizard card */}
        <div className="relative lg:pt-2">
          <div className="absolute -right-2 -top-4 z-10 grid h-[74px] w-[74px] place-items-center rounded-full bg-accent text-center text-ink shadow-lg ring-4 ring-white/40 sm:-right-3 sm:h-20 sm:w-20">
            <span className="px-1 leading-none">
              <span className="block text-[9px] font-semibold uppercase tracking-wide">
                {badge.small}
              </span>
              <span className="mt-0.5 block text-[13px] font-extrabold leading-tight">
                {badge.big}
              </span>
            </span>
          </div>

          <div className="overflow-hidden rounded-2xl bg-white text-ink shadow-2xl ring-1 ring-black/5">
            <CheckWizard
              name={wizard.name}
              topic={wizard.topic}
              steps={wizard.steps}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
