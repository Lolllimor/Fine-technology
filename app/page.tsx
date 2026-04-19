import { About } from "@/components/landing/About";
import { Contact } from "@/components/landing/Contact";
import { Hero } from "@/components/landing/Hero";
import { LandingCards } from "@/components/landing/LandingCards";
import { Portfolio } from "@/components/landing/Portfolio";
import { ProductsFeature } from "@/components/landing/ProductsFeature";
import { ServicesAccordion } from "@/components/landing/ServicesAccordion";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { Testimonials } from "@/components/landing/Testimonials";

export default function Home() {
  return (
    <div className="flex min-h-full min-w-0 flex-col bg-[#023048] font-sans pb-[env(safe-area-inset-bottom)]">
      <Hero />
      <LandingCards />
      <About />
      <ServicesAccordion />
      <ProductsFeature />
      <Portfolio />
      <Testimonials />
      <Contact />
      <SiteFooter />
    </div>
  );
}
