import { Footer } from "../components/Footer";
import { LandingNavbar } from "../components/LandingNavbar";
import { useRef } from "react";
import { LandingHeroSection } from "../components/LandingHeroSection";
import { LandingFeaturesSection } from "../components/LandingFeaturesSection";
import { LandingStepsSection } from "../components/LandingStepsSection";

const Landing = () => {
  const featuresRef = useRef<HTMLDivElement>(null);

  const scrollToFeatures = () => {
    if (featuresRef.current) {
      featuresRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <LandingNavbar />
      <LandingHeroSection scrollToFeatures={scrollToFeatures} />
      <LandingFeaturesSection ref={featuresRef} />
      <LandingStepsSection />
      <div className="my-12">
        <Footer />
      </div>
    </div>
  );
};

export default Landing;
