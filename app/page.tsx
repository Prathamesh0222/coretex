import { Hero } from "@/components/Hero";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { LandingCTA } from "@/components/LandingCTA";
import { LandingFeatures } from "@/components/LandingFeatures";
import { LandingFooter } from "@/components/LandingFooter";
import { LandingNavbar } from "@/components/LandingNavbar";

export default async function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <LandingNavbar />
      <Hero />
      <HowItWorksSection />
      <LandingFeatures />
      <LandingCTA />
      <LandingFooter />
    </div>
  );
}
