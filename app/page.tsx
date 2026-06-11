import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Why from "./components/Why";
import Ablauf from "./components/Ablauf";
import Foerderung from "./components/Foerderung";
import Traumbad from "./components/Traumbad";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <Services />
        <Why />
        <Ablauf />
        <Foerderung />
        <Traumbad />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
