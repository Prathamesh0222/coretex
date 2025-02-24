import { useNavigate } from "react-router-dom";
import { Button } from "./Button";
import { Spotlight } from "./Spotlight";
import { motion } from "framer-motion";

export const LandingHeroSection = ({
  scrollToFeatures,
}: {
  scrollToFeatures: () => void;
}) => {
  const navigate = useNavigate();
  return (
    <div className="h-[54rem] md:h-[60rem] dark:bg-black w-full bg-white dark:bg-grid-white/[0.1] bg-grid-black/[0.5] relative flex items-center justify-center">
      <div className="absolute pointer-events-none w-full inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <Spotlight
        className="hidden md:block left-0 top-0 sm:left-20 sm:top-10 md:left-40 md:top-20 lg:left-60 lg:top-30"
        fill="#0066ff"
      />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          type: "spring",
        }}
        className="flex-grow text-center px-4 md:px-8 lg:px-10 mt-20 mb-2 tracking-tighter"
      >
        <span className="hidden md:inline rounded-xl border border-blue-500 border-opacity-25 p-2 bg-dark-300 text-xs sm:text-sm font-sans text-white">
          <span className="text-blue-500"># </span>
          ContentSimplified
        </span>
        <h1 className="text-5xl md:text-6xl font-semibold mt-4 md:px-2 px-0">
          Welcome to{" "}
          <span className="text-blue-600 underline underline-offset-8">
            Brainly
          </span>
        </h1>
        <p className="text-md md:text-xl text-gray-400 mt-5 px-4 sm:px-0">
          Your second brain for all your content—save YouTube, Twitter, and
          <br className="hidden sm:block" />
          notes all in one place. Share with others, keep control of your
          thoughts.
        </p>
        <div className="flex justify-center mt-6 gap-4 flex-wrap px-4">
          <Button
            onClick={() => {
              navigate("/signin");
            }}
            text="Get Started"
            variant="primary"
            fontWeight="md"
            className="flex w-full sm:w-auto"
          />
          <Button
            onClick={scrollToFeatures}
            text="Features"
            variant="border"
            fontWeight="md"
            className="flex w-full sm:w-auto"
          />
        </div>
      </motion.div>
    </div>
  );
};
