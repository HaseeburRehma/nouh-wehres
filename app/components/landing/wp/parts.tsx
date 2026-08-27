import Image from "next/image";
import type { ReactNode } from "react";
import { VorteilIcon } from "../icons";
import type { IconKey, FaqItem } from "../../../lib/landing";
import LandingFaq from "../LandingFaq";
import QualifyForm from "./QualifyForm";
import BeforeAfter from "./BeforeAfter";
import ImageSlider from "./ImageSlider";

/* ── shared bits ── */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-brand">
      <span className="h-1.5 w-1.5 rounded-full bg-brand" />
      {children}
    </p>
  );
}

function Check({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export function Stars({ size = 17 }: { size?: number }) {
  return (
    <div className="flex gap-0.5 text-amber-400">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
          <path d="M12 2l2.9 6.26 6.9.5-5.23 4.52 1.64 6.72L12 16.9 5.79 20.5l1.64-6.72L2.2 8.76l6.9-.5L12 2z" />
        </svg>
      ))}
    </div>
  );
}

/* ── STATS ROW ── */
export function StatsRow({ stats }: { stats: { value: string; label: string }[] }) {
  return (
    <section className="border-b border-line bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-8 px-5 py-10 sm:px-8 lg:grid-cols-4 lg:divide-x lg:divide-line">
        {stats.map((s) => (
          <div key={s.label} className="px-2 text-center lg:px-6">
            <div className="text-3xl font-extrabold tracking-[-0.02em] text-brand sm:text-[34px]">
              {s.value}
            </div>
            <div className="mt-1 text-[13px] font-medium text-muted sm:text-sm">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── PARTNER LOGOS ── */
const PARTNER_LOGOS = [
  { src: "/partner/bosch.png", alt: "Bosch" },
  { src: "/partner/buderus.png", alt: "Buderus" },
  { src: "/partner/mtf-samsung.png", alt: "MTF Samsung" },
  { src: "/partner/stiebel-eltron.png", alt: "Stiebel Eltron" },
];

export function PartnerLogos() {
  return (
    <section className="border-b border-line bg-white py-12 lg:py-14">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <p className="text-center text-xs font-bold uppercase tracking-[0.16em] text-muted">
          Unsere Partner
        </p>
        <div className="mt-8 grid grid-cols-2 items-center justify-items-center gap-x-8 gap-y-10 sm:grid-cols-4">
          {PARTNER_LOGOS.map((l) => (
            <Image
              key={l.alt}
              src={l.src}
              alt={l.alt}
              width={400}
              height={160}
              className="h-14 w-auto object-contain sm:h-16"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── FEATURE SPLIT (image + text + bullets) ── */
export function FeatureSplit({
  eyebrow,
  title,
  body,
  bullets,
  image,
  imageAlt,
  imageLeft = true,
}: {
  eyebrow: string;
  title: string;
  body: string;
  bullets: string[];
  image: string;
  imageAlt: string;
  imageLeft?: boolean;
}) {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
        <div className={`reveal overflow-hidden rounded-2xl ring-1 ring-line ${imageLeft ? "" : "lg:order-2"}`}>
          <Image
            src={image}
            alt={imageAlt}
            width={1600}
            height={1200}
            className="h-full max-h-[460px] w-full object-cover"
          />
        </div>
        <div className={`reveal ${imageLeft ? "" : "lg:order-1"}`}>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-4 text-3xl font-extrabold tracking-[-0.02em] text-ink sm:text-4xl lg:text-[40px] lg:leading-[1.14]">
            {title}
          </h2>
          <p className="lead mt-5 text-muted">{body}</p>
          <ul className="mt-6 space-y-3">
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-3 text-[15px] text-ink">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand text-white">
                  <Check />
                </span>
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ── BENEFIT CARDS (icon grid) ── */
export function BenefitCards({
  eyebrow,
  title,
  intro,
  items,
  bg = "surface",
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  items: { icon: IconKey; title: string; text: string }[];
  bg?: "surface" | "white";
}) {
  return (
    <section className={`${bg === "surface" ? "bg-surface" : "bg-white"} py-20 lg:py-28`}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="reveal mx-auto max-w-3xl text-center">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-4 text-3xl font-extrabold tracking-[-0.02em] text-ink sm:text-4xl lg:text-[44px] lg:leading-[1.12]">
            {title}
          </h2>
          {intro && <p className="lead mx-auto mt-4 max-w-2xl text-muted">{intro}</p>}
        </div>
        <div className="reveal mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((v) => (
            <article key={v.title} className="rounded-2xl border border-line bg-white p-7 transition-all hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-md">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent text-ink">
                <VorteilIcon name={v.icon} />
              </span>
              <h3 className="mt-5 text-lg font-bold text-ink">{v.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{v.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── STEPS ROW ── */
export function StepsRow({
  eyebrow,
  title,
  items,
  bg = "white",
}: {
  eyebrow: string;
  title: string;
  items: { title: string; text: string }[];
  bg?: "surface" | "white";
}) {
  return (
    <section className={`${bg === "surface" ? "bg-surface" : "bg-white"} py-20 lg:py-28`}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="reveal mx-auto max-w-2xl text-center">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-4 text-3xl font-extrabold tracking-[-0.02em] text-ink sm:text-4xl lg:text-[44px] lg:leading-[1.12]">
            {title}
          </h2>
        </div>
        <ol className="reveal mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((s, i) => (
            <li key={s.title} className="relative rounded-2xl border border-line bg-white p-7">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-brand text-lg font-extrabold text-white">
                {i + 1}
              </span>
              <h3 className="mt-5 text-lg font-bold text-ink">{s.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ── TESTIMONIAL FEATURE (image + big quote + bullets) ── */
export function TestimonialFeature({
  eyebrow,
  title,
  image,
  imageAlt,
  quote,
  author,
  bullets,
}: {
  eyebrow: string;
  title: string;
  image: string;
  imageAlt: string;
  quote: string;
  author: string;
  bullets: string[];
}) {
  return (
    <section className="bg-surface py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="reveal mx-auto max-w-2xl text-center">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-4 text-3xl font-extrabold tracking-[-0.02em] text-ink sm:text-4xl lg:text-[40px] lg:leading-[1.14]">
            {title}
          </h2>
        </div>
        <div className="reveal mt-14 grid items-stretch gap-8 lg:grid-cols-2">
          <div className="overflow-hidden rounded-2xl ring-1 ring-line">
            <Image src={image} alt={imageAlt} width={1400} height={1200} className="h-full max-h-[440px] w-full object-cover" />
          </div>
          <div className="flex flex-col justify-center rounded-2xl border border-line bg-white p-8 shadow-sm">
            <Stars />
            <blockquote className="mt-4 text-lg leading-relaxed text-ink">
              {`„${quote}“`}
            </blockquote>
            <p className="mt-4 text-sm font-bold text-brand">{author}</p>
            <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {bullets.map((b) => (
                <li key={b} className="flex items-start gap-2 text-[14px] text-muted">
                  <span className="mt-0.5 text-brand"><Check /></span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── COMPARE TABLE (generic 2-col) ── */
export function CompareTable({
  eyebrow,
  title,
  rows,
  otherLabel,
}: {
  eyebrow: string;
  title: string;
  otherLabel: string;
  rows: { label: string; other: "no" | "partial"; otherNote?: string }[];
}) {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <div className="reveal mx-auto max-w-2xl text-center">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-4 text-3xl font-extrabold tracking-[-0.02em] text-ink sm:text-4xl lg:text-[40px] lg:leading-[1.14]">
            {title}
          </h2>
        </div>
        <div className="reveal mt-12">
          <table className="w-full table-fixed border-separate border-spacing-0">
            <thead>
              <tr>
                <th className="w-[44%] p-1 sm:p-4" />
                <th className="w-[28%] p-1 align-bottom sm:p-2">
                  <div className="rounded-t-xl bg-brand px-2 py-2 text-center leading-tight text-white sm:px-4 sm:py-3">
                    <div className="text-[13px] font-extrabold sm:text-[15px]">Nouh-Wehres</div>
                    <div className="text-[10px] font-medium text-white/80 sm:text-[11px]">
                      Meisterbetrieb aus der Region
                    </div>
                  </div>
                </th>
                <th className="w-[28%] p-2 text-center align-bottom text-[12px] font-semibold leading-tight text-muted sm:p-4 sm:text-[15px]">
                  {otherLabel}
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => {
                const last = i === rows.length - 1;
                return (
                  <tr key={r.label}>
                    <td className={`py-3 pr-2 text-[13px] font-medium leading-snug text-ink sm:py-4 sm:pr-4 sm:text-[15px] ${last ? "" : "border-b border-line"}`}>
                      {r.label}
                    </td>
                    <td className={`bg-brand-50/50 px-2 py-3 text-center sm:px-4 sm:py-4 ${last ? "rounded-b-xl" : "border-b border-white"}`}>
                      <span className="inline-grid h-6 w-6 place-items-center rounded-full bg-brand text-white sm:h-7 sm:w-7">
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                    </td>
                    <td className={`px-2 py-3 text-center sm:px-4 sm:py-4 ${last ? "" : "border-b border-line"}`}>
                      {r.other === "no" ? (
                        <span className="inline-flex flex-col items-center gap-1 text-[12px] text-muted sm:flex-row sm:gap-1.5 sm:text-[14px]">
                          <span className="inline-grid h-6 w-6 place-items-center rounded-full bg-red-100 text-red-600 sm:h-7 sm:w-7">
                            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <line x1="18" y1="6" x2="6" y2="18" />
                              <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                          </span>
                          {r.otherNote && <span className="leading-tight">{r.otherNote}</span>}
                        </span>
                      ) : (
                        <span className="text-[12px] leading-tight text-muted sm:text-[14px]">
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

/* ── TESTIMONIALS (3 cards) ── */
export function Testimonials({
  eyebrow,
  title,
  items,
}: {
  eyebrow: string;
  title: string;
  items: { text: string; author: string; tag?: string }[];
}) {
  return (
    <section className="bg-surface py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="reveal mx-auto max-w-2xl text-center">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-4 text-3xl font-extrabold tracking-[-0.02em] text-ink sm:text-4xl lg:text-[44px] lg:leading-[1.12]">
            {title}
          </h2>
        </div>
        <div className="reveal mt-14 grid gap-6 md:grid-cols-3">
          {items.map((t) => (
            <article key={t.author} className="flex flex-col rounded-2xl border border-line bg-white p-7 shadow-sm">
              <div className="flex items-center justify-between">
                <Stars />
                {t.tag && (
                  <span className="rounded-full bg-brand-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-brand">
                    {t.tag}
                  </span>
                )}
              </div>
              <p className="mt-4 flex-1 text-[15px] leading-relaxed text-muted">{`„${t.text}“`}</p>
              <div className="mt-6 flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-50 text-sm font-bold text-brand">
                  {initials(t.author)}
                </span>
                <strong className="text-[15px] font-bold text-ink">{t.author}</strong>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── TEAM ── */
export function Team({
  eyebrow,
  title,
  intro,
  members,
  groupPhoto = "/team-bosch.jpg",
  groupPhotoAlt,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  // `photo` is kept in the type for backwards-compat with old call sites,
  // but is intentionally ignored: only the section-level groupPhoto is shown.
  members: { photo?: string; name: string; role: string; focus?: string }[];
  groupPhoto?: string;
  groupPhotoAlt?: string;
}) {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="reveal mx-auto max-w-2xl text-center">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-4 text-3xl font-extrabold tracking-[-0.02em] text-ink sm:text-4xl lg:text-[40px] lg:leading-[1.14]">
            {title}
          </h2>
          <p className="lead mt-4 text-muted">{intro}</p>
        </div>

        <div className="reveal mx-auto mt-14 grid max-w-6xl items-center gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
          <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-line">
            <Image
              src={groupPhoto}
              alt={
                groupPhotoAlt ??
                `Das NOUH-WEHRES Team: ${members.map((m) => m.name).join(", ")}`
              }
              width={1600}
              height={1289}
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
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── TRUST BADGES ── */
export function TrustBadges({
  eyebrow,
  title,
  intro,
  items,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  items: { value: string; label: string; sub: string; kind: "google" | "proven" | "recommend" }[];
}) {
  return (
    <section className="bg-surface py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="reveal mx-auto max-w-2xl text-center">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-4 text-3xl font-extrabold tracking-[-0.02em] text-ink sm:text-4xl lg:text-[44px] lg:leading-[1.12]">
            {title}
          </h2>
          <p className="lead mt-4 text-muted">{intro}</p>
        </div>
        <div className="reveal mt-14 grid gap-6 md:grid-cols-3">
          {items.map((t) => (
            <article key={t.label} className="flex flex-col items-center rounded-2xl border border-line bg-white p-8 text-center shadow-sm">
              <span className="grid h-12 w-12 place-items-center">
                {t.kind === "google" ? <GoogleG /> : t.kind === "proven" ? <ProvenExpertMark /> : <RecommendMark />}
              </span>
              <div className="mt-4 text-4xl font-extrabold tracking-[-0.02em] text-ink">{t.value}</div>
              {t.kind !== "recommend" && <div className="mt-2"><Stars size={16} /></div>}
              <div className="mt-3 text-[15px] font-bold text-ink">{t.label}</div>
              <div className="mt-1 text-sm text-muted">{t.sub}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── PRODUCT + PRICE (Kaufen) ── */
export function ProductPrice({
  eyebrow,
  title,
  body,
  image,
  imageAlt,
  price,
  priceNote,
  priceSub,
  bullets,
}: {
  eyebrow: string;
  title: string;
  body: string;
  image: string;
  imageAlt: string;
  price: string;
  priceNote: string;
  priceSub: string;
  bullets: string[];
}) {
  return (
    <section className="bg-surface py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
        <div className="reveal">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-4 text-3xl font-extrabold tracking-[-0.02em] text-ink sm:text-4xl lg:text-[40px] lg:leading-[1.14]">
            {title}
          </h2>
          <p className="lead mt-5 text-muted">{body}</p>

          <div className="mt-6 rounded-2xl border border-brand/30 bg-brand-50/50 p-5">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-extrabold tracking-[-0.02em] text-brand">{price}</span>
              <span className="text-[15px] font-semibold text-ink">{priceNote}</span>
            </div>
            <p className="mt-1 text-sm text-muted">{priceSub}</p>
          </div>

          <ul className="mt-6 space-y-3">
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-3 text-[15px] text-ink">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand text-white"><Check /></span>
                {b}
              </li>
            ))}
          </ul>
        </div>
        <div className="reveal overflow-hidden rounded-2xl bg-white ring-1 ring-line">
          <Image src={image} alt={imageAlt} width={1400} height={1200} className="h-full max-h-[460px] w-full object-cover" />
        </div>
      </div>
    </section>
  );
}

/* ── TWO IMAGE PROCESS ── */
export function TwoImage({
  eyebrow,
  title,
  body,
  items,
}: {
  eyebrow: string;
  title: string;
  body: string;
  items: { image?: string; images?: string[]; imageAlt: string; title: string; text: string }[];
}) {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="reveal mx-auto max-w-2xl text-center">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-4 text-3xl font-extrabold tracking-[-0.02em] text-ink sm:text-4xl lg:text-[40px] lg:leading-[1.14]">
            {title}
          </h2>
          <p className="lead mt-4 text-muted">{body}</p>
        </div>
        <div className="reveal mt-14 grid gap-8 md:grid-cols-2">
          {items.map((it) => (
            <article key={it.title} className="overflow-hidden rounded-2xl border border-line bg-white shadow-sm">
              <div className="overflow-hidden">
                {it.images && it.images.length > 1 ? (
                  <ImageSlider images={it.images} alt={it.imageAlt} />
                ) : (
                  <Image
                    src={it.image ?? it.images?.[0] ?? ""}
                    alt={it.imageAlt}
                    width={1400}
                    height={900}
                    className="h-64 w-full object-cover"
                  />
                )}
              </div>
              <div className="p-7">
                <h3 className="text-lg font-bold text-ink">{it.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{it.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── DARK SAVINGS BAND ── */
export function DarkSavings({
  eyebrow,
  title,
  body,
  stats,
  image,
  imageAlt,
}: {
  eyebrow: string;
  title: string;
  body: string;
  stats: { value: string; label: string }[];
  image: string;
  imageAlt: string;
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand to-brand-dark py-20 text-white lg:py-24">
      <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-32 h-80 w-80 rounded-full bg-black/10 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
        <div className="reveal">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {eyebrow}
          </p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-[-0.02em] sm:text-4xl lg:text-[40px] lg:leading-[1.14]">
            {title}
          </h2>
          <p className="mt-5 text-lg text-white/85">{body}</p>
          <div className="mt-8 grid grid-cols-3 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="rounded-xl bg-white/10 p-4 ring-1 ring-white/15">
                <div className="text-2xl font-extrabold text-accent sm:text-3xl">{s.value}</div>
                <div className="mt-1 text-[12px] text-white/85 sm:text-[13px]">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="reveal overflow-hidden rounded-2xl ring-1 ring-white/10">
          <Image src={image} alt={imageAlt} width={1400} height={1100} className="h-full max-h-[420px] w-full object-cover" />
        </div>
      </div>
    </section>
  );
}

/* ── FAQ ── */
export function FaqSection({ eyebrow, title, items }: { eyebrow: string; title: string; items: FaqItem[] }) {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="reveal mx-auto max-w-2xl text-center">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-4 text-3xl font-extrabold tracking-[-0.02em] text-ink sm:text-4xl lg:text-[40px] lg:leading-[1.14]">
            {title}
          </h2>
        </div>
        <div className="reveal">
          <LandingFaq items={items} />
        </div>
      </div>
    </section>
  );
}

/* ── QUALIFY CTA (feature + form) ── */
export function QualifyCta({
  eyebrow,
  title,
  body,
  bullets,
  image,
  imageAlt,
  topic,
  submitLabel,
}: {
  eyebrow: string;
  title: string;
  body: string;
  bullets: string[];
  image: string;
  imageAlt: string;
  topic: string;
  submitLabel: string;
}) {
  return (
    <section className="bg-surface py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
        <div className="reveal">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-4 text-3xl font-extrabold tracking-[-0.02em] text-ink sm:text-4xl lg:text-[40px] lg:leading-[1.14]">
            {title}
          </h2>
          <p className="lead mt-5 text-muted">{body}</p>
          <ul className="mt-6 space-y-3">
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-3 text-[15px] text-ink">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand text-white"><Check /></span>
                {b}
              </li>
            ))}
          </ul>
          <div className="mt-8 overflow-hidden rounded-2xl ring-1 ring-line">
            <Image src={image} alt={imageAlt} width={1400} height={800} className="h-56 w-full object-cover" />
          </div>
        </div>
        <div className="reveal">
          <QualifyForm topic={topic} submitLabel={submitLabel} />
        </div>
      </div>
    </section>
  );
}

/* ── FINAL CTA BANNER ── */
export function CtaBanner({
  title,
  text,
  button,
  href,
  checks,
}: {
  title: string;
  text: string;
  button: string;
  href: string;
  checks: string[];
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand to-brand-dark py-16 text-white lg:py-24">
      <div className="pointer-events-none absolute -right-32 -top-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
      <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
        <h2 className="text-3xl font-extrabold tracking-[-0.02em] sm:text-4xl lg:text-[42px] lg:leading-[1.12]">
          {title}
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-white/85">{text}</p>
        <div className="mt-8 flex justify-center">
          <a
            href={href}
            className="btn-cta btn-cta--light inline-flex max-w-full items-center justify-center rounded-full bg-accent px-6 py-3.5 text-center text-[14px] font-bold text-ink shadow-lg transition-transform hover:-translate-y-0.5 sm:px-8 sm:py-4 sm:text-base"
          >
            <span className="btn-label" data-text={`${button} →`}>
              {button} →
            </span>
          </a>
        </div>
        <ul className="mx-auto mt-8 flex max-w-md flex-col items-center gap-2 text-sm text-white/85 sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-6">
          {checks.map((ch) => (
            <li key={ch} className="flex items-center gap-1.5">
              <span className="text-accent"><Check /></span>
              {ch}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ── MEISTER FEATURE (Section A — Jürgen the SHK Meister) ── */
export function MeisterFeature({
  eyebrow,
  title,
  body,
  quote,
  quoteAuthor,
  photo,
  photoLabel,
  logos,
}: {
  eyebrow: string;
  title: string;
  body: string;
  quote: string;
  quoteAuthor: string;
  photo: string;
  photoLabel: string;
  logos?: { src: string; alt: string }[];
}) {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="reveal grid items-start gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-14">
          {/* Portrait card */}
          <div className="relative overflow-hidden rounded-2xl bg-surface shadow-sm ring-1 ring-line">
            <Image
              src={photo}
              alt={photoLabel}
              width={800}
              height={1050}
              className="h-full w-full object-cover"
            />
            <span className="absolute inset-x-0 bottom-0 bg-ink/80 px-5 py-3 text-sm font-bold text-white backdrop-blur">
              {photoLabel}
            </span>
          </div>
          {/* Copy + quote */}
          <div>
            <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-brand">
              {eyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.02em] text-ink sm:text-4xl lg:text-[40px] lg:leading-[1.14]">
              {title}
            </h2>
            <p className="lead mt-5 text-muted">{body}</p>
            <blockquote className="mt-6 rounded-2xl border border-brand/25 bg-brand-50/40 p-6">
              <span className="mb-2 block text-2xl leading-none text-brand" aria-hidden>
                „
              </span>
              <p className="text-[17px] font-semibold leading-relaxed text-ink">
                {quote}
              </p>
              <footer className="mt-3 text-sm font-bold text-brand">
                — {quoteAuthor}
              </footer>
            </blockquote>
          </div>
        </div>
        {/* Trust logos (Handwerkskammer + Das Handwerk) */}
        {logos && logos.length > 0 && (
          <div className="reveal mt-10 rounded-2xl border border-line bg-white p-6 shadow-sm sm:p-8">
            <p className="text-center text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
              Meisterbetrieb · Eingetragen bei
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-12 gap-y-6 sm:gap-x-16">
              {logos.map((l) => (
                <Image
                  key={l.src}
                  src={l.src}
                  alt={l.alt}
                  width={480}
                  height={160}
                  className="h-12 w-auto object-contain sm:h-14"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* ── LIVE 3D VISUALISATION (Section B) ── */
export function LiveViz({
  chip,
  eyebrow,
  title,
  body,
  bullets,
  cta,
  ctaHref,
  image,
  imageAlt,
  imageCaption,
}: {
  chip: string;
  eyebrow: string;
  title: string;
  body: string;
  bullets: string[];
  cta: string;
  ctaHref: string;
  image: string;
  imageAlt: string;
  imageCaption?: string;
}) {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-14">
        {/* Image + chip */}
        <div className="relative order-1 overflow-hidden rounded-2xl bg-surface shadow-sm ring-1 ring-line lg:order-none">
          <Image
            src={image}
            alt={imageAlt}
            width={1400}
            height={1000}
            className="h-full w-full object-cover"
          />
          <span className="absolute left-4 top-4 rounded-full bg-accent px-4 py-1.5 text-[12px] font-bold uppercase tracking-wide text-ink shadow">
            {chip}
          </span>
          {imageCaption && (
            <span className="absolute inset-x-0 bottom-0 bg-ink/70 px-4 py-2 text-[12px] font-medium text-white backdrop-blur">
              {imageCaption}
            </span>
          )}
        </div>
        {/* Copy + checks + CTA */}
        <div className="order-2 lg:order-none">
          <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-brand">
            {eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.02em] text-ink sm:text-4xl lg:text-[40px] lg:leading-[1.14]">
            {title}
          </h2>
          <p className="lead mt-5 text-muted">{body}</p>
          <ul className="mt-6 space-y-3">
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-3 text-[15px] font-medium text-ink">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand text-white">
                  <Check />
                </span>
                {b}
              </li>
            ))}
          </ul>
          <a
            href={ctaHref}
            className="btn-cta mt-8 inline-flex items-center rounded-full bg-brand px-6 py-3.5 font-semibold text-white shadow-sm transition-colors hover:bg-brand-dark"
          >
            <span className="btn-label" data-text={`${cta} →`}>
              {cta} →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ── BEFORE / AFTER RESULTS (draggable Vorher · Nachher) ── */
export function BeforeAfterResults({
  eyebrow,
  title,
  intro,
  items,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  items: { before: string; after: string; caption: string; alt?: string }[];
}) {
  const cols =
    items.length >= 3
      ? "md:grid-cols-3"
      : items.length === 2
        ? "mx-auto max-w-4xl md:grid-cols-2"
        : "mx-auto max-w-xl";
  return (
    <section className="bg-surface py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="reveal mx-auto max-w-2xl text-center">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-4 text-3xl font-extrabold tracking-[-0.02em] text-ink sm:text-4xl lg:text-[44px] lg:leading-[1.12]">
            {title}
          </h2>
          <p className="lead mt-4 text-muted">{intro}</p>
        </div>
        <div className={`reveal mt-14 grid gap-6 ${cols}`}>
          {items.map((it) => (
            <figure
              key={it.caption}
              className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-line"
            >
              <BeforeAfter
                before={it.before}
                after={it.after}
                beforeAlt={it.alt}
                afterAlt={it.alt}
              />
              <figcaption className="px-5 py-4 text-[14px] font-medium text-ink">
                {it.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── VERSUS COMPARE (kein Vermittlerportal) ── */
export function VersusCompare({
  eyebrow,
  title,
  intro,
  left,
  right,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  left: { title: string; sub: string; items: string[] };
  right: { title: string; sub: string; items: string[] };
}) {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <div className="reveal mx-auto max-w-2xl text-center">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-4 text-3xl font-extrabold tracking-[-0.02em] text-ink sm:text-4xl lg:text-[40px] lg:leading-[1.14]">
            {title}
          </h2>
          <p className="lead mt-4 text-muted">{intro}</p>
        </div>
        <div className="reveal mt-12 grid gap-6 md:grid-cols-2">
          {/* Vermittlerportale */}
          <div className="rounded-2xl border border-line bg-surface/60 p-7">
            <h3 className="text-lg font-bold text-ink">{left.title}</h3>
            <p className="mt-0.5 text-sm text-muted">{left.sub}</p>
            <ul className="mt-5 space-y-3">
              {left.items.map((i) => (
                <li key={i} className="flex items-start gap-3 text-[15px] text-muted">
                  <span className="mt-0.5 inline-grid h-5 w-5 shrink-0 place-items-center rounded-full bg-red-100 text-red-600">
                    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </span>
                  {i}
                </li>
              ))}
            </ul>
          </div>
          {/* Nouh-Wehres */}
          <div className="rounded-2xl border-2 border-brand/40 bg-brand-50/40 p-7 shadow-sm">
            <h3 className="text-lg font-extrabold text-brand">{right.title}</h3>
            <p className="mt-0.5 text-sm text-muted">{right.sub}</p>
            <ul className="mt-5 space-y-3">
              {right.items.map((i) => (
                <li key={i} className="flex items-start gap-3 text-[15px] font-medium text-ink">
                  <span className="mt-0.5 inline-grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand text-white">
                    <Check />
                  </span>
                  {i}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── RESULTS GRID (Vorher · Nachher) ── */
export function ResultsGrid({
  eyebrow,
  title,
  intro,
  items,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  items: { image: string; imageAlt: string; caption: string }[];
}) {
  return (
    <section className="bg-surface py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="reveal mx-auto max-w-2xl text-center">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-4 text-3xl font-extrabold tracking-[-0.02em] text-ink sm:text-4xl lg:text-[44px] lg:leading-[1.12]">
            {title}
          </h2>
          <p className="lead mt-4 text-muted">{intro}</p>
        </div>
        <div className="reveal mt-14 grid gap-6 md:grid-cols-3">
          {items.map((it) => (
            <figure key={it.caption} className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-line">
              <div className="relative">
                <Image src={it.image} alt={it.imageAlt} width={1200} height={900} className="h-60 w-full object-cover" />
                <span className="absolute left-3 top-3 rounded-full bg-ink/80 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white backdrop-blur">
                  Vorher · Nachher
                </span>
              </div>
              <figcaption className="px-5 py-4 text-[14px] font-medium text-ink">
                {it.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── logos/marks ── */
function GoogleG() {
  return (
    <svg viewBox="0 0 24 24" width="30" height="30" aria-hidden>
      <path fill="#4285F4" d="M23.5 12.27c0-.79-.07-1.54-.2-2.27H12v4.51h6.47a5.53 5.53 0 0 1-2.4 3.63v3h3.87c2.27-2.09 3.56-5.17 3.56-8.87z" />
      <path fill="#34A853" d="M12 24c3.24 0 5.96-1.08 7.94-2.91l-3.87-3c-1.08.72-2.45 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.28v3.09A12 12 0 0 0 12 24z" />
      <path fill="#FBBC05" d="M5.27 14.28a7.2 7.2 0 0 1 0-4.56V6.63H1.28a12 12 0 0 0 0 10.74l3.99-3.09z" />
      <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0A12 12 0 0 0 1.28 6.63l3.99 3.09C6.22 6.86 8.87 4.75 12 4.75z" />
    </svg>
  );
}

function ProvenExpertMark() {
  return (
    <span className="grid h-11 w-11 place-items-center rounded-full bg-brand text-white">
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 2l2.9 6.26 6.9.5-5.23 4.52 1.64 6.72L12 16.9 5.79 20.5l1.64-6.72L2.2 8.76l6.9-.5L12 2z" /></svg>
    </span>
  );
}

function RecommendMark() {
  return (
    <span className="grid h-11 w-11 place-items-center rounded-full bg-brand text-white">
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 10v11" /><path d="M7 10l4-7a2 2 0 0 1 3 1.8V9h4.5a2 2 0 0 1 2 2.3l-1.2 7A2 2 0 0 1 19.3 20H7" />
      </svg>
    </span>
  );
}

function initials(name: string) {
  const m = name.match(/\b([A-ZÄÖÜ])\./);
  if (m) return m[1];
  return name.trim().charAt(0).toUpperCase();
}
