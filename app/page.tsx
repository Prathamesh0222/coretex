import { Hero } from "@/components/Hero";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { LandingConstants } from "@/components/LandingConstants";
import { LandingFeatures } from "@/components/LandingFeatures";
import { LandingFooter } from "@/components/LandingFooter";
import { LandingFooter2 } from "@/components/LandingFooter2";
import { LandingNavbar } from "@/components/LandingNavbar";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto h-screen">
      <LandingNavbar />
      <Hero />
      <LandingFeatures />
      <HowItWorksSection />
      <LandingConstants />
      <LandingFooter2 />
      <LandingFooter />
    </div>
  );
}
