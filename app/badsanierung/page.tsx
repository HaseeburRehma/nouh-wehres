import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import GsapReveal from "../components/GsapReveal";
import LandingHero from "../components/landing/LandingHero";
import {
  StatsRow,
  ResultsGrid,
  VersusCompare,
  StepsRow,
  Team,
  Testimonials,
  FaqSection,
  CtaBanner,
} from "../components/landing/wp/parts";
import type { WizardStep } from "../lib/landing";

export const metadata: Metadata = {
  title:
    "Badsanierung zum Festpreis — NOUH-WEHRES | Willich, Krefeld & Düsseldorf",
  description:
    "Ihr Traumbad vom Meisterbetrieb zum Festpreis: alle Gewerke aus einer Hand, ein Ansprechpartner, kein Vermittlerportal. 6 Fragen für Ihre kostenlose Festpreis-Einschätzung.",
};

const wizardSteps: WizardStep[] = [
  {
    kind: "choice",
    question: "Was planen Sie?",
    options: ["Komplettsanierung", "Teilsanierung", "Dusche statt Wanne", "Barrierefreies Bad"],
  },
  {
    kind: "choice",
    question: "Wie groß ist Ihr Bad?",
    options: ["unter 6 m²", "6–10 m²", "über 10 m²", "Weiß ich nicht genau"],
  },
  {
    kind: "choice",
    question: "In welchem Zustand ist Ihr Bad heute?",
    options: ["Älter als 20 Jahre / Originalzustand", "Teilweise renoviert", "Modern – ich möchte nur umbauen"],
  },
  {
    kind: "choice",
    question: "Sind Sie Eigentümer der Immobilie?",
    options: ["Ja, Eigentümer", "Nein, Mieter"],
  },
  {
    kind: "choice",
    question: "Wann soll Ihr neues Bad fertig sein?",
    options: ["So schnell wie möglich", "In 1–3 Monaten", "In 3–6 Monaten", "Noch offen"],
  },
  {
    kind: "text",
    question: "Wo befindet sich Ihr Bad? (PLZ)",
    placeholder: "PLZ eingeben – z. B. 47877",
    help: "Wir arbeiten in Willich, Krefeld, Viersen, Mönchengladbach, Düsseldorf, Neuss und Umgebung (ca. 50 km).",
    optional: true,
  },
  { kind: "contact", question: "Fast geschafft! Wohin dürfen wir Ihre Festpreis-Einschätzung senden?" },
];

export default function BadsanierungPage() {
  return (
    <>
      <GsapReveal />
      <Header minimal />
      <main className="flex-1">
        <LandingHero
          eyebrow="Meisterbetrieb für Bäder in Willich · Viersen · Mönchengladbach · Düsseldorf"
          h1="Ihr Traumbad vom Meisterbetrieb – zum Festpreis."
          intro="Beantworten Sie 6 kurze Fragen und erhalten Sie Ihre kostenlose Festpreis-Einschätzung – direkt von uns, nicht von einem Vermittlerportal."
          checks={["Festpreisgarantie", "Alle Gewerke aus einer Hand", "Kein Vermittlerportal"]}
          badge={{ small: "gratis", big: "30 Sek" }}
          wizard={{
            name: "Was kostet Ihr neues Bad?",
            topic: "Badsanierung · Festpreis-Einschätzung",
            steps: wizardSteps,
            note: "In 30 Sekunden zur Festpreis-Einschätzung",
            submitLabel: "Kostenlose Festpreis-Einschätzung erhalten",
            countContact: false,
          }}
        />

        <StatsRow
          stats={[
            { value: "29", label: "Jahre Meisterbetrieb" },
            { value: "Festpreis", label: "garantiert, keine Nachträge" },
            { value: "Alle", label: "Gewerke aus einer Hand" },
            { value: "sauber", label: "& termintreu gearbeitet" },
          ]}
        />

        <ResultsGrid
          eyebrow="Vorher · Nachher"
          title="Echte Bäder. Echte Projekte. Aus Ihrer Region."
          intro="Jedes Bad hier haben wir selbst geplant und gebaut – mit eigenem Team, festem Ansprechpartner und Festpreis."
          items={[
            {
              image: "/projekte/3/1.webp",
              imageAlt: "Komplettsanierung eines Badezimmers in Krefeld",
              caption: "Komplettsanierung in Krefeld – in 3 Wochen fertig.",
            },
            {
              image: "/projekte/3/2.webp",
              imageAlt: "Dusche statt Wanne, barrierearm umgebaut in Viersen",
              caption: "Dusche statt Wanne in Viersen – in 5 Tagen umgebaut.",
            },
            {
              image: "/bad.webp",
              imageAlt: "Modernes barrierefreies Bad in Willich",
              caption: "Barrierefreies Bad in Willich – in 3 Wochen umgebaut.",
            },
          ]}
        />

        <VersusCompare
          eyebrow="Der Unterschied"
          title="Direkt vom Meisterbetrieb – kein Vermittlerportal."
          intro="Ihre Anfrage geht nicht an drei unbekannte Firmen, sondern an ein Team: unseres."
          left={{
            title: "Vermittlerportale",
            sub: "Lead-Broker ohne eigene Monteure",
            items: [
              "Ihre Daten gehen an 3 unbekannte Firmen",
              "Anrufe von fremden Nummern",
              "Niemand kennt Ihr Bad",
              "Keine Verantwortung für die Ausführung",
            ],
          }}
          right={{
            title: "Nouh-Wehres",
            sub: "Ihr Meisterbetrieb aus der Region",
            items: [
              "Ihre Anfrage bleibt bei uns",
              "Ein fester Ansprechpartner",
              "Wir planen UND bauen",
              "Festpreis & Gewährleistung aus einer Hand",
            ],
          }}
        />

        <StepsRow
          eyebrow="So einfach geht es"
          title="In 4 Schritten zu Ihrem neuen Bad – ohne Aufwand für Sie."
          bg="surface"
          items={[
            {
              title: "Fragen beantworten",
              text: "2 Minuten, kostenlos und unverbindlich – Sie beantworten 6 kurze Fragen zu Ihrem Bad.",
            },
            {
              title: "Festpreis-Einschätzung",
              text: "Wir melden uns innerhalb von 24 Stunden mit Ihrer kostenlosen Einschätzung.",
            },
            {
              title: "Vor-Ort-Termin & Planung",
              text: "Wir vermessen Ihr Bad und planen Ihr Wunschbad – inklusive verbindlichem Festpreis-Angebot.",
            },
            {
              title: "Umbau & Übergabe",
              text: "Alle Gewerke koordiniert, sauber und termingerecht – schlüsselfertig übergeben.",
            },
          ]}
        />

        <Team
          eyebrow="Unser Team"
          title="Das Team, das Ihr Bad baut."
          intro="Kein Callcenter, keine Subunternehmer: Bei uns kommen die Menschen zu Ihnen, die Ihr Bad wirklich bauen – seit 29 Jahren als Meisterbetrieb in der Region."
          members={[
            { photo: "/nouh-wehres.webp", name: "Nouh Wehres", role: "Geschäftsführer & Meister", focus: "center" },
            { photo: "/team-blau-monteur.jpg", name: "Fliesen & Sanitär", role: "Monteur · Willich", focus: "center top" },
            { photo: "/team-blau-meister.jpg", name: "Elektro & Trockenbau", role: "Monteur · Willich", focus: "center top" },
          ]}
        />

        <Testimonials
          eyebrow="Kundenstimmen"
          title="Das sagen unsere Kunden aus der Region."
          items={[
            {
              text: "Vom ersten Termin bis zur Übergabe hatten wir einen Ansprechpartner. Fliesen, Sanitär, Elektrik – alles lief über Nouh-Wehres. Nach drei Wochen war unser Bad fertig.",
              author: "Familie M. aus Viersen",
            },
            {
              text: "Wir haben die alte Wanne gegen eine bodengleiche Dusche getauscht. Fünf Tage, sauber gearbeitet – und der Festpreis wurde eingehalten.",
              author: "Herr R. aus Krefeld",
            },
            {
              text: "Die Festpreis-Einschätzung kam schon am nächsten Tag. Kein Callcenter, keine Anrufe von fremden Firmen – genau das hatten wir gesucht.",
              author: "Frau K. aus Willich",
            },
          ]}
        />

        <FaqSection
          eyebrow="Häufige Fragen"
          title="Ihre Fragen zur Badsanierung – klar beantwortet."
          items={[
            {
              q: "Was kostet eine Badsanierung?",
              a: "Das hängt von Größe und Ausstattung ab. Nach Ihren Angaben im Formular erhalten Sie eine erste Festpreis-Einschätzung. Den verbindlichen Festpreis nennen wir Ihnen nach dem Vor-Ort-Termin.",
            },
            {
              q: "Wie lange dauert die Sanierung?",
              a: "Ein komplettes Bad ist in der Regel in 2–3 Wochen fertig, eine Teilsanierung oft in wenigen Tagen. Den genauen Zeitplan legen wir nach dem Aufmaß verbindlich mit Ihnen fest.",
            },
            {
              q: "Koordinieren Sie alle Gewerke?",
              a: "Ja. Sanitär, Fliesen, Elektrik und Trockenbau kommen aus einer Hand. Sie haben genau einen Ansprechpartner – wir organisieren alle Handwerker für Sie.",
            },
            {
              q: "Bauen Sie auch barrierefreie Bäder?",
              a: "Selbstverständlich. Bodengleiche Duschen, rutschfeste Böden und durchdachte Details planen wir so, dass Ihr Bad heute und in Zukunft passt.",
            },
            {
              q: "Was passiert mit meinen Daten?",
              a: "Ihre Angaben bleiben bei uns – wir geben sie nicht an Dritte oder Vermittlerportale weiter. Sie erhalten Ihre Einschätzung direkt von unserem Meisterbetrieb.",
            },
          ]}
        />

        <CtaBanner
          title="Bereit für Ihr neues Bad?"
          text="6 Fragen, 2 Minuten – und Sie wissen, was Ihr Traumbad kostet. Kostenlos, unverbindlich und direkt von Ihrem Meisterbetrieb aus der Region."
          button="Jetzt Festpreis-Einschätzung starten"
          href="/badsanierung#top"
          checks={["Antwort innerhalb von 24 Stunden", "Festpreisgarantie", "Kein Vermittlerportal"]}
        />
      </main>
      <Footer />
    </>
  );
}
