import type { ReactNode } from "react";

/* ──────────────────────────────────────────────────────────────
   Bausteine der Wärmepumpen-Landingpages.
   Maße/Farben 1:1 aus Figma (Frame "LP · Wärmepumpe …"):
   Raster 1440 px, 80 px Außenabstand → 1280 px Inhaltsbreite.
   ────────────────────────────────────────────────────────────── */

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-20 ${className}`}>
      {children}
    </div>
  );
}

export function Section({
  children,
  bg = "white",
  className = "",
  id,
}: {
  children: ReactNode;
  bg?: "white" | "surface" | "ink";
  className?: string;
  id?: string;
}) {
  const bgClass =
    bg === "surface" ? "bg-surface" : bg === "ink" ? "bg-ink text-white" : "bg-white";
  return (
    <section id={id} className={`${bgClass} py-16 lg:py-24 ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

export function Eyebrow({
  children,
  tone = "brand",
  className = "",
}: {
  children: ReactNode;
  tone?: "brand" | "accent";
  className?: string;
}) {
  return (
    <p
      className={`lp-eyebrow ${tone === "accent" ? "text-accent" : "text-brand"} ${className}`}
    >
      {children}
    </p>
  );
}

/** Zentrierter Abschnittskopf: Eyebrow → H2 → optionaler Fließtext (max. 820 px). */
export function SectionHead({
  eyebrow,
  title,
  intro,
  tone = "brand",
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  tone?: "brand" | "accent";
}) {
  return (
    <div className="mx-auto max-w-[820px] text-center">
      <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      <h2 className={`lp-h2 mt-4 ${tone === "accent" ? "text-white" : "text-ink"}`}>{title}</h2>
      {intro && (
        <p className={`lp-lead mt-4 ${tone === "accent" ? "text-white/70" : "text-muted"}`}>
          {intro}
        </p>
      )}
    </div>
  );
}

/* ── Icons ───────────────────────────────────────────────────── */

/** Gelber Kreis mit dunklem Haken – der Trust-Marker der Seite. */
export function CheckMark({ size = 22 }: { size?: number }) {
  return (
    <svg viewBox="0 0 22 22" width={size} height={size} className="shrink-0" aria-hidden>
      <circle cx="11" cy="11" r="11" fill="#ffcc00" />
      <path
        d="M6.2 11.2l3.2 3.2 6.4-6.4"
        fill="none"
        stroke="#0b0b0b"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Zeile aus gelbem Haken + Text – in Hero, Produkt- und Referenzblock. */
export function TrustCheck({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-start gap-2.5">
      <span className="mt-0.5">
        <CheckMark />
      </span>
      <span className="lp-body">{children}</span>
    </li>
  );
}

export function Stars({ size = 20 }: { size?: number }) {
  return (
    <div className="flex items-center gap-1" aria-label="5 von 5 Sternen">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" width={size} height={size} fill="#ffcc00" aria-hidden>
          <path d="M12 2.4l2.9 6.26 6.9.5-5.23 4.52 1.64 6.72L12 16.9l-6.21 3.5 1.64-6.72L2.2 9.16l6.9-.5L12 2.4z" />
        </svg>
      ))}
    </div>
  );
}

export function ArrowRight({ size = 20 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0"
      aria-hidden
    >
      <line x1="4" y1="12" x2="19" y2="12" />
      <polyline points="13 6 19 12 13 18" />
    </svg>
  );
}

export function PhoneIcon({ size = 22 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0"
      aria-hidden
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.2 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

export function MailIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0"
      aria-hidden
    >
      <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
      <path d="M3 6.5l9 6 9-6" />
    </svg>
  );
}

export function LockIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0"
      aria-hidden
    >
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}

export type BenefitIconKey = "percent" | "shield" | "users" | "award";

const benefitPaths: Record<BenefitIconKey, ReactNode> = {
  percent: (
    <>
      <line x1="19" y1="5" x2="5" y2="19" />
      <circle cx="7.5" cy="7.5" r="2.6" />
      <circle cx="16.5" cy="16.5" r="2.6" />
    </>
  ),
  shield: (
    <>
      <path d="M12 22s8-4 8-10V5.5L12 2.5 4 5.5V12c0 6 8 10 8 10z" />
      <polyline points="9 11.8 11.2 14 15.2 10" />
    </>
  ),
  users: (
    <>
      <path d="M16 20v-1.8a3.6 3.6 0 0 0-3.6-3.6H6.6A3.6 3.6 0 0 0 3 18.2V20" />
      <circle cx="9.5" cy="7.6" r="3.6" />
      <path d="M21 20v-1.8a3.6 3.6 0 0 0-2.7-3.48" />
      <path d="M15.4 4.2a3.6 3.6 0 0 1 0 6.97" />
    </>
  ),
  award: (
    <>
      <circle cx="12" cy="9" r="5.4" />
      <polyline points="8.4 13.6 7.4 21.5 12 19 16.6 21.5 15.6 13.6" />
    </>
  ),
};

export function BenefitIcon({ name, size = 28 }: { name: BenefitIconKey; size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {benefitPaths[name]}
    </svg>
  );
}

/* ── Buttons ─────────────────────────────────────────────────── */

/** Blauer Primär-Button, 52 px hoch, Radius 10 px (Figma "LP/BtnPrimary"). */
export function PrimaryButton({
  href,
  children,
  className = "",
  withArrow = false,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  withArrow?: boolean;
}) {
  return (
    <a
      href={href}
      className={`btn-cta inline-flex h-[52px] items-center justify-center gap-2.5 rounded-[10px] bg-brand px-7 text-base font-semibold text-white transition-colors hover:bg-brand-dark ${className}`}
    >
      <span className="btn-label" data-text={typeof children === "string" ? children : undefined}>
        {children}
      </span>
      {withArrow && <ArrowRight />}
    </a>
  );
}

/** Gelber CTA-Button auf dem blauen Schlussbanner, 56 px hoch. */
export function AccentButton({
  href,
  children,
}: {
  href: string;
  children: string;
}) {
  return (
    <a
      href={href}
      className="btn-cta btn-cta--light inline-flex h-14 items-center justify-center gap-2.5 rounded-[10px] bg-accent px-8 text-base font-semibold text-ink transition-transform hover:-translate-y-0.5"
    >
      <span className="btn-label" data-text={children}>
        {children}
      </span>
      <ArrowRight />
    </a>
  );
}
