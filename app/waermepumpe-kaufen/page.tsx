import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import GsapReveal from "../components/GsapReveal";
import LandingHero from "../components/landing/LandingHero";
import {
  StatsRow,
  PartnerLogos,
  ProductPrice,
  TwoImage,
  BenefitCards,
  StepsRow,
  DarkSavings,
  Team,
  CompareTable,
  Testimonials,
  FaqSection,
  QualifyCta,
  CtaBanner,
} from "../components/landing/wp/parts";
import type { WizardStep } from "../lib/landing";

export const metadata: Metadata = {
  title:
    "Wärmepumpe inkl. Montage ab 11.900 € — NOUH-WEHRES | Festpreis in Willich",
  description:
    "Bosch Compress Wärmepumpe inkl. Planung, Speicher, Elektrik, Montage & Inbetriebnahme zum Festpreis ab 11.900 € nach Förderung. Ohne Anzahlung, 10 Jahre Garantie. Jetzt Festpreis-Angebot anfordern.",
};

const wizardSteps: WizardStep[] = [
  {
    kind: "choice",
    question: "Wie groß ist Ihre Wohnfläche?",
    options: ["bis 120 m²", "120–160 m²", "160–250 m²", "über 250 m²"],
  },
  {
    kind: "choice",
    question: "Welche Heizung nutzen Sie aktuell?",
    options: ["Gasheizung", "Ölheizung", "Nachtspeicher / Strom", "Sonstige"],
  },
  {
    kind: "choice",
    question: "Um welches Gebäude handelt es sich?",
    options: ["Einfamilienhaus", "Zweifamilienhaus", "Mehrfamilienhaus", "Gewerbe"],
  },
  {
    kind: "choice",
    question: "Wann möchten Sie starten?",
    options: ["So schnell wie möglich", "In 1–3 Monaten", "In 3–6 Monaten", "Nur informieren"],
  },
  { kind: "contact", question: "Wohin dürfen wir Ihr Festpreis-Angebot senden?" },
];

const compareRows: { label: string; other: "no" | "partial"; otherNote?: string }[] = [
  { label: "Wärmepumpe & Speicher inklusive", other: "no", otherNote: "Aufpreis" },
  { label: "Demontage & Entsorgung der Altanlage", other: "no", otherNote: "extra" },
  { label: "Elektroinstallation & Zählerschrank-Check", other: "no", otherNote: "extra" },
  { label: "Inbetriebnahme & Einweisung inklusive", other: "partial", otherNote: "teilweise" },
  { label: "Festpreis ohne Nachforderung", other: "no", otherNote: "Nachträge" },
  { label: "Wartung & 24/7 Notdienst verfügbar", other: "no", otherNote: "Aufpreis" },
];

export default function WaermepumpeKaufen() {
  return (
    <>
      <GsapReveal />
      <Header minimal />
      <main className="flex-1">
        <LandingHero
          eyebrow="Meisterbetrieb · Willich · Viersen · Krefeld · Mönchengladbach · Düsseldorf"
          h1="Wärmepumpe inkl. Montage ab 11.900 € nach Förderung."
          intro="Bosch Compress Wärmepumpe, Planung, Speicher, Elektrik, Montage und Inbetriebnahme zum Komplettpreis. Ohne Anzahlung und mit 10 Jahren Garantie. Seit 29 Jahren Meisterbetrieb aus der Region."
          checks={["Bis zu 70 % Förderung", "Ohne Anzahlung", "10 Jahre Garantie"]}
          badge={{ small: "Angebot in", big: "24 Std." }}
          bgImage="/lp/referenz-haus.webp"
          bgImageAlt="Einfamilienhaus mit moderner Wärmepumpe"
          wizard={{
            name: "Ihr kostenloses Festpreis-Angebot",
            topic: "Wärmepumpe · Kaufen",
            steps: wizardSteps,
            note: "dauert nur 30 Sekunden",
          }}
        />

        <StatsRow
          stats={[
            { value: "ab 11.900 €", label: "Preis nach Förderung" },
            { value: "bis 70 %", label: "staatliche Förderung" },
            { value: "10 Jahre", label: "Garantie auf die Anlage" },
            { value: "0 €", label: "Anzahlung" },
          ]}
        />

        <PartnerLogos />

        <ProductPrice
          eyebrow="Ihr Komplettpaket"
          title="Bosch Compress Wärmepumpe – installiert zum Festpreis."
          body="Wir liefern und installieren die Luft-Wasser-Wärmepumpe Bosch Compress 5800 AW – effizient, leise und mit natürlichem Kältemittel. Ausgelegt auf Ihr Gebäude, nicht auf einen Katalogpreis."
          image="/lp/bosch-compress.webp"
          imageAlt="Bosch Compress Luft-Wasser-Wärmepumpe – Außeneinheit"
          price="ab 11.900 €"
          priceNote="nach bis zu 70 % Förderung"
          priceSub="Gilt im Alt- und Neubau. Endpreis nach kostenlosem Vor-Ort-Check."
          bullets={[
            "10 kW Nennleistung – auch für Altbau ausgelegt",
            "Flüsterleiser Betrieb ab 34 dB",
            "Natürliches Kältemittel Propan (R290)",
          ]}
        />

        <TwoImage
          eyebrow="Lieferumfang"
          title="Vom Aufstellort bis zur Inbetriebnahme – alles inklusive."
          body="Außen die Wärmepumpe, innen Speicher, Hydraulik und Regelung: sauber installiert, angeschlossen und dokumentiert."
          items={[
            {
              image: "/lp/team-technikraum.jpg",
              imageAlt: "Das NOUH-WEHRES Montageteam im Technikraum vor der eingebauten Anlage",
              title: "Innenaufstellung & Hydraulik",
              text: "Puffer- und Warmwasserspeicher, hydraulischer Abgleich und Regelung – fachgerecht installiert und dokumentiert.",
            },
            {
              images: [
                "/lp/waermepumpe-aussen-1.jpg",
                "/lp/waermepumpe-aussen-2.jpg",
                "/lp/waermepumpe-aussen-3.jpg",
                "/lp/waermepumpe-aussen-4.jpg",
              ],
              imageAlt: "Bosch Compress Außeneinheit fachgerecht installiert bei Kunden vor Ort",
              title: "Montage durch eigene Monteure",
              text: "Keine Subunternehmer. Unser Team baut ein, nimmt in Betrieb und weist Sie persönlich ein.",
            },
          ]}
        />

        <BenefitCards
          eyebrow="Im Festpreis enthalten"
          title="Was in Ihrem Komplettpaket alles drin ist."
          intro="Ein Preis, ein Ansprechpartner, alles fixiert – Sie kaufen keine Einzelleistungen, sondern eine fertig laufende Heizung."
          items={[
            {
              icon: "thermometer",
              title: "Wärmepumpe & Speicher",
              text: "Luft-Wasser-Wärmepumpe von Bosch inklusive Warmwasser- und Pufferspeicher sowie erforderlicher Regelung.",
            },
            {
              icon: "zap",
              title: "Montage & Elektrik",
              text: "Demontage der Altanlage, hydraulischer Anschluss, Elektroinstallation, Inbetriebnahme und Einweisung – durch unser eigenes Team.",
            },
            {
              icon: "percent",
              title: "Förderung & Anträge",
              text: "Wir prüfen Ihre Förderfähigkeit, stellen die Anträge bei KfW und BAFA und ziehen den Zuschuss direkt vom Festpreis ab.",
            },
            {
              icon: "shield",
              title: "Garantie & Wartung",
              text: "10 Jahre Garantie auf die Anlage. Wartungsvertrag ab 12 € im Monat und 24/7 Notdienst nach der Montage.",
            },
          ]}
        />

        <StepsRow
          eyebrow="So einfach geht es"
          title="In 4 Schritten zu Ihrem Festpreis-Angebot."
          items={[
            {
              title: "Angebot anfordern",
              text: "Unverbindlich und kostenlos in 2 Minuten – ein paar Angaben zu Ihrem Gebäude genügen.",
            },
            {
              title: "Heizlast & Vor-Ort-Check",
              text: "Wir prüfen Ihr Gebäude und berechnen die passende Wärmepumpe für Sie.",
            },
            {
              title: "Festpreis & Förderung",
              text: "Sie erhalten Ihren verbindlichen Komplettpreis inklusive kompletter Förderabwicklung.",
            },
            {
              title: "Montage in wenigen Tagen",
              text: "Einbau durch unser eigenes Team, meist in 2–3 Tagen inklusive Inbetriebnahme.",
            },
          ]}
        />

        <DarkSavings
          eyebrow="Ihre Ersparnis"
          title="Bis zu 45 % weniger Heizkosten – ab dem ersten Winter."
          body="Eine Wärmepumpe arbeitet um ein Vielfaches effizienter als Öl oder Gas. Zusammen mit der Förderung und – auf Wunsch – eigener Photovoltaik senken Sie Ihre Energiekosten dauerhaft."
          stats={[
            { value: "bis 45 %", label: "weniger Heizkosten" },
            { value: "bis 70 %", label: "staatliche Förderung" },
            { value: "20.000 €", label: "Ersparnis über die Lebensdauer" },
          ]}
          image="/lp/ersparnis-winter.webp"
          imageAlt="Familie genießt im Winter ein warmes Zuhause dank effizienter Wärmepumpe"
        />

        <Team
          eyebrow="Unser Team"
          title="Das Team hinter Ihrem Festpreis."
          intro="Kein Callcenter, keine Subunternehmer. Ihr Ansprechpartner sitzt in der Region – von der Planung über die Montage bis zur Wartung."
          members={[
            { photo: "/nouh-wehres.webp", name: "Guido Krüger", role: "Kundendienst Monteur", focus: "center" },
            { photo: "/team-blau-monteur.jpg", name: "Maximilian Eid", role: "Geselle", focus: "center top" },
            { photo: "/team-blau-meister.jpg", name: "Jürgen Wehres", role: "SHK Meister", focus: "center top" },
          ]}
        />

        <CompareTable
          eyebrow="Festpreis-Vergleich"
          title="Was im Festpreis steckt – und was andere extra berechnen."
          otherLabel="Vergleichbare Anbieter"
          rows={compareRows}
        />

        <Testimonials
          eyebrow="Kundenstimmen"
          title="Das sagen Kunden, die bei uns gekauft haben."
          items={[
            {
              text: "Der Festpreis stand vorab und wurde exakt eingehalten. Keine Nachforderungen, sauberer Einbau – genau so soll es sein.",
              author: "Herr T. aus Willich",
              tag: "Festpreis",
            },
            {
              text: "Wir haben drei Angebote verglichen. Nouh-Wehres war nicht das billigste, aber das beste Gesamtpaket – alles klar geregelt.",
              author: "Familie B. aus Viersen",
            },
            {
              text: "Komplette Förderung, sauberer Einbau, alles aus einer Hand. Von der Anfrage bis zum Betrieb rundum entspannt.",
              author: "Frau L. aus Krefeld",
            },
          ]}
        />

        <FaqSection
          eyebrow="Häufige Fragen"
          title="Ihre Fragen zum Kauf – klar beantwortet."
          items={[
            {
              q: "Was kostet eine Wärmepumpe inklusive Montage?",
              a: "Die Bosch Compress 5800 AW gibt es bei uns als Komplettpaket ab 11.900 € nach Abzug der Förderung – inklusive Speicher, Hydraulik, Elektrik, Montage und Inbetriebnahme. Den Endpreis nennen wir Ihnen nach dem kostenlosen Vor-Ort-Check.",
            },
            {
              q: "Wie viel Förderung bekomme ich – und wie stelle ich den Antrag?",
              a: "Je nach Ausgangslage sind bis zu 70 % Zuschuss möglich. Wir prüfen Ihre Förderfähigkeit, stellen die Anträge bei KfW und BAFA und ziehen die Förderung direkt vom Festpreis ab.",
            },
            {
              q: "Muss ich meine Heizkörper austauschen?",
              a: "In den meisten Fällen nicht. Moderne Wärmepumpen arbeiten auch mit bestehenden Heizkörpern effizient. Beim Vor-Ort-Check sagen wir Ihnen ehrlich, ob Anpassungen sinnvoll sind.",
            },
            {
              q: "Wie lange dauern Lieferung und Montage?",
              a: "Nach Auftrag liefern wir kurzfristig; die eigentliche Montage inklusive Inbetriebnahme ist meist in 2–3 Tagen erledigt.",
            },
          ]}
        />

        <QualifyCta
          eyebrow="1 Minute zum Festpreis"
          title="Jetzt für Ihr kostenloses Festpreis-Angebot qualifizieren."
          body="Wir erstellen Festpreis-Angebote nur dort, wo eine Wärmepumpe wirklich passt – deshalb dieser kurze Check. Beantworten Sie eine Frage und hinterlassen Sie Ihre Kontaktdaten. Wir melden uns innerhalb von 24 Stunden."
          bullets={[
            "Verbindlicher Festpreis ohne Nachforderung",
            "Ohne Anzahlung, 10 Jahre Garantie",
            "Komplette Förderabwicklung inklusive",
          ]}
          image="/lp/team-van.webp"
          imageAlt="Das NOUH-WEHRES Montageteam vor dem Firmenfahrzeug"
          topic="Wärmepumpe · Kaufen (Qualifizierung)"
          submitLabel="Festpreis-Angebot anfordern"
        />

        <CtaBanner
          title="Jetzt Ihr kostenloses Festpreis-Angebot anfordern."
          text="Unverbindlich, kostenlos und mit Festpreisgarantie – Ihr Meisterbetrieb aus der Region meldet sich innerhalb von 24 Stunden."
          button="Festpreis-Angebot anfordern"
          href="/waermepumpe-kaufen#top"
          checks={["Antwort innerhalb von 24 Stunden", "Ohne Anzahlung", "10 Jahre Garantie"]}
        />
      </main>
      <Footer minimal />
    </>
  );
}
