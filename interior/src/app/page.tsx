import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Portfolio from "@/components/Portfolio";
import Services from "@/components/Services";
import Why from "@/components/Why";
import Process from "@/components/Process";
import Reviews from "@/components/Reviews";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import MobileCta from "@/components/MobileCta";
import Motion from "@/components/Motion";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Portfolio />
        <Services />
        <Why />
        <Process />
        <Reviews />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <MobileCta />
      <Motion />
    </>
  );
}
