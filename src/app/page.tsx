import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Benefits } from "@/components/sections/Benefits";
import { Pricing } from "@/components/sections/Pricing";
import { StationsSection } from "@/components/sections/StationsSection";
import { PartnerSection } from "@/components/sections/PartnerSection";
import { PartnerOffers } from "@/components/sections/PartnerOffers";
import { PartnerSimulator } from "@/components/sections/PartnerSimulator";
import { PartnerBenefits } from "@/components/sections/PartnerBenefits";
import { PartnerForm } from "@/components/sections/PartnerForm";
import { Manifesto } from "@/components/sections/Manifesto";
import { FAQ } from "@/components/sections/FAQ";
import { Footer } from "@/components/sections/Footer";
import { MobileCTA } from "@/components/sections/MobileCTA";
import { WaveDivider } from "@/components/graphics/WaveDivider";
import { JsonLd } from "@/components/JsonLd";

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="contenu" className="flex-1">
        <Hero />
        <WaveDivider className="bg-cream-50" fill="text-cream" />
        <HowItWorks />
        <Benefits />
        <Pricing />
        <StationsSection />
        <WaveDivider className="bg-cream-50" fill="text-night" />
        <PartnerSection />
        <PartnerOffers />
        <PartnerSimulator />
        <PartnerBenefits />
        <PartnerForm />
        <Manifesto />
        <FAQ />
        <WaveDivider className="bg-cream-50" fill="text-night" />
      </main>
      <Footer />
      <MobileCTA />
      <JsonLd />
    </>
  );
}
