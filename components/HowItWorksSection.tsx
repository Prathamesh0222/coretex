"use client";

import { steps } from "@/app/utils/mapData";
import { Badge } from "./ui/badge";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export const HowItWorksSection = () => {
  const titleRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(titleRef, {
    once: false,
  });
  return (
    <div className="container mx-auto mt-28">
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-accent/5 filter blur-3xl"></div>
        <div className="absolute bottom-40 left-10 w-40 h-40 rounded-full bg-accent/10 filter blur-2xl"></div>
      </div>
      <motion.div
        ref={titleRef}
        initial={{ y: -50, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
        transition={{
          duration: 0.3,
          delay: 0.4,
          type: "spring",
          stiffness: 100,
          damping: 17,
        }}
        className="flex flex-col justify-center text-center items-center mt-12"
      >
        <Badge
          className="border border-blue-500/40 shadow shadow-blue-500 font-semibold tracking-tight rounded-xl"
          variant={"outline"}
        >
          Easy to Use
        </Badge>
        <h1 className="text-5xl font-semibold text-center mt-2">
          How It Works
        </h1>
      </motion.div>
      <div className=" grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 mx-18">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
              duration: 0.3,
              delay: index * 0.1,
              type: "spring",
              damping: 10,
              stiffness: 100,
            }}
          >
            <div className="flex justify-center items-center mb-12">
              <div
                className={`p-3 text-center rounded-full border font-semibold w-12 ${step.color} ${step.borderColor}`}
              >
                {index}
              </div>
            </div>
            <div
              className={`border mb-12 w-full ${step.color} ${step.borderColor}`}
            />
            <div>
              <div
                className={`p-6 border rounded-lg space-y-4 ${step.color} ${step.borderColor}`}
              >
                <div className="text-xl font-semibold text-center">
                  {step.title}
                </div>
                <p className="text-muted-foreground text-center">
                  {step.steps}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
