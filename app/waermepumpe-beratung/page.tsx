import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import GsapReveal from "../components/GsapReveal";
import LandingHero from "../components/landing/LandingHero";
import {
  StatsRow,
  FeatureSplit,
  BenefitCards,
  StepsRow,
  TestimonialFeature,
  CompareTable,
  Testimonials,
  Team,
  TrustBadges,
  FaqSection,
  QualifyCta,
  CtaBanner,
} from "../components/landing/wp/parts";
import { COMPARE_ROWS, type WizardStep } from "../lib/landing";

export const metadata: Metadata = {
  title:
    "Wärmepumpe mit Rekord-Förderung — NOUH-WEHRES | Beratung in Willich & Umgebung",
  description:
    "Wärmepumpe vom Meisterbetrieb: bis zu 70 % Förderung, ohne Anzahlung, Komplettpreis inkl. Montage. Ehrliche Beratung, eigenes Team, Festpreisgarantie. Jetzt Wärmepumpen-Check machen.",
};

const wizardSteps: WizardStep[] = [
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
    question: "Wie ist der Sanierungsstand?",
    options: ["Neubau / saniert", "Teilweise saniert", "Unsaniert", "Weiß ich nicht"],
  },
  {
    kind: "choice",
    question: "Wann möchten Sie starten?",
    options: ["So schnell wie möglich", "In 1–3 Monaten", "In 3–6 Monaten", "Nur informieren"],
  },
  { kind: "contact", question: "Wohin dürfen wir Ihr Förder-Ergebnis senden?" },
];

export default function WaermepumpeBeratung() {
  return (
    <>
      <GsapReveal />
      <Header minimal />
      <main className="flex-1">
        <LandingHero
          eyebrow="Meisterbetrieb · Willich · Viersen · Krefeld · Mönchengladbach · Düsseldorf"
          h1="Wärmepumpe jetzt noch mit Rekord-Förderung sichern."
          intro="Bis zu 70 % Förderung, ohne Anzahlung und als Komplettpreis mit eigener Montage. Wir prüfen ehrlich, ob sich eine Wärmepumpe für Ihr Zuhause lohnt – und welche Förderung Ihnen zusteht. Seit 29 Jahren Meisterbetrieb aus der Region."
          checks={["Bis zu 70 % Förderung", "Ohne Anzahlung", "Komplettpreis inkl. Montage"]}
          badge={{ small: "bis zu", big: "70 % Förderung" }}
          wizard={{
            name: "Ihr kostenloser Wärmepumpen-Check",
            topic: "Wärmepumpe · Beratung",
            steps: wizardSteps,
          }}
        />

        <StatsRow
          stats={[
            { value: "29", label: "Jahre Meisterbetrieb" },
            { value: "bis 70 %", label: "staatliche Förderung" },
            { value: "bis 45 %", label: "weniger Heizkosten" },
            { value: "24/7", label: "Notdienst nach Einbau" },
          ]}
        />

        <FeatureSplit
          eyebrow="Ihre neue Heizung"
          title="Die Wärmepumpe vom Meisterbetrieb – zum Festpreis."
          body="Wir planen und installieren moderne Luft-Wasser-Wärmepumpen von Bosch – exakt auf Ihr Gebäude ausgelegt, nicht von der Stange. Über 400 Anlagen haben wir in der Region bereits in Betrieb genommen."
          bullets={[
            "Bis zu 5× effizienter als Öl- und Gasheizungen",
            "Heizkosten um bis zu 45 % senken",
            "Leise im Betrieb – nur 34 dB Schallleistung",
            "Natürliches Kältemittel Propan (R290)",
            "Auch für Bestandsgebäude und bestehende Heizkörper",
          ]}
          image="/lp/wp-aussen.webp"
          imageAlt="Moderne Luft-Wasser-Wärmepumpe von Bosch, installiert an einem Einfamilienhaus"
        />

        <BenefitCards
          eyebrow="Warum jetzt wechseln"
          title="Warum sich die Wärmepumpe jetzt für Sie rechnet."
          intro="Steigende Preise für Öl und Gas, dazu die aktuelle Rekord-Förderung: Wer jetzt umsteigt, sichert sich den doppelten Vorteil – besser wird die Zeit dafür nicht."
          items={[
            {
              icon: "grid",
              title: "Alles aus einer Hand",
              text: "Komplettpaket von uns: Beratung, Planung, Montage, Wartung und Förder-Service. Ein Ansprechpartner statt vieler Gewerke.",
            },
            {
              icon: "thermometer",
              title: "Ideal für Bestand & Altbau",
              text: "Hohe Effizienz auch mit bestehenden Heizkörpern. Wir prüfen, ob Ihr Zuhause geeignet ist – oder mit kleinen Anpassungen geeignet gemacht werden kann.",
            },
            {
              icon: "percent",
              title: "Maximale staatliche Förderung",
              text: "Bis zu 70 % Zuschuss über KfW und BAFA. Wir übernehmen das komplette Antragsverfahren – für Sie ohne Papierkram.",
            },
            {
              icon: "euro",
              title: "Ohne Anzahlung starten",
              text: "Sie zahlen erst nach erfolgreicher Inbetriebnahme. Auf Wunsch mit fairer Finanzierung ab 0 € Anzahlung.",
            },
          ]}
        />

        <StepsRow
          eyebrow="So einfach geht es"
          title="In 4 Schritten zu Ihrer Wärmepumpe – ohne Aufwand für Sie."
          items={[
            {
              title: "Wärmepumpen-Check ausfüllen",
              text: "Unverbindlich in einer Minute: Sie geben nur ein paar Eckdaten zu Haus und Heizung an.",
            },
            {
              title: "Maßgeschneiderte Planung",
              text: "Wir berechnen die Heizlast und legen die Wärmepumpe individuell aus. Ehrliche Beratung – kein Verkaufsdruck.",
            },
            {
              title: "Festpreis-Angebot & Förderung",
              text: "Sie erhalten Ihren Komplettpreis inklusive Förderabwicklung. Den Antrag stellen wir vor dem Kauf.",
            },
            {
              title: "Installation & sofortige Ersparnis",
              text: "Montage durch unser eigenes Team. Fertig – und Sie sparen ab dem ersten Tag.",
            },
          ]}
        />

        <TestimonialFeature
          eyebrow="Kundenbeispiel"
          title="Vom Ölkessel zur Wärmepumpe – in nur drei Tagen."
          image="/lp/referenz-haus.webp"
          imageAlt="Einfamilienhaus in der Region mit neu installierter Wärmepumpe"
          quote="Bemerkenswert war die kurze Zeitspanne von der Beratung bis zur Ausführung. Drei Tage waren für den Austausch eingeplant – am dritten Abend lief die Wärmepumpe. Wir sind froh, uns dafür entschieden zu haben."
          author="Familie S. aus Willich"
          bullets={[
            "Umstellung in nur 3 Tagen",
            "Umbau während laufendem Betrieb",
            "Förderabwicklung komplett übernommen",
            "Wärmepumpe optimal eingestellt",
          ]}
        />

        <CompareTable
          eyebrow="Der Unterschied"
          title="Warum ein Meisterbetrieb aus der Region die bessere Wahl ist."
          otherLabel="Überregionale Anbieter"
          rows={COMPARE_ROWS}
        />

        <Testimonials
          eyebrow="Kundenstimmen"
          title="Das sagen unsere Kunden aus der Region."
          items={[
            {
              text: "Ehrliche Beratung, sauberer Einbau, pünktlich fertig. Man merkt, hier arbeitet ein echter Meisterbetrieb – kein Callcenter.",
              author: "Familie S. aus Willich",
            },
            {
              text: "Von der Förderung bis zur Inbetriebnahme lief alles über ein Team. Wir mussten uns um nichts kümmern.",
              author: "Herr E. aus Viersen",
            },
            {
              text: "Der Ansprechpartner war immer erreichbar, sauber gearbeitet – und die Förderung wurde korrekt über das Team abgewickelt.",
              author: "Frau K. aus Krefeld",
            },
          ]}
        />

        <Team
          eyebrow="Unser Team"
          title="Die Meister, die Ihre Wärmepumpe planen und einbauen."
          intro="Kein Callcenter, keine Subunternehmer. Ihr Ansprechpartner sitzt in der Region – von der Planung über die Montage bis zur Wartung."
          members={[
            { photo: "/nouh-wehres.webp", name: "Nouh Wehres", role: "Geschäftsführer & Meister", focus: "center" },
            { photo: "/team-3.webp", name: "Heizung & Wärmepumpe", role: "Monteur · Willich", focus: "center top" },
            { photo: "/team-2.webp", name: "Sanitär & Kundendienst", role: "Monteur · Willich", focus: "center top" },
          ]}
        />

        <TrustBadges
          eyebrow="Bewertungen & Auszeichnungen"
          title="Top-Bewertungen für unseren Service."
          intro="Über 1.200 zufriedene Kunden in Willich, Krefeld, Viersen und der ganzen Region vertrauen auf unsere Handwerksqualität."
          items={[
            { value: "4,9 / 5", label: "Google Bewertungen", sub: "aus 172 Bewertungen aus der Region", kind: "google" },
            { value: "4,8 / 5", label: "ProvenExpert", sub: "aus 98 geprüften Kundenstimmen", kind: "proven" },
            { value: "97 %", label: "Weiterempfehlung", sub: "würden Nouh-Wehres weiterempfehlen", kind: "recommend" },
          ]}
        />

        <FaqSection
          eyebrow="Häufige Fragen"
          title="Ihre Fragen zur Wärmepumpe – klar beantwortet."
          items={[
            {
              q: "Warum ist gerade jetzt der richtige Zeitpunkt für eine Wärmepumpe?",
              a: "Die Förderung ist aktuell auf Rekordniveau (bis zu 70 %), während Öl- und Gaspreise langfristig steigen. Wer jetzt wechselt, sichert sich den maximalen Zuschuss und senkt dauerhaft seine Heizkosten.",
            },
            {
              q: "Wie viel kostet eine Wärmepumpe – und wie schnell rechnet sie sich?",
              a: "Nach Abzug der Förderung bleibt oft deutlich weniger als gedacht. Zusammen mit den eingesparten Heizkosten rechnet sich die Anlage in der Regel innerhalb weniger Jahre. Sie erhalten ein transparentes Festpreis-Angebot.",
            },
            {
              q: "Wie hoch ist die Förderung genau?",
              a: "Je nach Ausgangslage sind bis zu 70 % möglich (Grundförderung, Klimageschwindigkeits-Bonus, Einkommens-Bonus). Im Wärmepumpen-Check prüfen wir, welche Stufen für Sie gelten – und stellen die Anträge für Sie.",
            },
            {
              q: "Welche Art von Wärmepumpe brauche ich – und warum?",
              a: "In den meisten Fällen ist eine Luft-Wasser-Wärmepumpe die wirtschaftlichste Lösung. Wir berechnen Ihre Heizlast und wählen das passende Modell – ehrlich und ohne Verkaufsdruck.",
            },
            {
              q: "Mit welchen Heizkosten muss ich rechnen?",
              a: "Eine moderne Wärmepumpe senkt die Heizkosten gegenüber Öl und Gas um bis zu 45 %. Mit eigener Photovoltaik lässt sich der Betrieb noch günstiger gestalten.",
            },
          ]}
        />

        <QualifyCta
          eyebrow="1 Minute zum Beratungsgespräch"
          title="Jetzt für Ihr kostenloses Beratungsgespräch qualifizieren."
          body="Wir beraten ausschließlich dort, wo eine Wärmepumpe wirklich sinnvoll ist – deshalb dieser kurze Check. Beantworten Sie eine Frage und hinterlassen Sie Ihre Kontaktdaten. Wir melden uns innerhalb von 24 Stunden persönlich."
          bullets={[
            "Kostenlos & unverbindlich",
            "Ehrliche Einschätzung vom Meisterbetrieb",
            "Komplette Förderabwicklung inklusive",
          ]}
          image="/lp/beratung-wohnzimmer.webp"
          imageAlt="Persönliche Beratung zur Wärmepumpe im Wohnzimmer"
          topic="Wärmepumpe · Beratung (Qualifizierung)"
          submitLabel="Beratungsgespräch anfordern"
        />

        <CtaBanner
          title="Jetzt in 1 Minute prüfen, wie viel Förderung Ihnen zusteht."
          text="Unverbindlich, kostenlos und mit Festpreisgarantie – Ihr Meisterbetrieb aus der Region meldet sich innerhalb von 24 Stunden."
          button="Kostenlosen Wärmepumpen-Check starten"
          href="/waermepumpe-beratung#top"
          checks={["Antwort innerhalb von 24 Stunden", "Bis zu 70 % Förderung", "Keine Subunternehmer"]}
        />
      </main>
      <Footer />
    </>
  );
}
