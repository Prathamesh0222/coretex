import { motion } from "framer-motion";
import { forwardRef } from "react";
import { LandingCard } from "./LandingCard";
import { features } from "../lib/ConstantVals";

export const LandingFeaturesSection = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{
        duration: 0.8,
        delay: 0.8,
        type: "spring",
      }}
      ref={ref}
      className="max-w-7xl mx-auto mt-12"
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
    </motion.div>
  );
});
