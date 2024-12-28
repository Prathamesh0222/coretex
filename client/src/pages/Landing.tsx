import {
  Brain,
  FolderOpen,
  Lock,
  PenTool,
  Save,
  Share,
  Share2,
  Twitter,
  Youtube,
} from "lucide-react";
import { Button } from "../components/Button";
import { Footer } from "../components/Footer";
import { LandingCard } from "../components/LandingCard";
import { LandingNavbar } from "../components/LandingNavbar";
import { Spotlight } from "../components/Spotlight";
import { motion } from "framer-motion";
import { useRef } from "react";

const features = [
  {
    name: "Store and Organize Content",
    description:
      "Save content from YouTube, Twitter, and more directly into your personal second brain.",
    icon: <Brain />,
  },
  {
    name: "Easy to Use Embeds",
    description:
      "Experience content directly within your second brain—YouTube and Twitter content appears exactly like it does on their platforms.",
    icon: <Youtube />,
  },
  {
    name: "Note-Taking Made Simple",
    description:
      "Take notes alongside your links. Organize thoughts and media in one place.",
    icon: <PenTool />,
  },
  {
    name: "Control Your Content",
    description:
      "You own your notes—share read-only access with others, while you keep full editing rights.",
    icon: <Lock />,
  },
  {
    name: "Secure Sharing",
    description:
      "Share your brains content with others via a unique link, allowing others to read but not edit your work.",
    icon: <Share2 />,
  },
  {
    name: "Social Integration",
    description:
      "Seamlessly integrate with your favorite social platforms for quick and easy content saving.",
    icon: <Twitter />,
  },
];

const steps = [
  {
    name: "Save Content",
    description: "Save content from YouTube, Twitter, or take notes.",
    icon: <Save />,
  },
  {
    name: "Organize",
    description: "Organize everything in your personal Second Brain.",
    icon: <FolderOpen />,
  },
  {
    name: "Share",
    description: "Share with friends or colleagues via a sharable link.",
    icon: <Share />,
  },
  {
    name: "Control",
    description: "Keep control: only you can edit your content.",
    icon: <Lock />,
  },
];

const Landing = () => {
  const featuresRef = useRef<HTMLDivElement>(null);

  const scrollToFeatures = () => {
    if (featuresRef.current) {
      featuresRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col min-w-full min-h-screen bg-black text-white">
      <LandingNavbar />
      <div className="h-[50rem] dark:bg-black w-full bg-white dark:bg-grid-white/[0.1] bg-grid-black/[0.5] relative flex items-center justify-center">
        <div className="absolute pointer-events-none w-full inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <Spotlight
          className="left-0 top-0 sm:left-20 sm:top-10 md:left-40 md:top-20 lg:left-60 lg:top-30"
          fill="#0066ff"
        />
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.5,
            type: "spring",
          }}
          className="flex-grow text-center px-4 sm:px-6 md:px-8 lg:px-10"
        >
          <span className="rounded-xl border border-blue-500 border-opacity-25 p-2 bg-dark-300 text-sm font-sans text-white">
            <span className="text-blue-500"># </span>
            ContentSimplified
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold mt-4">
            Welcome to <span className="text-blue-600">Brainly</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 mt-2">
            Your second brain for all your content—save YouTube, Twitter, and{" "}
            <br />
            notes all in one place. Share with others, keep control of your
            thoughts.
          </p>
          <div className="flex justify-center mt-6 gap-4 flex-wrap">
            <Button text="Get Started" variant="primary" />
            <Button
              onClick={scrollToFeatures}
              text="Features"
              variant="border"
            />
          </div>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay: 0.8,
          type: "spring",
        }}
        ref={featuresRef}
        className="container mx-auto mt-12"
      >
        <div className="mx-8">
          <h3 className="text-lg text-blue-500">FEATURES</h3>
          <h1 className="text-4xl font-bold">Why Choose Brainly?</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {features.map((feature) => (
            <LandingCard
              title={feature.name}
              text={feature.description}
              icon={feature.icon}
            />
          ))}
        </div>
        <div className="mx-8 mt-28">
          <h3 className="text-lg text-blue-500">HOW IT WORKS </h3>
          <h1 className="text-4xl font-bold">Simple steps to get started</h1>
        </div>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4 mt-16 mb-12">
          {steps.map((step, index) => (
            <div key={step.name} className="relative">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto mb-5 hover:scale-110">
                {step.icon}
              </div>
              <div className="text-center">
                <h3 className="text-lg font-medium">
                  {index + 1}. {step.name}
                </h3>
                <p className="mt-2 text-base text-gray-500">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
      <div className="my-12">
        <Footer />
      </div>
    </div>
  );
};

export default Landing;
