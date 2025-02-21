import { motion } from "framer-motion";
import { steps } from "../lib/ConstantVals";

export const LandingStepsSection = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{
          duration: 0.8,
          delay: 0.9,
          type: "spring",
        }}
        className="mx-8 mt-28"
      >
        <h3 className="text-lg text-blue-500">HOW IT WORKS </h3>
        <h1 className="text-4xl font-bold">Simple steps to get started</h1>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{
          duration: 0.9,
          delay: 0.9,
          type: "spring",
        }}
        className=" grid grid-cols-1 gap-12 lg:grid-cols-4 mt-16 mb-12"
      >
        {steps.map((step, index) => (
          <div key={step.name} className="relative">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto mb-5 hover:scale-110">
              {step.icon}
            </div>
            <div className="text-center">
              <h3 className="text-lg font-medium">
                {index + 1}. {step.name}
              </h3>
              <p className="mt-2 text-base text-gray-500 mx-12">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};
