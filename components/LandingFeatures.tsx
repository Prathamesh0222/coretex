"use client";

import { Music, Twitter, Youtube } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { features } from "@/app/utils/mapData";

export const LandingFeatures = () => {
  const featureRef = useRef(null);
  const isInView = useInView(featureRef, {
    once: false,
  });

  return (
    <div className="container mx-auto md:mt-12 lg:mt-30 xl:mt-96 2xl:mt-80">
      <motion.div
        ref={featureRef}
        initial={{ y: 50, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
        transition={{
          duration: 0.3,
          delay: 0.2,
          type: "spring",
          stiffness: 100,
          damping: 17,
        }}
      >
        <span className="flex justify-center items-center gap-4">
          <div className="p-3 md:p-4 border-2 rounded-2xl -rotate-12 bg-gradient-to-br from-red-500/10 to-red-600/10 border-red-500/20 hover:border-red-500/40 hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-red-500/20">
            <Youtube className="w-8 h-8 text-red-600" />
          </div>
          <div className="p-3 md:p-4 border-2 rounded-2xl bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20 hover:border-blue-500/40 hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-blue-500/20">
            <Twitter className="w-8 h-8 text-blue-500" />
          </div>
          <div className="p-3 md:p-4 border-2 rounded-2xl rotate-12 bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/20 hover:border-green-500/40 hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-green-500/20">
            <Music className="w-8 h-8 text-green-600" />
          </div>
        </span>
        <h1 className="text-4xl md:text-5xl font-semibold text-center mt-7">
          Features
        </h1>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 px-4">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
              type: "spring",
              stiffness: 100,
              damping: 17,
            }}
            className="p-8 rounded-xl bg-background/50 backdrop-blur-sm hover:bg-accent/50 transition-all duration-300 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative z-10">
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>

              <h2 className="text-2xl font-semibold tracking-tight mb-3">
                {feature.title}
              </h2>

              <p className="text-muted-foreground/90 leading-relaxed">
                {feature.description}
              </p>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};
