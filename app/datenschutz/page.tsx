import type { Metadata } from "next";
import LegalLayout from "../components/LegalLayout";

export const metadata: Metadata = {
  title: "Datenschutzerklärung — NOUH-WEHRES GmbH",
  description:
    "Datenschutzerklärung der Nouh-Wehres GmbH gemäß DSGVO. Informationen zur Verarbeitung Ihrer Daten beim Besuch dieser Website und bei Nutzung des Kontaktformulars.",
  robots: { index: true, follow: true },
};

export default function Datenschutz() {
  return (
    <LegalLayout title="Datenschutzerklärung" updated="2026-08-13">
      <h2>1. Verantwortlicher</h2>
      <p>
        Verantwortlich für die Datenverarbeitung auf dieser Website im Sinne
        der EU-Datenschutz-Grundverordnung (DSGVO) ist:
      </p>
      <address>
        Nouh-Wehres GmbH<br />
        Mohamed Nouh (Geschäftsführer)<br />
        Unterbruch 48 b<br />
        47877 Willich<br />
        Telefon: <a href="tel:+49215487670">02154 87670</a>
        <br />
        E-Mail:{" "}
        <a href="mailto:info@nouh-wehres.de">info@nouh-wehres.de</a>
      </address>

      <h2>2. Ihre Rechte als betroffene Person</h2>
      <p>Sie haben jederzeit das Recht:</p>
      <ul>
        <li>Auskunft über die zu Ihrer Person gespeicherten Daten zu verlangen (Art. 15 DSGVO)</li>
        <li>die Berichtigung unrichtiger Daten zu verlangen (Art. 16 DSGVO)</li>
        <li>die Löschung Ihrer Daten zu verlangen (Art. 17 DSGVO)</li>
        <li>die Einschränkung der Verarbeitung zu verlangen (Art. 18 DSGVO)</li>
        <li>Ihre Daten in einem strukturierten Format zu erhalten (Art. 20 DSGVO)</li>
        <li>Widerspruch gegen die Verarbeitung einzulegen (Art. 21 DSGVO)</li>
        <li>eine erteilte Einwilligung mit Wirkung für die Zukunft zu widerrufen</li>
      </ul>
      <p>
        Sie haben zudem das Recht, sich bei einer Datenschutzaufsichtsbehörde
        über die Verarbeitung Ihrer personenbezogenen Daten zu beschweren. Die
        für uns zuständige Aufsichtsbehörde ist die{" "}
        <a
          href="https://www.ldi.nrw.de/"
          target="_blank"
          rel="noreferrer"
        >
          Landesbeauftragte für Datenschutz und Informationsfreiheit
          Nordrhein-Westfalen (LDI NRW)
        </a>
        , Postfach 20 04 44, 40102 Düsseldorf.
      </p>

      <h2>3. Erhebung allgemeiner Informationen beim Besuch unserer Website</h2>
      <p>
        Beim Aufruf unserer Website werden durch unseren Hosting-Anbieter
        automatisch Informationen erfasst, die Ihr Browser übermittelt
        („Server-Logfiles“). Dazu gehören insbesondere:
      </p>
      <ul>
        <li>anonymisierte IP-Adresse</li>
        <li>Datum und Uhrzeit des Zugriffs</li>
        <li>aufgerufene Seite / URL</li>
        <li>Browsertyp und -version</li>
        <li>verwendetes Betriebssystem</li>
        <li>Referrer-URL</li>
      </ul>
      <p>
        Rechtsgrundlage ist unser berechtigtes Interesse an einer sicheren und
        stabilen Bereitstellung der Website (Art. 6 Abs. 1 lit. f DSGVO). Eine
        Zusammenführung dieser Daten mit anderen Datenquellen nimmt der Betreiber
        nicht vor.
      </p>

      <h2>4. Hosting durch Vercel</h2>
      <p>
        Diese Website wird bei Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA
        91789, USA, gehostet. Beim Aufruf verarbeitet Vercel die in Ziffer 3
        genannten Zugriffsdaten. Die Datenübermittlung in die USA erfolgt auf
        Basis der EU-Standardvertragsklauseln und – soweit anwendbar – des
        EU-US Data Privacy Framework. Weitere Informationen:{" "}
        <a
          href="https://vercel.com/legal/privacy-policy"
          target="_blank"
          rel="noreferrer"
        >
          vercel.com/legal/privacy-policy
        </a>
        .
      </p>

      <h2>5. Kontaktformular</h2>
      <p>
        Wenn Sie uns über das Anfrage-/Formular auf dieser Website
        kontaktieren, verarbeiten wir die von Ihnen dort angegebenen Daten
        (mindestens Name, E-Mail-Adresse, Telefonnummer sowie die von Ihnen im
        Formular ausgewählten bzw. eingegebenen Angaben zu Ihrem Anliegen)
        ausschließlich zur Bearbeitung Ihrer Anfrage.
      </p>
      <p>
        Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Anbahnung eines
        Vertragsverhältnisses) bzw. Art. 6 Abs. 1 lit. f DSGVO (Beantwortung
        Ihrer Anfrage). Die von Ihnen übermittelten Daten werden bis zum
        Abschluss der Kommunikation bzw. bis zum Ablauf gesetzlicher
        Aufbewahrungsfristen gespeichert.
      </p>

      <h3>5.1 E-Mail-Versand über Resend</h3>
      <p>
        Zur Zustellung Ihrer Anfrage per E-Mail nutzen wir den Dienst der
        Resend, Inc., 2261 Market Street #5039, San Francisco, CA 94114, USA.
        Resend verarbeitet die im Formular angegebenen Daten in unserem Auftrag
        (Auftragsverarbeitung nach Art. 28 DSGVO). Die Datenübermittlung in
        die USA erfolgt auf Basis der EU-Standardvertragsklauseln. Weitere
        Informationen:{" "}
        <a
          href="https://resend.com/legal/privacy-policy"
          target="_blank"
          rel="noreferrer"
        >
          resend.com/legal/privacy-policy
        </a>
        .
      </p>

      <h3>5.2 Interne Lead-Verwaltung über Google Sheets</h3>
      <p>
        Zusätzlich werden die Formulardaten zur internen Bearbeitung in einem
        Google-Sheets-Dokument des Verantwortlichen gespeichert. Anbieter ist
        die Google Ireland Limited, Gordon House, Barrow Street, Dublin 4,
        Irland. Weitere Informationen:{" "}
        <a
          href="https://policies.google.com/privacy"
          target="_blank"
          rel="noreferrer"
        >
          policies.google.com/privacy
        </a>
        .
      </p>

      <h2>6. Google Maps</h2>
      <p>
        Auf unserer Website ist im Fußbereich eine Karte des Dienstes Google
        Maps eingebunden. Anbieter ist die Google Ireland Limited, Gordon House,
        Barrow Street, Dublin 4, Irland. Beim Aufruf der Seite wird Ihre
        IP-Adresse an Google übertragen, damit die Karte in Ihrem Browser
        geladen werden kann. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO
        (berechtigtes Interesse an einer schnellen Auffindbarkeit unseres
        Standorts). Weitere Informationen zum Umgang mit Nutzerdaten finden
        Sie in der{" "}
        <a
          href="https://policies.google.com/privacy"
          target="_blank"
          rel="noreferrer"
        >
          Datenschutzerklärung von Google
        </a>
        .
      </p>

      <h2>7. Google Fonts</h2>
      <p>
        Zur einheitlichen Darstellung von Schriftarten verwenden wir die
        Schriftart „Inter“, die über den Dienst Google Fonts (Google Ireland
        Limited, Gordon House, Barrow Street, Dublin 4, Irland) beim Aufruf der
        Seite geladen wird. Dabei wird eine Verbindung zu Servern von Google
        aufgebaut. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Weitere
        Informationen:{" "}
        <a
          href="https://developers.google.com/fonts/faq/privacy"
          target="_blank"
          rel="noreferrer"
        >
          developers.google.com/fonts/faq/privacy
        </a>
        .
      </p>

      <h2>8. Cookies</h2>
      <p>
        Diese Website setzt keine Marketing- oder Tracking-Cookies. Es werden
        ausschließlich technisch notwendige Cookies bzw. Speicherzugriffe
        eingesetzt, die für den sicheren Betrieb der Website erforderlich sind
        (§ 25 Abs. 2 Nr. 2 TTDSG).
      </p>

      <h2>9. Analyse- und Werbe-Tools</h2>
      <p>
        Wir setzen derzeit keine externen Analyse- oder Werbe-Tools ein (kein
        Google Analytics, kein Meta-Pixel, kein Retargeting). Sofern sich dies
        künftig ändern sollte, werden wir Sie zuvor über die eingesetzten
        Dienste informieren und – wo erforderlich – Ihre Einwilligung
        einholen.
      </p>

      <h2>10. SSL-/TLS-Verschlüsselung</h2>
      <p>
        Diese Website nutzt aus Sicherheitsgründen und zum Schutz der
        Übertragung vertraulicher Inhalte eine SSL- bzw. TLS-Verschlüsselung.
        Eine verschlüsselte Verbindung erkennen Sie am „https://“ in der
        Adresszeile Ihres Browsers.
      </p>

      <h2>11. Änderungen dieser Datenschutzerklärung</h2>
      <p>
        Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie
        stets den aktuellen rechtlichen Anforderungen entspricht oder um
        Änderungen unserer Leistungen umzusetzen. Für Ihren erneuten Besuch
        gilt dann die aktuelle Fassung.
      </p>
    </LegalLayout>
  );
}
