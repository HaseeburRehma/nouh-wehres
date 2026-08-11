// Data + types for the four service landing pages
// (Badsanierung, Fußbodenheizung, Solar/Photovoltaik, Wärmepumpe).
// One config drives the shared <LandingPage /> template.

export type IconKey =
  | "user"
  | "shield"
  | "sparkles"
  | "accessibility"
  | "layers"
  | "clock"
  | "thermometer"
  | "trending"
  | "zap"
  | "eye"
  | "grid"
  | "euro"
  | "percent"
  | "users"
  | "award";

export type WizardStep =
  | { kind: "choice"; question: string; options: string[] }
  | { kind: "text"; question: string; placeholder?: string; help?: string; optional?: boolean }
  | { kind: "contact"; question: string };

export interface Stat {
  value: string;
  label: string;
}

export interface Benefit {
  icon: IconKey;
  title: string;
  text: string;
}

export interface ProcessStep {
  title: string;
  text: string;
}

export interface Testimonial {
  text: string;
  author: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface LandingConfig {
  slug: string;
  metaTitle: string;
  metaDescription: string;

  // Hero
  eyebrow: string;
  h1: string;
  intro: string;
  heroChecks: string[];
  badge: { small: string; big: string };

  // Wizard (hero form card)
  wizard: {
    name: string; // e.g. "Ihr Festpreis-Rechner"
    topic: string; // email topic / subject tag
    steps: WizardStep[];
  };

  stats: Stat[];

  vorteile: {
    eyebrow: string;
    title: string;
    intro: string;
    items: Benefit[];
  };

  ablauf: {
    eyebrow: string;
    title: string;
    items: ProcessStep[];
  };

  testimonials: {
    eyebrow: string;
    title: string;
    items: Testimonial[];
  };

  faq: {
    eyebrow: string;
    title: string;
    items: FaqItem[];
  };

  // Badsanierung shows a real-project results carousel; others don't.
  showResults?: boolean;
}

// The comparison table is identical across all four pages.
export const COMPARE_ROWS: {
  label: string;
  other: "no" | "partial";
  otherNote?: string;
}[] = [
  { label: "Fester Ansprechpartner aus der Region", other: "no", otherNote: "Callcenter" },
  { label: "Montage durch eigene Monteure", other: "no", otherNote: "Subunternehmer" },
  { label: "Festpreisgarantie", other: "partial", otherNote: "teilweise" },
  { label: "Vor-Ort-Service seit 29 Jahren", other: "no" },
  { label: "Förder-Service (KfW/BAFA) inklusive", other: "partial", otherNote: "teilweise" },
  { label: "24/7 Notdienst nach der Montage", other: "no" },
];

export const COMPARE = {
  eyebrow: "Der Unterschied",
  title: "Warum ein Meisterbetrieb aus der Region die bessere Wahl ist.",
};

export const CTA = {
  title: "Bereit? Sichern Sie sich jetzt Ihre kostenlose Beratung.",
  text: "Unverbindlich, kostenlos und mit Festpreisgarantie – Ihr Meisterbetrieb aus der Region meldet sich innerhalb von 24 Stunden.",
  button: "Jetzt kostenlose Beratung sichern",
  checks: [
    "Antwort innerhalb von 24 Stunden",
    "Festpreisgarantie",
    "Keine Subunternehmer",
  ],
};

/* ─────────────────────────  WÄRMEPUMPE  ───────────────────────── */
export const waermepumpe: LandingConfig = {
  slug: "waermepumpe",
  metaTitle:
    "Wärmepumpe mit bis zu 70 % Förderung — NOUH-WEHRES | Willich & Umgebung",
  metaDescription:
    "Neue Wärmepumpe vom Meisterbetrieb: Festpreisgarantie, eigenes Montageteam und kompletter Förder-Service mit bis zu 70 % staatlicher Förderung. Jetzt Förder-Check machen.",
  eyebrow: "Meisterbetrieb · Willich · Viersen · Krefeld · Mönchengladbach · Düsseldorf",
  h1: "Bis zu 70 % staatliche Förderung für Ihre neue Wärmepumpe.",
  intro:
    "Machen Sie sich unabhängig von Öl- und Gaspreisen. Wir planen, installieren und warten Ihre Wärmepumpe – mit Festpreisgarantie, eigenem Montageteam und komplettem Förder-Service. Seit 29 Jahren Meisterqualität aus der Region.",
  heroChecks: ["Bis zu 70 % Förderung", "Festpreisgarantie", "Keine Subunternehmer"],
  badge: { small: "bis zu", big: "70 % Förderung" },
  wizard: {
    name: "Ihr persönlicher Förder-Check",
    topic: "Wärmepumpe / Förder-Check",
    steps: [
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
      { kind: "contact", question: "Wohin dürfen wir Ihr Ergebnis senden?" },
    ],
  },
  stats: [
    { value: "29", label: "Jahre Meisterbetrieb" },
    { value: "bis 70 %", label: "staatliche Förderung" },
    { value: "100 %", label: "Festpreisgarantie" },
    { value: "24/7", label: "Notdienst nach Einbau" },
  ],
  vorteile: {
    eyebrow: "Ihre Vorteile",
    title: "Alles aus einer Hand – vom Förderantrag bis zur Wartung.",
    intro:
      "29 Jahre Meistererfahrung, ein fester Ansprechpartner und ein eigenes Montageteam aus der Region – für Ihre Wärmepumpe zum Festpreis.",
    items: [
      {
        icon: "percent",
        title: "Bis zu 70 % Förderung sichern",
        text: "Wir prüfen Ihre Förderfähigkeit, stellen alle Anträge bei KfW und BAFA und übernehmen die komplette Kommunikation. Für Sie: null Papierkram.",
      },
      {
        icon: "shield",
        title: "Festpreisgarantie",
        text: "Sie erhalten ein transparentes Angebot mit Komplettpreis. Keine versteckten Kosten, keine bösen Überraschungen.",
      },
      {
        icon: "users",
        title: "Eigenes Montageteam",
        text: "Von der Beratung bis zur Wartung: alles aus einer Hand, keine Subunternehmer. Ihr Ansprechpartner sitzt in der Region – nicht im Callcenter.",
      },
      {
        icon: "award",
        title: "Bosch Premium Partner",
        text: "Wir installieren geprüfte Markentechnik mit Herstellergarantie und übernehmen anschließend Wartung und 24/7 Notdienst.",
      },
    ],
  },
  ablauf: {
    eyebrow: "So läuft es ab",
    title: "In 4 Schritten zu Ihrer neuen Wärmepumpe.",
    items: [
      {
        title: "Förder-Check ausfüllen",
        text: "2 Minuten, kostenlos und unverbindlich – Sie geben nur ein paar Eckdaten an.",
      },
      {
        title: "Beratung & Vor-Ort-Termin",
        text: "Wir prüfen Ihr Gebäude und berechnen die passende Wärmepumpe für Sie.",
      },
      {
        title: "Festpreis-Angebot + Förderantrag",
        text: "Sie erhalten Ihren Komplettpreis – wir kümmern uns um die komplette Förderung.",
      },
      {
        title: "Montage & Wartung",
        text: "Einbau durch unser eigenes Team, danach Wartung und 24/7 Notdienst.",
      },
    ],
  },
  testimonials: {
    eyebrow: "Kundenstimmen",
    title: "Das sagen unsere Kunden aus der Region.",
    items: [
      {
        text: "In nur 7 Tagen war die neue Wärmepumpe installiert. Ein Ansprechpartner, alles zum Festpreis – genau so soll es sein.",
        author: "Familie M. aus Viersen",
      },
      {
        text: "Die komplette Förderung hat das Team übernommen. Wir mussten uns um nichts kümmern und haben spürbar gespart.",
        author: "Herr K. aus Krefeld",
      },
      {
        text: "Ehrliche Beratung, sauberer Einbau, pünktlich fertig. Man merkt: hier arbeitet ein echter Meisterbetrieb.",
        author: "Familie B. aus Willich",
      },
    ],
  },
  faq: {
    eyebrow: "Häufige Fragen",
    title: "Ihre Fragen zur Wärmepumpe – klar beantwortet.",
    items: [
      {
        q: "Wie hoch ist die staatliche Förderung 2026?",
        a: "Je nach Ausgangslage sind bis zu 70 % Zuschuss möglich (Grundförderung, Klimageschwindigkeits-Bonus, Einkommens-Bonus). Im Förder-Check prüfen wir, welche Stufen für Sie gelten.",
      },
      {
        q: "Funktioniert eine Wärmepumpe auch im Altbau?",
        a: "Ja. Moderne Wärmepumpen arbeiten auch im Bestand effizient. Wir prüfen Heizlast und Heizflächen und sagen Ihnen ehrlich, was sinnvoll ist.",
      },
      {
        q: "Was kostet eine Wärmepumpe?",
        a: "Nach Abzug der Förderung bleibt oft deutlich weniger als gedacht. Sie erhalten ein transparentes Festpreis-Angebot inklusive Förderabwicklung.",
      },
      {
        q: "Wie lange dauert der Einbau?",
        a: "Der eigentliche Einbau ist meist in wenigen Tagen erledigt. Den genauen Ablauf stimmen wir vorab verbindlich mit Ihnen ab.",
      },
      {
        q: "Warum Nouh-Wehres statt eines großen Online-Anbieters?",
        a: "Weil bei uns Beratung, Montage, Förderung und Wartung aus einer Hand kommen – mit festem Ansprechpartner und 24/7 Notdienst aus der Region.",
      },
    ],
  },
};

/* ─────────────────────────  BADSANIERUNG  ───────────────────────── */
export const badsanierung: LandingConfig = {
  slug: "badsanierung",
  metaTitle:
    "Badsanierung zum Festpreis — NOUH-WEHRES | Willich, Krefeld & Düsseldorf",
  metaDescription:
    "Ihr Traumbad zum Festpreis: Von der Teilsanierung bis zum kompletten Bad – ein Ansprechpartner, eigenes Team, alle Gewerke koordiniert. Festpreis-Rechner in 2 Minuten.",
  eyebrow:
    "Meisterbetrieb · Badsanierung in Willich, Krefeld, Mönchengladbach & Düsseldorf",
  h1: "Ihr Traumbad. Zum Festpreis. In 2 Minuten wissen Sie, was es kostet.",
  intro:
    "Von der Teilsanierung bis zum kompletten Traumbad: Wir planen und bauen Ihr neues Bad – mit einem Ansprechpartner, eigenem Team und Festpreisgarantie. Seit 29 Jahren Meisterqualität aus der Region.",
  heroChecks: ["Festpreisgarantie", "Alle Gewerke aus einer Hand", "Sauber & termintreu"],
  badge: { small: "nur", big: "2 Min" },
  wizard: {
    name: "Ihr Festpreis-Rechner",
    topic: "Badsanierung / Festpreis-Rechner",
    steps: [
      {
        kind: "choice",
        question: "Was planen Sie?",
        options: ["Komplettsanierung", "Teilsanierung", "Dusche statt Wanne", "Barrierefreies Bad"],
      },
      {
        kind: "choice",
        question: "Wie groß ist Ihr Bad ungefähr?",
        options: ["Bis 6 m²", "6–10 m²", "Über 10 m²", "Weiß ich nicht"],
      },
      {
        kind: "choice",
        question: "Welche Ausstattung wünschen Sie?",
        options: ["Standard", "Gehoben", "Premium", "Noch offen"],
      },
      {
        kind: "choice",
        question: "Wann soll es losgehen?",
        options: ["So schnell wie möglich", "In 1–3 Monaten", "In 3–6 Monaten", "Nur informieren"],
      },
      { kind: "contact", question: "Wohin dürfen wir Ihre Einschätzung senden?" },
    ],
  },
  stats: [
    { value: "29", label: "Jahre Meisterbetrieb" },
    { value: "Alle", label: "Gewerke koordiniert" },
    { value: "100 %", label: "Festpreisgarantie" },
    { value: "sauber", label: "Staub- & Schmutzschutz" },
  ],
  vorteile: {
    eyebrow: "Ihre Vorteile",
    title: "Ihr neues Bad – alle Gewerke aus einer Hand.",
    intro:
      "29 Jahre Meistererfahrung, ein fester Ansprechpartner und ein eigenes Team aus der Region – für Ihr neues Bad zum Festpreis.",
    items: [
      {
        icon: "user",
        title: "Ein Ansprechpartner für alles",
        text: "Sanitär, Fliesen, Elektrik, Trockenbau: Wir koordinieren alle Gewerke. Sie kennen genau einen Ansprechpartner – vom ersten Termin bis zur Übergabe.",
      },
      {
        icon: "shield",
        title: "Festpreis statt Überraschungen",
        text: "Sie wissen vor Baubeginn, was Ihr Bad kostet. Garantiert – ohne versteckte Kosten.",
      },
      {
        icon: "sparkles",
        title: "Sauber & termintreu",
        text: "Staubschutzwände, saubere Baustelle, verbindlicher Zeitplan. Wir arbeiten so, wie wir es im eigenen Zuhause erwarten würden.",
      },
      {
        icon: "accessibility",
        title: "Auch barrierefrei",
        text: "Wir planen Bäder, die mitwachsen: bodengleiche Duschen, rutschfeste Böden, durchdachte Details.",
      },
    ],
  },
  ablauf: {
    eyebrow: "So läuft es ab",
    title: "In 4 Schritten zu Ihrem neuen Bad.",
    items: [
      {
        title: "Festpreis-Rechner ausfüllen",
        text: "2 Minuten, unverbindlich – Sie beschreiben kurz Ihr Wunschbad.",
      },
      {
        title: "Vor-Ort-Termin & Planung",
        text: "Wir vermessen Ihr Bad und planen mit Ihnen Ihr Wunschbad.",
      },
      {
        title: "Festpreis-Angebot",
        text: "Transparent, komplett, verbindlich – ohne versteckte Kosten.",
      },
      {
        title: "Umbau & Übergabe",
        text: "Alle Gewerke koordiniert, sauber und pünktlich übergeben.",
      },
    ],
  },
  testimonials: {
    eyebrow: "Kundenstimmen",
    title: "Das sagen unsere Kunden aus der Region.",
    items: [
      {
        text: "Vom alten Bad zum Traumbad in knapp 3 Wochen. Ein Ansprechpartner, alles koordiniert – wir mussten keinen Handwerker selbst organisieren.",
        author: "Familie M. aus Viersen",
      },
      {
        text: "Der Festpreis stand vorab und wurde exakt eingehalten. Saubere Baustelle, freundliches und pünktliches Team.",
        author: "Herr K. aus Krefeld",
      },
      {
        text: "Unsere bodengleiche Dusche ist ein Traum. Ehrliche Beratung, top Ausführung – jederzeit wieder.",
        author: "Familie B. aus Willich",
      },
    ],
  },
  faq: {
    eyebrow: "Häufige Fragen",
    title: "Ihre Fragen zur Badsanierung – klar beantwortet.",
    items: [
      {
        q: "Was kostet eine Badsanierung?",
        a: "Je nach Größe und Ausstattung. Nach dem Vor-Ort-Termin erhalten Sie ein verbindliches Festpreis-Angebot. Der Rechner gibt Ihnen vorab eine erste Einschätzung.",
      },
      {
        q: "Wie lange dauert die Sanierung?",
        a: "Ein komplettes Bad ist in der Regel in 2–3 Wochen fertig. Den genauen Zeitplan legen wir nach dem Aufmaß verbindlich mit Ihnen fest.",
      },
      {
        q: "Koordinieren Sie alle Gewerke?",
        a: "Ja. Sanitär, Fliesen, Elektrik und Trockenbau kommen aus einer Hand. Sie haben genau einen Ansprechpartner – wir organisieren alle Handwerker für Sie.",
      },
      {
        q: "Machen Sie auch barrierefreie Bäder?",
        a: "Selbstverständlich. Bodengleiche Duschen, rutschfeste Böden und durchdachte Details planen wir so, dass Ihr Bad heute und in Zukunft passt.",
      },
      {
        q: "Warum Nouh-Wehres statt eines großen Anbieters?",
        a: "Weil Sie einen festen Meisterbetrieb aus der Region bekommen – mit eigenem Team, Festpreisgarantie und einem Ansprechpartner, der auch nach der Übergabe für Sie da ist.",
      },
    ],
  },
  showResults: true,
};

/* ─────────────────────────  FUSSBODENHEIZUNG  ───────────────────────── */
export const fussbodenheizung: LandingConfig = {
  slug: "fussbodenheizung",
  metaTitle:
    "Fußbodenheizung nachrüsten ohne Aufbauhöhe — NOUH-WEHRES | Willich",
  metaDescription:
    "Fußbodenheizung nachrüsten im Fräsverfahren – ohne Aufbauhöhe, oft in 1–2 Tagen, zum Festpreis. Machen Sie den kostenlosen Machbarkeits-Check in 2 Minuten.",
  eyebrow: "Meisterbetrieb · Fußbodenheizung nachrüsten in Willich & Umgebung",
  h1: "Fußbodenheizung nachrüsten – ohne den Boden rauszureißen.",
  intro:
    "Mit modernem Fräsverfahren rüsten wir Ihre Fußbodenheizung direkt in den bestehenden Estrich nach – ohne Aufbauhöhe, oft in 1–2 Tagen. Prüfen Sie in 2 Minuten, ob Ihr Haus geeignet ist.",
  heroChecks: ["Keine Aufbauhöhe", "Oft in 1–2 Tagen", "Festpreisgarantie"],
  badge: { small: "ganz", big: "ohne Aufbauhöhe" },
  wizard: {
    name: "Ihr Machbarkeits-Check",
    topic: "Fußbodenheizung / Machbarkeits-Check",
    steps: [
      {
        kind: "choice",
        question: "Wo soll die Fußbodenheizung hin?",
        options: ["Einzelne Räume", "Ganze Etage", "Ganzes Haus", "Noch offen"],
      },
      {
        kind: "choice",
        question: "Um welches Gebäude handelt es sich?",
        options: ["Einfamilienhaus", "Mehrfamilienhaus", "Wohnung", "Gewerbe"],
      },
      {
        kind: "choice",
        question: "Welcher Bodenbelag ist aktuell verlegt?",
        options: ["Fliesen", "Laminat / Parkett", "Teppich", "Verschiedene"],
      },
      {
        kind: "choice",
        question: "Welchen Wärmeerzeuger nutzen Sie?",
        options: ["Wärmepumpe", "Gas / Öl", "Noch keiner", "Weiß ich nicht"],
      },
      {
        kind: "choice",
        question: "Wann möchten Sie starten?",
        options: ["So schnell wie möglich", "In 1–3 Monaten", "Später", "Nur informieren"],
      },
      { kind: "contact", question: "Wohin dürfen wir Ihr Ergebnis senden?" },
    ],
  },
  stats: [
    { value: "29", label: "Jahre Meisterbetrieb" },
    { value: "ohne", label: "Aufbauhöhe" },
    { value: "1–2", label: "Tage Einbauzeit" },
    { value: "100 %", label: "Festpreisgarantie" },
  ],
  vorteile: {
    eyebrow: "Ihre Vorteile",
    title: "Moderne Flächenheizung – ganz ohne Baustellen-Chaos.",
    intro:
      "29 Jahre Meistererfahrung, ein fester Ansprechpartner und ein eigenes Team aus der Region – für Ihre Fußbodenheizung zum Festpreis.",
    items: [
      {
        icon: "layers",
        title: "Keine Aufbauhöhe",
        text: "Die Heizrohre werden direkt in den vorhandenen Estrich gefräst. Türen, Anschlüsse und Bodenhöhen bleiben, wie sie sind.",
      },
      {
        icon: "clock",
        title: "Schnell & sauber",
        text: "Staubarme Frästechnik, oft in 1–2 Tagen umgesetzt. Kein wochenlanges Baustellen-Chaos.",
      },
      {
        icon: "thermometer",
        title: "Perfekt zur Wärmepumpe",
        text: "Flächenheizung + Wärmepumpe ist das effizienteste Duo. Wir planen beides zusammen – aus einer Hand.",
      },
      {
        icon: "trending",
        title: "Wertsteigerung inklusive",
        text: "Eine moderne Flächenheizung steigert Komfort und Immobilienwert dauerhaft.",
      },
    ],
  },
  ablauf: {
    eyebrow: "So läuft es ab",
    title: "In 4 Schritten zu Ihrer Fußbodenheizung.",
    items: [
      {
        title: "Machbarkeits-Check ausfüllen",
        text: "2 Minuten, kostenlos – ein paar Angaben zu Boden und Gebäude.",
      },
      {
        title: "Prüfung & Beratung",
        text: "Wir prüfen Estrich und Heizlast vor Ort – ehrlich und ohne Verkaufsdruck.",
      },
      {
        title: "Festpreis-Angebot",
        text: "Transparent und verbindlich – Sie wissen genau, was es kostet.",
      },
      {
        title: "Fräsen, Verlegen, Fertig",
        text: "Oft in 1–2 Tagen, inklusive Dichtheitsprüfung.",
      },
    ],
  },
  testimonials: {
    eyebrow: "Kundenstimmen",
    title: "Das sagen unsere Kunden aus der Region.",
    items: [
      {
        text: "Morgens Baustelle, am nächsten Tag fertig – ganz ohne den Boden rauszureißen. Wir waren begeistert.",
        author: "Familie M. aus Viersen",
      },
      {
        text: "Staubarm, sauber, pünktlich. Die Räume sind endlich gleichmäßig warm. Top Meisterarbeit.",
        author: "Herr K. aus Krefeld",
      },
      {
        text: "Ehrliche Prüfung vorab, fairer Festpreis, perfekt kombiniert mit unserer Wärmepumpe.",
        author: "Familie B. aus Willich",
      },
    ],
  },
  faq: {
    eyebrow: "Häufige Fragen",
    title: "Ihre Fragen zur Fußbodenheizung – klar beantwortet.",
    items: [
      {
        q: "Geht das wirklich ohne Aufbauhöhe?",
        a: "Ja. Beim Fräsverfahren werden Kanäle in den bestehenden Estrich gefräst – der Bodenaufbau bleibt unverändert.",
      },
      {
        q: "Funktioniert das im Altbau?",
        a: "In den allermeisten Fällen ja. Beim Vor-Ort-Termin prüfen wir Estrich und Bausubstanz und sagen Ihnen ehrlich, ob Ihr Haus geeignet ist.",
      },
      {
        q: "Wie lange dauert der Einbau?",
        a: "Je nach Fläche ist die Fußbodenheizung oft schon in 1–2 Tagen eingefräst, verlegt und betriebsbereit – inklusive Dichtheitsprüfung.",
      },
      {
        q: "Kann ich danach jeden Bodenbelag verlegen?",
        a: "Ja. Ob Fliesen, Parkett, Laminat oder Vinyl – nach dem Einfräsen können Sie Ihren Wunschbelag wie gewohnt verlegen.",
      },
      {
        q: "Warum Nouh-Wehres?",
        a: "29 Jahre Meistererfahrung, ein eigenes Team und Festpreisgarantie. Wir prüfen ehrlich, ob sich die Nachrüstung für Sie lohnt – ohne Verkaufsdruck.",
      },
    ],
  },
};

/* ─────────────────────────  SOLAR / PHOTOVOLTAIK  ───────────────────────── */
export const solar: LandingConfig = {
  slug: "solar",
  metaTitle:
    "Solaranlage & Photovoltaik zum Festpreis — NOUH-WEHRES | Willich",
  metaDescription:
    "Photovoltaik vom Meisterbetrieb: ehrliche Ertragseinschätzung, Planung, Montage und Netzanmeldung aus einer Hand, zum Festpreis. Jetzt kostenlosen Dach-Check machen.",
  eyebrow: "Meisterbetrieb · Solar & Photovoltaik in Willich & Umgebung",
  h1: "Ihr Dach kann mehr: Strom erzeugen und Kosten senken.",
  intro:
    "Lassen Sie kostenlos prüfen, ob sich eine Solaranlage für Ihr Dach lohnt – mit ehrlicher Ertragseinschätzung vom Meisterbetrieb aus der Region. Planung, Montage und Anmeldung: alles aus einer Hand, zum Festpreis.",
  heroChecks: ["Ehrliche Einschätzung", "Festpreisgarantie", "Montage durch eigenes Team"],
  badge: { small: "gratis", big: "Dach-Check" },
  wizard: {
    name: "Ihr kostenloser Dach-Check",
    topic: "Photovoltaik / Dach-Check",
    steps: [
      {
        kind: "choice",
        question: "Um welches Gebäude geht es?",
        options: ["Einfamilienhaus", "Zweifamilienhaus", "Mehrfamilienhaus", "Gewerbe"],
      },
      {
        kind: "choice",
        question: "Wie ist Ihr Dach ausgerichtet?",
        options: ["Süden", "Ost-West", "Norden", "Weiß ich nicht"],
      },
      {
        kind: "choice",
        question: "Interesse an einem Stromspeicher?",
        options: ["Ja, unbedingt", "Vielleicht", "Nein", "Beraten lassen"],
      },
      {
        kind: "choice",
        question: "Wann möchten Sie starten?",
        options: ["So schnell wie möglich", "In 1–3 Monaten", "Später", "Nur informieren"],
      },
      { kind: "contact", question: "Wohin dürfen wir Ihr Ergebnis senden?" },
    ],
  },
  stats: [
    { value: "29", label: "Jahre Meisterbetrieb" },
    { value: "Komplett", label: "Paket inkl. Montage" },
    { value: "100 %", label: "Festpreisgarantie" },
    { value: "Region", label: "statt Callcenter" },
  ],
  vorteile: {
    eyebrow: "Ihre Vorteile",
    title: "Alles aus einer Hand – von der Planung bis zur Anmeldung.",
    intro:
      "29 Jahre Meistererfahrung, ein fester Ansprechpartner und ein eigenes Montageteam aus der Region – für Ihre Solaranlage zum Festpreis.",
    items: [
      {
        icon: "zap",
        title: "Unabhängiger vom Strompreis",
        text: "Erzeugen Sie Ihren eigenen Strom und senken Sie Ihre Energiekosten – dauerhaft, mit Speicher auch abends und nachts.",
      },
      {
        icon: "eye",
        title: "Ehrliche Beratung statt Verkaufsshow",
        text: "Wir sagen Ihnen auch, wenn sich Solar auf Ihrem Dach NICHT lohnt. Meisterbetrieb heißt: Wir müssen Ihnen nichts um jeden Preis verkaufen.",
      },
      {
        icon: "grid",
        title: "Alles aus einer Hand",
        text: "Planung, Montage, Netzanmeldung: Wir kümmern uns um alles – mit eigenem Team, ohne Subunternehmer.",
      },
      {
        icon: "euro",
        title: "Festpreis & Region",
        text: "Transparentes Komplettangebot und ein Ansprechpartner, der auch in 10 Jahren noch für Sie da ist.",
      },
    ],
  },
  ablauf: {
    eyebrow: "So läuft es ab",
    title: "In 4 Schritten zu Ihrer eigenen Solaranlage.",
    items: [
      {
        title: "Dach-Check ausfüllen",
        text: "2 Minuten, kostenlos – Sie geben nur ein paar Eckdaten an.",
      },
      {
        title: "Ertragseinschätzung & Beratung",
        text: "Wir prüfen Dach, Ausrichtung und Verbrauch – ehrlich und transparent.",
      },
      {
        title: "Festpreis-Angebot",
        text: "Komplettpaket inkl. Montage, auf Wunsch mit Speicher und Wallbox.",
      },
      {
        title: "Montage & Anmeldung",
        text: "Einbau durch unser Team, wir übernehmen die komplette Anmeldung.",
      },
    ],
  },
  testimonials: {
    eyebrow: "Kundenstimmen",
    title: "Das sagen unsere Kunden aus der Region.",
    items: [
      {
        text: "Ehrliche Beratung: Man hat uns genau vorgerechnet, was sich lohnt. Die Anlage läuft top, die Kosten sind deutlich gesunken.",
        author: "Familie M. aus Viersen",
      },
      {
        text: "Von der Planung bis zur Netzanmeldung lief alles über ein Team. Kein Papierkram für uns – rundum entspannt.",
        author: "Herr K. aus Krefeld",
      },
      {
        text: "Sauber montiert, pünktlich fertig, fairer Festpreis. Genau so stellt man sich einen Meisterbetrieb vor.",
        author: "Familie B. aus Willich",
      },
    ],
  },
  faq: {
    eyebrow: "Häufige Fragen",
    title: "Ihre Fragen zur Solaranlage – klar beantwortet.",
    items: [
      {
        q: "Lohnt sich eine Solaranlage bei uns überhaupt?",
        a: "Das hängt von Dachfläche, Ausrichtung, Verschattung und Ihrem Verbrauch ab. Genau dafür gibt es den kostenlosen Dach-Check mit ehrlicher Einschätzung.",
      },
      {
        q: "Brauche ich einen Speicher?",
        a: "Ein Speicher lohnt sich, wenn Sie auch abends und nachts eigenen Strom nutzen möchten. Wir rechnen Ihnen ehrlich vor, ob er sich für Sie rentiert.",
      },
      {
        q: "Wie lange dauert die Montage?",
        a: "Eine typische Anlage ist meist innerhalb von 1–2 Tagen montiert. Die Netzanmeldung übernehmen wir anschließend komplett für Sie.",
      },
      {
        q: "Was kostet eine Solaranlage?",
        a: "Das hängt von Größe, Speicher und Wallbox ab. Sie erhalten ein transparentes Komplettangebot zum Festpreis – ohne versteckte Kosten.",
      },
      {
        q: "Warum Nouh-Wehres statt eines großen Online-Anbieters?",
        a: "Weil Sie einen Meisterbetrieb aus der Region bekommen, der auch in 10 Jahren noch für Sie da ist – mit eigenem Team statt wechselnder Subunternehmer.",
      },
    ],
  },
};

export const LANDING_CONFIGS: Record<string, LandingConfig> = {
  waermepumpe,
  badsanierung,
  fussbodenheizung,
  solar,
};
