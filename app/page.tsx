import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Why from "./components/Why";
import Ablauf from "./components/Ablauf";
import Foerderung from "./components/Foerderung";
import Traumbad from "./components/Traumbad";
import Ergebnisse from "./components/Ergebnisse";
import Vergleich from "./components/Vergleich";
import Team from "./components/Team";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import GsapReveal from "./components/GsapReveal";

export default function Home() {
  return (
    <>
      <GsapReveal />
      <Header />
      <main className="flex-1">
        <Hero />
        <Services />
        <Why />
        <Ablauf />
        <Foerderung />
        <Traumbad />
        <Ergebnisse />
        <Vergleich />
        <Team />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
