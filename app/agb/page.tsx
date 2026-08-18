import type { Metadata } from "next";
import LegalLayout from "../components/LegalLayout";

export const metadata: Metadata = {
  title: "AGB — NOUH-WEHRES GmbH",
  description:
    "Allgemeine Geschäftsbedingungen (AGB) der Nouh-Wehres GmbH – Meisterbetrieb für Heizung, Sanitär, Solar, Wärmepumpen und Sanierung.",
  robots: { index: true, follow: true },
};

export default function AGB() {
  return (
    <LegalLayout title="Allgemeine Geschäftsbedingungen (AGB)" updated="2026-08-13">
      <h2>1. Geltungsbereich</h2>
      <p>
        Diese Allgemeinen Geschäftsbedingungen (nachfolgend „AGB“) gelten für
        alle Verträge zwischen der Nouh-Wehres GmbH, Unterbruch 48 b, 47877
        Willich (nachfolgend „Auftragnehmer“ oder „wir“) und ihren
        Auftraggebern (nachfolgend „Kunde“ oder „Sie“) über die Erbringung von
        Handwerksleistungen im Bereich Heizung, Sanitär, Solar, Wärmepumpen und
        Sanierung.
      </p>
      <p>
        Abweichende, entgegenstehende oder ergänzende Bedingungen des Kunden
        werden nur dann und insoweit Vertragsbestandteil, als der Auftragnehmer
        ihrer Geltung ausdrücklich schriftlich zugestimmt hat.
      </p>

      <h2>2. Angebot und Vertragsschluss</h2>
      <p>
        Unsere Angebote sind – sofern nicht ausdrücklich als verbindlich
        bezeichnet – freibleibend. Ein Vertrag kommt erst mit unserer
        schriftlichen Auftragsbestätigung oder mit Beginn der Leistung zustande.
      </p>
      <p>
        Anfragen, die Sie über das Kontakt- oder Anfrageformular auf dieser
        Website senden, stellen kein bindendes Angebot dar, sondern eine
        Einladung an uns, Ihnen ein individuelles Angebot zu unterbreiten.
      </p>

      <h2>3. Leistungsumfang und Ausführung</h2>
      <p>
        Der genaue Leistungsumfang ergibt sich aus dem jeweiligen schriftlichen
        Angebot bzw. der Auftragsbestätigung. Für die Ausführung von
        Bauleistungen gilt ergänzend die Vergabe- und Vertragsordnung für
        Bauleistungen Teil B (VOB/B) in ihrer jeweils gültigen Fassung.
      </p>

      <h2>4. Preise und Zahlungsbedingungen</h2>
      <p>
        Es gelten die im Angebot bzw. in der Auftragsbestätigung genannten
        Preise. Alle Preise verstehen sich – sofern nicht anders ausgewiesen –
        netto zuzüglich der gesetzlichen Umsatzsteuer.
      </p>
      <p>
        Rechnungen sind, sofern nicht anders vereinbart, innerhalb von 14 Tagen
        nach Rechnungsdatum ohne Abzug zur Zahlung fällig.
      </p>

      <h2>5. Fristen und Termine</h2>
      <p>
        Genannte Ausführungstermine sind unverbindlich, sofern sie nicht
        ausdrücklich als verbindlich vereinbart wurden. Verzögerungen infolge
        höherer Gewalt oder aufgrund von Umständen, die wir nicht zu vertreten
        haben (z. B. Lieferschwierigkeiten beim Hersteller), verlängern die
        Ausführungsfristen angemessen.
      </p>

      <h2>6. Gewährleistung</h2>
      <p>
        Es gelten die gesetzlichen Gewährleistungsrechte. Bei Bauleistungen
        richtet sich die Gewährleistung ergänzend nach der VOB/B.
      </p>

      <h2>7. Haftung</h2>
      <p>
        Wir haften unbeschränkt für Vorsatz und grobe Fahrlässigkeit sowie
        nach den Vorschriften des Produkthaftungsgesetzes. Für leichte
        Fahrlässigkeit haften wir nur bei Verletzung einer wesentlichen
        Vertragspflicht (Kardinalpflicht) sowie bei Schäden aus der Verletzung
        des Lebens, des Körpers oder der Gesundheit. Bei einfacher Fahrlässigkeit
        ist unsere Haftung auf den bei Vertragsschluss vorhersehbaren,
        vertragstypischen Schaden begrenzt.
      </p>

      <h2>8. Widerrufsrecht für Verbraucher</h2>
      <p>
        Verbrauchern steht bei außerhalb von Geschäftsräumen geschlossenen
        Verträgen und bei Fernabsatzverträgen grundsätzlich ein gesetzliches
        Widerrufsrecht zu. Über die Einzelheiten Ihres Widerrufsrechts sowie
        über etwaige Ausschlüsse informieren wir Sie im Rahmen des konkreten
        Vertragsabschlusses gesondert in Textform.
      </p>

      <h2>9. Eigentumsvorbehalt</h2>
      <p>
        Gelieferte Waren bleiben bis zur vollständigen Bezahlung sämtlicher
        Forderungen aus der Geschäftsverbindung unser Eigentum.
      </p>

      <h2>10. Datenschutz</h2>
      <p>
        Die Verarbeitung personenbezogener Daten erfolgt entsprechend unserer{" "}
        <a href="/datenschutz">Datenschutzerklärung</a>.
      </p>

      <h2>11. Schlussbestimmungen</h2>
      <p>
        Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des
        UN-Kaufrechts. Ist der Kunde Kaufmann, juristische Person des
        öffentlichen Rechts oder öffentlich-rechtliches Sondervermögen, ist
        Gerichtsstand für alle Streitigkeiten aus der Geschäftsbeziehung der
        Sitz des Auftragnehmers.
      </p>
      <p>
        Sollten einzelne Bestimmungen dieser AGB unwirksam sein oder werden,
        bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.
      </p>
    </LegalLayout>
  );
}
