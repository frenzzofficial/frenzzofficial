import { CtaBand } from "@/components/features/home/cta-band";
import { Faq } from "@/components/features/home/faq";
import { Hero } from "@/components/features/home/hero";
import { Marquee } from "@/components/features/home/marquee";
import { VenturesTimeline } from "@/components/features/home/ventures-timeline";
import { Footer } from "@/components/layouts/footer";
import Header from "@/components/layouts/Header";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Marquee />
      <VenturesTimeline />
      <Faq />
      <CtaBand />
      <Footer />
    </>
  );
}
