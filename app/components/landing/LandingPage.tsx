import Header from "../Header";
import Footer from "../Footer";
import Ergebnisse from "../Ergebnisse";
import GsapReveal from "../GsapReveal";
import LandingHero from "./LandingHero";
import LandingFaq from "./LandingFaq";
import { VorteilIcon } from "./icons";
import {
  COMPARE,
  COMPARE_ROWS,
  CTA,
  type LandingConfig,
} from "../../lib/landing";

export default function LandingPage({ config }: { config: LandingConfig }) {
  const c = config;
  return (
    <>
      <GsapReveal />
      <Header minimal />
      <main className="flex-1">
        <LandingHero
          eyebrow={c.eyebrow}
          h1={c.h1}
          intro={c.intro}
          checks={c.heroChecks}
          badge={c.badge}
          wizard={c.wizard}
        />
        <StatsBar c={c} />
        <Vorteile c={c} />
        {c.showResults && <Ergebnisse />}
        <Ablauf c={c} />
        <Compare />
        <Testimonials c={c} />
        <FaqSection c={c} />
        <CtaBanner slug={c.slug} />
      </main>
      <Footer />
    </>
  );
}


/* ─────────────────────────  STATS BAR  ───────────────────────── */
function StatsBar({ c }: { c: LandingConfig }) {
  return (
    <section className="border-b border-line bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-8 px-5 py-10 sm:px-8 lg:grid-cols-4 lg:divide-x lg:divide-line">
        {c.stats.map((s) => (
          <div key={s.label} className="px-2 text-center lg:px-6">
            <div className="text-3xl font-extrabold tracking-[-0.02em] text-brand sm:text-[34px]">
              {s.value}
            </div>
            <div className="mt-1 text-[13px] font-medium text-muted sm:text-sm">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────  VORTEILE  ───────────────────────── */
function Vorteile({ c }: { c: LandingConfig }) {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="reveal mx-auto max-w-3xl text-center">
          <SectionEyebrow>{c.vorteile.eyebrow}</SectionEyebrow>
          <h2 className="mt-4 text-3xl font-extrabold tracking-[-0.02em] text-ink sm:text-4xl lg:text-[44px] lg:leading-[1.12]">
            {c.vorteile.title}
          </h2>
          <p className="lead mx-auto mt-4 max-w-2xl text-muted">
            {c.vorteile.intro}
          </p>
        </div>

        <div className="reveal mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {c.vorteile.items.map((v) => (
            <article
              key={v.title}
              className="rounded-2xl border border-line bg-white p-7 transition-all hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-md"
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent text-ink">
                <VorteilIcon name={v.icon} />
              </span>
              <h3 className="mt-5 text-lg font-bold text-ink">{v.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">
                {v.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────  ABLAUF  ───────────────────────── */
function Ablauf({ c }: { c: LandingConfig }) {
  return (
    <section className="bg-surface py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="reveal mx-auto max-w-2xl text-center">
          <SectionEyebrow>{c.ablauf.eyebrow}</SectionEyebrow>
          <h2 className="mt-4 text-3xl font-extrabold tracking-[-0.02em] text-ink sm:text-4xl lg:text-[44px] lg:leading-[1.12]">
            {c.ablauf.title}
          </h2>
        </div>

        <ol className="reveal mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {c.ablauf.items.map((s, i) => (
            <li key={s.title} className="relative rounded-2xl border border-line bg-white p-7">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-brand text-lg font-extrabold text-white">
                {i + 1}
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

/* ─────────────────────────  COMPARE  ───────────────────────── */
function Compare() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <div className="reveal mx-auto max-w-2xl text-center">
          <SectionEyebrow>{COMPARE.eyebrow}</SectionEyebrow>
          <h2 className="mt-4 text-3xl font-extrabold tracking-[-0.02em] text-ink sm:text-4xl lg:text-[40px] lg:leading-[1.14]">
            {COMPARE.title}
          </h2>
        </div>

        <div className="reveal no-scrollbar mt-12 overflow-x-auto">
          <table className="w-full min-w-[620px] border-separate border-spacing-0">
            <thead>
              <tr>
                <th className="w-[46%] p-4" />
                <th className="w-[27%] p-2 align-bottom">
                  <div className="rounded-t-xl bg-brand px-4 py-3 text-center leading-tight text-white">
                    <div className="text-[15px] font-extrabold">Nouh-Wehres</div>
                    <div className="text-[11px] font-medium text-white/80">
                      Meisterbetrieb aus der Region
                    </div>
                  </div>
                </th>
                <th className="w-[27%] p-4 text-center align-bottom text-[15px] font-semibold text-muted">
                  Überregionale Anbieter
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARE_ROWS.map((r, i) => {
                const last = i === COMPARE_ROWS.length - 1;
                return (
                  <tr key={r.label}>
                    <td className={`py-4 pr-4 text-[15px] font-medium text-ink ${last ? "" : "border-b border-line"}`}>
                      {r.label}
                    </td>
                    <td className={`bg-brand-50/50 px-4 py-4 text-center ${last ? "rounded-b-xl" : "border-b border-white"}`}>
                      <CheckMark />
                    </td>
                    <td className={`px-4 py-4 text-center ${last ? "" : "border-b border-line"}`}>
                      {r.other === "no" ? (
                        <span className="inline-flex items-center gap-1.5 text-[14px] text-muted">
                          <CrossMark />
                          {r.otherNote && <span>{r.otherNote}</span>}
                        </span>
                      ) : (
                        <span className="text-[14px] text-muted">
                          {r.otherNote}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────  TESTIMONIALS  ───────────────────────── */
function Testimonials({ c }: { c: LandingConfig }) {
  return (
    <section className="bg-surface py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="reveal mx-auto max-w-2xl text-center">
          <SectionEyebrow>{c.testimonials.eyebrow}</SectionEyebrow>
          <h2 className="mt-4 text-3xl font-extrabold tracking-[-0.02em] text-ink sm:text-4xl lg:text-[44px] lg:leading-[1.12]">
            {c.testimonials.title}
          </h2>
        </div>

        <div className="reveal mt-14 grid gap-6 md:grid-cols-3">
          {c.testimonials.items.map((t) => (
            <article
              key={t.author}
              className="flex flex-col rounded-2xl border border-line bg-white p-7 shadow-sm"
            >
              <Stars />
              <p className="mt-4 flex-1 text-[15px] leading-relaxed text-muted">
                {`„${t.text}“`}
              </p>
              <div className="mt-6 flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-50 text-sm font-bold text-brand">
                  {initials(t.author)}
                </span>
                <strong className="text-[15px] font-bold text-ink">
                  {t.author}
                </strong>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────  FAQ  ───────────────────────── */
function FaqSection({ c }: { c: LandingConfig }) {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="reveal mx-auto max-w-2xl text-center">
          <SectionEyebrow>{c.faq.eyebrow}</SectionEyebrow>
          <h2 className="mt-4 text-3xl font-extrabold tracking-[-0.02em] text-ink sm:text-4xl lg:text-[40px] lg:leading-[1.14]">
            {c.faq.title}
          </h2>
        </div>
        <div className="reveal">
          <LandingFaq items={c.faq.items} />
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────  CTA BANNER  ───────────────────────── */
function CtaBanner({ slug }: { slug: string }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand to-brand-dark py-16 text-white lg:py-24">
      <div className="pointer-events-none absolute -right-32 -top-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
      <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
        <h2 className="text-3xl font-extrabold tracking-[-0.02em] sm:text-4xl lg:text-[42px] lg:leading-[1.12]">
          {CTA.title}
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-white/85">{CTA.text}</p>
        <div className="mt-8">
          <a
            href={`/${slug}#top`}
            className="btn-cta btn-cta--light inline-flex items-center rounded-full bg-accent px-8 py-4 font-bold text-ink shadow-lg transition-transform hover:-translate-y-0.5"
          >
            <span className="btn-label" data-text={`${CTA.button} →`}>
              {CTA.button} →
            </span>
          </a>
        </div>
        <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/85">
          {CTA.checks.map((ch) => (
            <li key={ch} className="flex items-center gap-1.5">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              {ch}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ─────────────────────────  helpers  ───────────────────────── */
function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-brand">
      <span className="h-1.5 w-1.5 rounded-full bg-brand" />
      {children}
    </p>
  );
}

function CheckMark() {
  return (
    <span className="inline-grid h-7 w-7 place-items-center rounded-full bg-brand text-white">
      <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </span>
  );
}

function CrossMark() {
  return (
    <span className="inline-grid h-7 w-7 place-items-center rounded-full bg-red-100 text-red-600">
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </span>
  );
}

function Stars() {
  return (
    <div className="flex gap-0.5 text-amber-400">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" width="17" height="17" fill="currentColor">
          <path d="M12 2l2.9 6.26 6.9.5-5.23 4.52 1.64 6.72L12 16.9 5.79 20.5l1.64-6.72L2.2 8.76l6.9-.5L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function initials(name: string) {
  // "Familie M. aus Viersen" → "M", "Herr K. aus Krefeld" → "K"
  const m = name.match(/\b([A-ZÄÖÜ])\./);
  if (m) return m[1];
  return name.trim().charAt(0).toUpperCase();
}
