import { Hero } from "@/components/Hero";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { LandingCTA } from "@/components/LandingCTA";
import { LandingFeatures } from "@/components/LandingFeatures";
import { LandingFooter } from "@/components/LandingFooter";
import { LandingNavbar } from "@/components/LandingNavbar";
import { redirect } from "next/navigation";
import { authOptions } from "./config/auth.config";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    redirect("/dashboard");
  }

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
