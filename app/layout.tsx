import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "NOUH-WEHRES — Meisterbetrieb für Heizung & Bad | Düsseldorf",
  description:
    "NOUH-WEHRES: Ihr Meisterbetrieb für Heizung, Bad, Sanitär und Wärmepumpen in Düsseldorf & Umgebung. Festpreisgarantie und Förder-Service.",
  icons: { icon: "/logo.png" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <noscript>
          {/* Without JS, GSAP can't reveal — show everything. */}
          <style>{`.reveal{visibility:visible!important}`}</style>
        </noscript>
      </head>
      <body className="min-h-full flex flex-col bg-white text-ink">
        {children}
      </body>
    </html>
  );
}
