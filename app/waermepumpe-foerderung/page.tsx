import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import LeadForm from "../components/foerder/LeadForm";
import Motion from "../components/foerder/Motion";
import Faq, { type FaqItem } from "../components/foerder/Faq";
import SnapDots from "../components/foerder/SnapDots";
import StickyBar from "../components/foerder/StickyBar";
import AutoSlider from "../components/foerder/AutoSlider";
import { ArrowRight, CheckDot, Clock, DocCheck, Phone, Pin, Star } from "../components/foerder/icons";

export const metadata: Metadata = {
  title: "Bis zu 70 % Förderung für Ihre neue Heizung | NOUH-WEHRES Willich",
  description:
    "Wärmepumpe & Heizung vom Meisterbetrieb aus Willich: bis zu 70 % KfW-Zuschuss, Förderantrag inklusive, Festpreis, Bosch-Qualität. Jetzt kostenlose Förder-Beratung sichern.",
  metadataBase: new URL("https://www.nouh-wehres.de"),
  alternates: { canonical: "/waermepumpe-foerderung" },
  openGraph: {
    title: "Bis zu 70 % Förderung für Ihre neue Heizung",
    description: "Kostenlose Förder-Beratung vom Meisterbetrieb aus Willich – Förderantrag inklusive.",
    images: ["/lp/hero/hero-2000.webp"],
  },
};

const PHONE = "02154 87670";
const PHONE_HREF = "tel:+49215487670";

const faqs: FaqItem[] = [
  {
    q: "Was kostet eine neue Wärmepumpe?",
    a: "Das hängt von Haus, Heizlast und Anlagentyp ab. Nach dem kostenlosen Vor-Ort-Termin erhalten Sie ein Festpreis-Angebot – abzüglich Ihrer Förderung.",
  },
  {
    q: "Wie viel Förderung bekomme ich?",
    a: "Jeder Eigentümer erhält 30 % Grundförderung. Dazu kommen je nach Situation der Klimageschwindigkeits-Bonus für den Austausch alter Gas- oder Ölheizungen und der Einkommensbonus – zusammen bis zu 70 % der förderfähigen Kosten.",
  },
  {
    q: "Wie lange dauert der Einbau?",
    a: "Der Einbau selbst dauert meist nur wenige Tage. Den genauen Zeitplan – inklusive Förderantrag und Liefertermin – besprechen wir mit Ihnen beim Vor-Ort-Termin.",
  },
  {
    q: "Funktioniert eine Wärmepumpe auch im Altbau?",
    a: "In den meisten Fällen ja. Wir prüfen Heizlast, Heizkörper und Dämmung bei Ihnen vor Ort und sagen Ihnen ehrlich, ob und mit welcher Anlage sich die Wärmepumpe für Ihr Haus lohnt.",
  },
  {
    q: "Muss ich mich selbst um den Förderantrag kümmern?",
    a: "Nein. Wir übernehmen den Förder-Papierkram für Sie – Antrag, Nachweise und Abwicklung sind bei uns inklusive.",
  },
];

// Echte Google-Rezensionen (siehe app/components/Testimonials.tsx)
const reviews = [
  {
    name: "Mohamed Cheffadi",
    city: "Willich",
    text: "Meine alte Heizung wurde professionell ausgebaut und durch eine moderne, hocheffiziente Anlage ersetzt. Von der Beratung bis zur Installation lief alles reibungslos – pünktlich, sauber und präzise.",
  },
  {
    name: "Beate Leister",
    city: "Viersen",
    text: "Nach dem Defekt unserer 27 Jahre alten Gasheizung war das Team innerhalb weniger Stunden da. Gewissenhaft, sauber und schnell, dazu eine super Einweisung. 100 % Weiterempfehlung!",
  },
  {
    name: "Marco Jerkovic",
    city: "Mönchengladbach",
    text: "Sämtliche Arbeiten wurden sauber, pünktlich und zu meiner vollsten Zufriedenheit ausgeführt. Obwohl der Plan mehrmals geändert wurde, blieben die veranschlagten Kosten stabil.",
  },
];

type Project = { src: string; alt: string; interval?: number; slides?: { src: string; alt: string }[] };
const projects: Project[] = [
  { src: "/lp/ref-montage.webp", alt: "NOUH-WEHRES Monteur beim Anschluss einer Bosch Wärmepumpe" },
  {
    // Mitte: automatischer Slider (Außengerät + Technikraum)
    src: "/lp/ref-bosch-aussen.webp",
    alt: "Bosch Wärmepumpe – Außengerät und Technikraum",
    slides: [
      { src: "/lp/ref-bosch-aussen.webp", alt: "Bosch Wärmepumpe im geschützten Außenbereich auf Kiesbett" },
      { src: "/lp/ref-bosch-technikraum.webp", alt: "Neuer Bosch Technikraum mit Inneneinheit, Speicher und Hydraulik" },
    ],
  },
  {
    // Rechts: automatischer Slider (Heizraum-Modernisierung)
    src: "/lp/ref-heizraum-1.webp",
    interval: 5200, // versetzt zum mittleren Slider
    alt: "Heizraum-Modernisierung von NOUH-WEHRES",
    slides: [
      { src: "/lp/ref-heizraum-1.webp", alt: "Neue Hydraulik mit Ausdehnungsgefäß und Sicherheitsgruppe" },
      { src: "/lp/ref-heizraum-2.webp", alt: "Neu installierter Brötje Heizkessel mit Pumpengruppe" },
      { src: "/lp/ref-heizraum-3.webp", alt: "Kondensatpumpe und Abgasleitung nach der Modernisierung" },
      { src: "/lp/ref-heizraum-4.webp", alt: "Brötje Heizkessel mit Regelung und Ölfilter" },
    ],
  },
];

function Eyebrow({ children, tone = "brand", center = false }: { children: React.ReactNode; tone?: "brand" | "yellow"; center?: boolean }) {
  return (
    <p className={`fl-eyebrow ${tone === "yellow" ? "text-fl-yellow" : "text-fl-brand"} ${center ? "text-center" : ""}`}>{children}</p>
  );
}

function CtaButton({ children = "Förder-Beratung sichern", className = "" }: { children?: string; className?: string }) {
  return (
    <a href="#anfrage" className={`fl-btn btn-cta ${className}`}>
      <span className="btn-label" data-text={children}>{children}</span>
      <ArrowRight className="fl-btn-arrow" />
    </a>
  );
}

function BoschBadge({ dashed = false }: { dashed?: boolean }) {
  return (
    <span className={`inline-flex shrink-0 flex-col justify-center gap-1 rounded-lg bg-white px-3 py-2 ${dashed ? "border border-dashed border-[#d5d9de]" : "shadow-sm"}`}>
      <Image src="/lp/bosch-wordmark.webp" alt="Bosch" width={976} height={217} className="h-[16px] w-auto" />
      <span className="text-[11px] font-bold leading-none tracking-[0.01em] text-[#00739a]">Premium Partner</span>
    </span>
  );
}

export default function FoerderLandingPage() {
  return (
    <main id="top" className="fl-page w-full overflow-x-clip bg-white">
      {/* Vor dem ersten Paint: Reveal-Startzustände nur mit JS & ohne reduced motion */}
      <script
        dangerouslySetInnerHTML={{
          __html:
            "(function(){try{var d=document.documentElement;if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;d.classList.add('fl-js');setTimeout(function(){if(!d.classList.contains('fl-ready'))d.classList.remove('fl-js')},4000)}catch(e){}})();",
        }}
      />
      <Motion />
      <StickyBar />

      {/* ─────────────────────────── 01 HERO ─────────────────────────── */}
      <section data-hero className="relative isolate overflow-hidden bg-fl-navy text-white">
        <div className="absolute inset-0 -z-10">
          {/* Desktop: ganzes Motiv · Mobile/Tablet: 4:5-Ausschnitt um die Wärmepumpe, nur im oberen Bereich */}
          <div data-hero-bg className="absolute inset-x-0 top-0 h-[min(100%,820px)] will-change-transform lg:inset-0 lg:h-full">
            <picture>
              <source media="(max-width: 1023px)" srcSet="/lp/hero/hero-mobile.webp" />
              <img
                src="/lp/hero/hero-2000.webp"
                srcSet="/lp/hero/hero-1200.webp 1200w, /lp/hero/hero-2000.webp 2000w"
                sizes="100vw"
                alt=""
                fetchPriority="high"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover object-[50%_35%] lg:object-[45%_60%]"
              />
            </picture>
          </div>
          {/* Overlays exakt aus Figma (Dev Mode) */}
          <div className="fl-hero-overlay absolute inset-0" />
        </div>

        <div className="fl-container">
          {/* Kopfzeile */}
          <div data-hero-item className="flex items-center justify-between gap-4 pt-4 lg:pt-9">
            <Link href="/" aria-label="NOUH-WEHRES Startseite" className="shrink-0 transition-opacity hover:opacity-85">
              <Image src="/logo-white.png" alt="NOUH-WEHRES – Heizung · Sanitär · Wärmepumpen · Sanierung" width={466} height={90} priority className="h-9 w-auto sm:h-11" />
            </Link>
            <div className="flex items-center gap-6">
              <a href={PHONE_HREF} className="group hidden text-right sm:block">
                <span className="block text-[12px] text-white/65">Direkt anrufen</span>
                <span className="block text-[17px] font-bold tracking-tight transition-colors group-hover:text-fl-yellow">{PHONE}</span>
              </a>
              <a href={PHONE_HREF} aria-label={`Anrufen: ${PHONE}`} className="grid h-11 w-11 place-items-center rounded-full bg-white/10 ring-1 ring-white/20 transition hover:bg-white/20 sm:hidden">
                <Phone size={18} />
              </a>
              <CtaButton className="!hidden lg:!inline-flex" />
            </div>
          </div>

          <div className="mt-7 grid grid-cols-[minmax(0,1fr)] items-center gap-7 pb-10 lg:mt-[72px] lg:grid-cols-[minmax(0,1fr)_440px] lg:gap-14 lg:pb-24 xl:grid-cols-[minmax(0,1fr)_460px]">
            <div>
              <div data-hero-item className="flex flex-wrap items-center gap-2.5">
                <BoschBadge />
                <span className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2.5 text-[14px] font-medium ring-1 ring-white/20 backdrop-blur-md">
                  <CheckDot size={18} /> Meisterbetrieb aus Willich
                </span>
              </div>
              <h1 data-hero-item className="fl-h1 mt-7">
                Bis zu <span className="text-fl-yellow">70</span>&nbsp;% Förderung für Ihre neue Heizung.
              </h1>
              <p data-hero-item className="mt-6 max-w-[470px] text-[17px] leading-relaxed text-white/80 sm:text-[19px]">
                Wärmepumpe &amp; Heizung vom Meisterbetrieb aus Willich &amp; Umgebung – alles aus einer Hand.
              </p>
              <ul data-hero-item className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-[15px] font-semibold">
                {["Bosch-Qualität", "Förderantrag inklusive", "Festpreis"].map((t) => (
                  <li key={t} className="flex items-center gap-2"><CheckDot size={18} />{t}</li>
                ))}
              </ul>
            </div>

            <div id="anfrage" data-hero-card className="scroll-mt-24">
              <LeadForm className="shadow-[0_30px_80px_-20px_rgba(0,0,0,0.55)]" />
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────── 02 TRUST BAR ─────────────────────── */}
      <section aria-label="Darum NOUH-WEHRES" className="border-b border-[#E3E5E8] bg-white">
        <div className="fl-container">
          <ul data-stagger="0.07" className="grid grid-cols-2 gap-x-4 gap-y-6 py-8 lg:flex lg:items-center lg:justify-between lg:gap-0 lg:py-9">
            <TrustItem icon={<Star size={18} />} tone="bg-[#FFF4CC] text-[#E0A800]" title="Meisterbetrieb" sub="Handwerkskammer-geprüft" first />
            <TrustItem
              icon={<GoogleG />}
              tone="bg-white ring-1 ring-[#E3E5E8] shadow-sm"
              title={<><span className="tracking-[0.06em] text-fl-yellow-deep">★★★★★</span> Google</>}
              sub="Ø 4,4 aus 25 Bewertungen"
            />
            <TrustItem icon={<Clock size={18} />} tone="bg-fl-brand-50 text-fl-brand" title="29 Jahre Erfahrung" sub="Familienbetrieb mit Handschlag" />
            <TrustItem icon={<Pin size={18} />} tone="bg-[#FDECEC] text-[#B42318]" title="Willich & Umgebung" sub="ca. 25 km Einsatzradius" last />
          </ul>
        </div>
      </section>

      {/* ─────────────────────────── 03 PROBLEM ───────────────────────── */}
      {/* Figma: Desktop 128px/120px, Gap 96, Bild 560×520 r24 · Mobile 72px/16px, Kopf → Bild → Liste */}
      <section className="bg-fl-navy py-[72px] text-white lg:py-32">
        <div className="fl-container grid items-center gap-y-6 lg:grid-cols-[560px_minmax(0,1fr)] lg:gap-x-24 lg:gap-y-0">
          <div className="lg:col-start-2 lg:row-start-1 lg:self-end">
            <div data-reveal="up"><Eyebrow tone="yellow">Das Problem</Eyebrow></div>
            <h2 data-reveal="up" data-delay="0.05" className="fl-h2-xl mt-4">Noch Gas oder Öl?</h2>
            <p data-reveal="up" data-delay="0.1" className="mt-4 text-[22px] font-semibold leading-snug text-white/55 sm:text-[28px]">
              Steigende Kosten, strengere Vorgaben.
            </p>
          </div>
          <div data-reveal="left" className="fl-img-frame aspect-[560/520] rounded-[24px] lg:col-start-1 lg:row-span-2 lg:row-start-1">
            <div data-parallax="0.14" className="absolute inset-[-8%_0]">
              <Image src="/lp/problem-heizkessel.webp" alt="Alter Öl-Heizkessel mit Warmwasserspeicher im Keller" fill sizes="(min-width:1024px) 560px, 100vw" className="object-cover object-[58%_center]" />
            </div>
          </div>
          <div className="lg:col-start-2 lg:row-start-2 lg:self-start">
            <ul data-stagger="0.1" className="space-y-4 lg:mt-8">
              {[
                <>CO<sub className="text-[0.7em]">2</sub>-Preis steigt – Gas und Öl werden Jahr für Jahr teurer.</>,
                "Neue Heizungen müssen strengere gesetzliche Vorgaben erfüllen.",
                "Alte Anlagen: häufige Reparaturen, hoher Verbrauch.",
              ].map((t, i) => (
                <li key={i} className="flex items-start gap-3.5 text-[16px] leading-snug text-white/90 sm:text-[17px]">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#E5484D]/20 text-[13px] font-extrabold text-[#FF6B70]">!</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            <p data-reveal="up" className="mt-8 rounded-xl border border-white/10 bg-white/[0.05] px-5 py-4 text-[16px] font-semibold leading-snug transition-colors duration-300 hover:border-fl-yellow/40">
              Die gute Nachricht: Der Umstieg wird jetzt mit <span className="text-fl-yellow">bis zu 70 % gefördert</span>.
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────────────────── 04 LÖSUNG ────────────────────────── */}
      {/* Figma: Desktop 136px/120px, Gap 96, Bild 560×640 r28 · Mobile 72px/16px, Kopf → Bild → Liste */}
      <section className="bg-white py-[72px] lg:py-[136px]">
        <div className="fl-container grid items-center gap-y-6 lg:grid-cols-[minmax(0,1fr)_560px] lg:gap-x-24 lg:gap-y-0">
          <div className="lg:col-start-1 lg:row-start-1 lg:self-end">
            <div data-reveal="up"><Eyebrow>Die Lösung</Eyebrow></div>
            <h2 data-reveal="up" data-delay="0.05" className="fl-h2 mt-4 lg:max-w-[515px]">Ihre neue Wärmepumpe – alles aus einer Hand.</h2>
            <p data-reveal="up" data-delay="0.1" className="mt-5 max-w-[460px] text-[16px] leading-relaxed text-fl-muted sm:text-[17px]">
              Von der ersten Beratung bis zur fertigen Anlage: ein Ansprechpartner, ein Festpreis, ein Meisterbetrieb aus Ihrer Region.
            </p>
          </div>
          <div data-reveal="right" className="relative mb-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mb-0">
            <div className="fl-img-frame aspect-[560/640] rounded-[28px]">
              <AutoSlider
                sizes="(min-width:1024px) 560px, 100vw"
                slides={[
                  { src: "/lp/waermepumpe-aussen-1.jpg", alt: "Bosch Wärmepumpe vor der Hauswand – von NOUH-WEHRES montiert" },
                  { src: "/lp/waermepumpe-aussen-3.jpg", alt: "Wärmepumpe auf Betonfundament mit Kondensatablauf" },
                  { src: "/lp/waermepumpe-aussen-2.jpg", alt: "Bosch Wärmepumpe mit gedämmter Leitungsführung ins Haus" },
                  { src: "/lp/waermepumpe-aussen-4.jpg", alt: "Rückseite der Wärmepumpe mit Anschlüssen und Fundament" },
                ]}
              />
            </div>
            <div className="fl-float absolute -bottom-5 left-4 flex items-center gap-3.5 rounded-[18px] bg-white py-[18px] pl-5 pr-6 shadow-[0_20px_40px_-8px_rgba(0,0,0,0.16)] lg:bottom-12 lg:left-[-36px]">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-fl-yellow text-fl-navy"><DocCheck /></span>
              <span>
                <span className="block text-[14px] font-bold text-fl-ink">Förder-Papierkram?</span>
                <span className="block text-[13px] text-fl-muted">Übernehmen wir für Sie.</span>
              </span>
            </div>
          </div>
          <div className="lg:col-start-1 lg:row-start-2 lg:self-start">
            <ul data-stagger="0.08" className="space-y-3.5 lg:mt-7">
              {["Beratung & Förderung aus einer Hand", "Bosch-Qualität", "Bis zu 70 % gefördert", "Festpreis – ohne Überraschungen", "Meisterbetrieb aus der Region"].map((t) => (
                <li key={t} className="group flex items-center gap-3 text-[16px] font-medium text-fl-ink">
                  <span className="transition-transform duration-300 group-hover:scale-110"><CheckDot tone="brand" size={22} /></span>
                  {t}
                </li>
              ))}
            </ul>
            <div data-reveal="up" className="mt-9"><CtaButton /></div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────── 05 FÖRDERUNG ─────────────────────── */}
      <section className="bg-fl-beige py-[72px] lg:py-[136px]">
        <div className="fl-container">
          <div data-reveal="up"><Eyebrow center>Förderung einfach erklärt</Eyebrow></div>
          <h2 data-reveal="up" data-delay="0.05" className="fl-h2 mx-auto mt-4 max-w-[760px] text-center">
            Der Staat zahlt bis zu 70&nbsp;%<br className="max-sm:hidden" /> Ihrer neuen Heizung.
          </h2>

          <div className="mx-auto mt-10 grid grid-cols-[minmax(0,1fr)] gap-4 lg:mt-16 lg:grid-cols-2 lg:gap-5">
            <div data-reveal="scale" className="fl-hover-lift relative overflow-hidden rounded-[22px] bg-[linear-gradient(135deg,#0B1622_0%,#06324A_60%,#03506F_100%)] p-8 text-white sm:p-10">
              <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-fl-brand/25 blur-3xl" aria-hidden />
              <p className="text-[22px] font-semibold text-white/80 sm:text-[26px]">bis zu</p>
              <p className="mt-1 font-extrabold leading-[0.9] tracking-[-0.05em] text-fl-yellow" style={{ fontSize: "clamp(96px, 18vw, 168px)" }}>
                <span data-count="70">70</span>&nbsp;%
              </p>
              <p className="mt-6 max-w-[360px] text-[15px] leading-relaxed text-white/80 sm:text-[16px]">
                Zuschuss über die KfW-Heizungsförderung (Programm 458) – direkt aufs Konto, nicht als Kredit.
              </p>
            </div>
            <div data-stagger="0.12" className="grid min-w-0 grid-cols-[minmax(0,1fr)] gap-4">
              <FoerderRow badge="30 %" badgeTone="bg-fl-brand-50 text-fl-brand" title="Grundförderung" text="Für jeden Eigentümer beim Tausch auf eine Wärmepumpe." />
              <FoerderRow badge="+ Boni" badgeTone="bg-[#FFF4CC] text-[#7A5B00]" title="Klima- & Einkommensbonus" text="Z. B. für den Austausch alter Gas- oder Ölheizungen und abhängig vom Haushaltseinkommen." />
              <FoerderRow badge="0 €" badgeTone="bg-[#EEF0F2] text-fl-ink" title="Aufwand für Sie" text="„Wir übernehmen den Förder-Papierkram.“ Antrag, Nachweise, Abwicklung – alles dabei." />
            </div>
          </div>
          <p data-reveal="fade" className="mx-auto mt-10 max-w-[620px] text-center text-[12.5px] leading-relaxed text-fl-silver">
            Die Förderhöhe hängt u. a. vom Haushaltseinkommen und vom Alter der Altanlage ab. Antrag vor Auftragsvergabe. Stand: KfW 458, November 2026.
          </p>
        </div>
      </section>

      {/* ─────────────────────────── 06 ABLAUF ────────────────────────── */}
      <section className="bg-white py-[72px] lg:py-[136px]">
        <div className="fl-container">
          <div data-reveal="up"><Eyebrow center>So einfach geht’s</Eyebrow></div>
          <h2 data-reveal="up" data-delay="0.05" className="fl-h2 mt-4 text-center">In 3 Schritten zur neuen Heizung.</h2>
          <ol data-stagger="0.14" className="mx-auto mt-10 grid gap-4 md:grid-cols-3 lg:mt-16">
            <Step n="01" title="Anfrage senden" text="Kurzes Formular ausfüllen – dauert keine Minute." />
            <Step n="02" title="Kostenlose Beratung & Förder-Check" text="Wir prüfen Ihr Haus und Ihre Förderung persönlich vor Ort." />
            <Step n="03" title="Einbau vom Meisterbetrieb" text="Montage, Inbetriebnahme und Übergabe – alles aus einer Hand." dark />
          </ol>
          <div data-reveal="up" className="mt-12 flex justify-center"><CtaButton /></div>
        </div>
      </section>

      {/* ─────────────────────────── 07 REFERENZEN ────────────────────── */}
      <section className="bg-fl-beige py-[72px] lg:py-[136px]">
        <div className="fl-container">
          <div data-reveal="up"><Eyebrow center>Referenzen</Eyebrow></div>
          <h2 data-reveal="up" data-delay="0.05" className="fl-h2 mx-auto mt-4 max-w-[520px] text-center">Echte Projekte aus Willich &amp; Umgebung.</h2>

          <div data-reveal="up" className="mx-auto mt-10 lg:mt-14">
            <SnapDots count={projects.length} label="Projektbilder" className="fl-snap--imgs lg:grid lg:grid-cols-3 lg:gap-6">
              {projects.map((p) => (
                <figure key={p.src} className="fl-img-frame group aspect-[4/4.4] rounded-[24px] lg:aspect-auto lg:h-[420px]">
                  {p.slides ? (
                    <AutoSlider slides={p.slides} interval={p.interval ?? 4000} sizes="(min-width:1024px) 390px, 75vw" />
                  ) : (
                    <Image src={p.src} alt={p.alt} fill sizes="(min-width:1024px) 390px, 75vw" className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.06]" />
                  )}
                </figure>
              ))}
            </SnapDots>
          </div>

          <div data-reveal="up" className="mx-auto mt-5">
            <SnapDots count={reviews.length} label="Kundenbewertungen" className="fl-snap--cards lg:grid lg:grid-cols-3 lg:gap-4">
              {reviews.map((r) => (
                <blockquote key={r.name} className="fl-hover-lift flex flex-col rounded-2xl bg-white p-6 ring-1 ring-black/[0.04]">
                  <div className="flex text-fl-yellow-deep" aria-label="5 von 5 Sternen">
                    {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={15} />)}
                  </div>
                  <p className="mt-3.5 flex-1 text-[14.5px] leading-relaxed text-fl-ink">„{r.text}“</p>
                  <footer className="mt-5 flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-fl-brand-50 text-[13px] font-bold text-fl-brand">
                      {r.name.split(" ").map((s) => s[0]).join("").slice(0, 2)}
                    </span>
                    <span>
                      <cite className="block text-[14px] font-bold not-italic text-fl-ink">{r.name}</cite>
                      <span className="block text-[12.5px] text-fl-muted">{r.city} · via Google</span>
                    </span>
                  </footer>
                </blockquote>
              ))}
            </SnapDots>
          </div>

          <div data-reveal="up" className="mx-auto mt-5 flex flex-col items-start gap-4 rounded-2xl bg-white p-4 ring-1 ring-black/[0.04] sm:flex-row sm:items-center sm:gap-5 sm:px-5">
            <BoschBadge dashed />
            <p className="text-[14.5px] font-medium leading-snug text-fl-ink">
              Offizieller Bosch-Partner: geprüfte Qualität, Original-Ersatzteile und Service direkt aus der Region.
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────────────────── 08 FORMULAR ──────────────────────── */}
      <section className="relative isolate overflow-hidden bg-fl-navy py-[72px] text-white lg:py-32">
        <div className="absolute inset-0 -z-10">
          <div data-parallax="0.18" className="absolute inset-[-10%_0]">
            {/* Gleiches Motiv wie der Hero */}
            <picture>
              <source media="(max-width: 1023px)" srcSet="/lp/hero/hero-mobile.webp" />
              <img src="/lp/hero/hero-2000.webp" srcSet="/lp/hero/hero-1200.webp 1200w, /lp/hero/hero-2000.webp 2000w" sizes="100vw" alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover object-center" />
            </picture>
          </div>
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,18,26,0.96)_0%,rgba(10,18,26,0.85)_55%,rgba(10,18,26,0.55)_100%)] max-lg:bg-[linear-gradient(180deg,rgba(10,18,26,0.82)_0%,rgba(10,18,26,0.9)_40%,rgba(10,18,26,0.97)_100%)]" />
        </div>
        <div className="fl-container grid grid-cols-[minmax(0,1fr)] items-center gap-6 lg:grid-cols-[minmax(0,1fr)_440px] lg:gap-24 xl:grid-cols-[minmax(0,1fr)_460px]">
          <div>
            <div data-reveal="up"><Eyebrow tone="yellow">Jetzt anfragen</Eyebrow></div>
            <h2 data-reveal="up" data-delay="0.05" className="fl-h2 mt-4 !text-white lg:max-w-[480px]">Sichern Sie sich Ihre kostenlose Förder-Beratung.</h2>
            <p data-reveal="up" data-delay="0.1" className="mt-5 max-w-[440px] text-[16px] leading-relaxed text-white/75 sm:text-[17px]">
              Nur begrenzte Beratungstermine diesen Monat – je früher Sie anfragen, desto schneller steht Ihr Förder-Check.
            </p>
            <ul data-stagger="0.08" className="mt-7 space-y-3">
              {["Bis zu 70 % Förderung", "Festpreis vom Meisterbetrieb", "Bosch-Qualität aus einer Hand"].map((t) => (
                <li key={t} className="flex items-center gap-3 text-[16px] font-semibold"><CheckDot size={20} />{t}</li>
              ))}
            </ul>
            <a data-reveal="up" href={PHONE_HREF} className="group mt-9 inline-flex items-center gap-4">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-white/10 ring-1 ring-white/15 transition duration-300 group-hover:bg-fl-yellow group-hover:text-fl-navy group-hover:ring-fl-yellow">
                <Phone size={18} />
              </span>
              <span>
                <span className="block text-[13px] text-white/60">Lieber direkt sprechen?</span>
                <span className="block text-[20px] font-bold tracking-tight transition-colors group-hover:text-fl-yellow">{PHONE}</span>
              </span>
            </a>
          </div>
          <div data-reveal="right">
            <LeadForm className="shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]" />
          </div>
        </div>
      </section>

      {/* ─────────────────────────── 09 FAQ ───────────────────────────── */}
      <section className="bg-white py-[72px] lg:py-[136px]">
        <div className="fl-container grid gap-6 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-24">
          <div>
            <div data-reveal="up"><Eyebrow>FAQ</Eyebrow></div>
            <h2 data-reveal="up" data-delay="0.05" className="fl-h2 mt-4">Häufige Fragen.</h2>
            <p data-reveal="up" data-delay="0.1" className="mt-5 text-[16px] leading-relaxed text-fl-muted">
              Ihre Frage ist nicht dabei? Rufen Sie uns an:{" "}
              <a href={PHONE_HREF} className="whitespace-nowrap font-semibold text-fl-ink underline decoration-fl-line underline-offset-4 transition-colors hover:text-fl-brand hover:decoration-fl-brand">{PHONE}</a>
            </p>
          </div>
          <Faq items={faqs} />
        </div>
      </section>

      {/* ─────────────────────────── 10 FOOTER ────────────────────────── */}
      <footer className="bg-[#0B0B0B] pb-24 pt-10 text-white md:py-12">
        <div className="fl-container flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <Link href="/" aria-label="NOUH-WEHRES Startseite" className="transition-opacity hover:opacity-80">
            <Image src="/logo-white.png" alt="NOUH-WEHRES" width={466} height={90} className="h-10 w-auto" />
          </Link>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-[15px]">
            <span className="text-white/55 max-sm:w-full">© {new Date().getFullYear()} Nouh-Wehres GmbH</span>
            <Link href="/impressum" className="fl-link font-semibold">Impressum</Link>
            <Link href="/datenschutz" className="fl-link font-semibold">Datenschutz</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}

/** Offizielles mehrfarbiges Google-„G“ (für den Bewertungs-Hinweis). */
function GoogleG({ size = 22 }: { size?: number }) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} aria-label="Google" role="img">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.4-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
    </svg>
  );
}

function TrustItem({ icon, tone, title, sub, first = false, last = false }: { icon: React.ReactNode; tone: string; title: React.ReactNode; sub: string; first?: boolean; last?: boolean }) {
  return (
    <li className={`group flex min-w-0 items-center gap-3 lg:flex-1 lg:justify-center lg:px-5 ${first ? "lg:justify-start lg:pl-0" : ""} ${last ? "lg:justify-end lg:pr-0" : "lg:border-r lg:border-fl-line"}`}>
      <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl transition-transform duration-500 ease-[cubic-bezier(.34,1.56,.64,1)] group-hover:-translate-y-1 group-hover:rotate-[-6deg] ${tone}`}>
        {icon}
      </span>
      <span className="min-w-0 lg:whitespace-nowrap">
        <span className="block text-[15px] font-bold leading-tight text-fl-ink sm:text-[17px] lg:text-[16px] xl:text-[17px]">{title}</span>
        <span className="mt-0.5 block text-[12.5px] leading-snug text-fl-muted sm:text-[13.5px] lg:text-[12.5px] xl:text-[13.5px]">{sub}</span>
      </span>
    </li>
  );
}

function FoerderRow({ badge, badgeTone, title, text }: { badge: string; badgeTone: string; title: string; text: string }) {
  return (
    <div className="fl-hover-lift group flex min-w-0 items-center gap-3.5 rounded-[18px] bg-white p-4 ring-1 ring-black/[0.04] sm:gap-5 sm:p-6">
      <span className={`grid h-14 w-16 shrink-0 place-items-center rounded-xl text-[16px] font-extrabold tracking-tight transition-transform duration-500 group-hover:scale-105 sm:h-16 sm:w-20 sm:text-[19px] ${badgeTone}`}>
        {badge}
      </span>
      <span className="min-w-0 hyphens-auto break-words" lang="de">
        <span className="block text-[16px] font-bold text-fl-ink sm:text-[17px]">{title}</span>
        <span className="mt-1 block text-[14px] leading-relaxed text-fl-muted">{text}</span>
      </span>
    </div>
  );
}

function Step({ n, title, text, dark = false }: { n: string; title: string; text: string; dark?: boolean }) {
  return (
    <li className={`fl-hover-lift group relative flex min-h-[230px] flex-col rounded-[20px] p-6 sm:p-7 ${dark ? "bg-fl-navy text-white" : "bg-fl-beige text-fl-ink"}`}>
      <div className="flex items-center justify-between">
        <span className={`grid h-11 w-11 place-items-center rounded-xl text-[15px] font-extrabold ${dark ? "bg-fl-yellow text-fl-ink" : "bg-fl-brand text-white"}`}>{n}</span>
        {!dark && (
          <ArrowRight size={18} className="text-fl-silver transition-all duration-500 group-hover:translate-x-1.5 group-hover:text-fl-brand max-md:rotate-90 max-md:group-hover:translate-x-0" />
        )}
      </div>
      <h3 className="mt-auto pt-10 text-[19px] font-bold leading-snug sm:text-[20px]">{title}</h3>
      <p className={`mt-2.5 text-[14.5px] leading-relaxed ${dark ? "text-white/70" : "text-fl-muted"}`}>{text}</p>
    </li>
  );
}
