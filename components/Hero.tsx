"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(heroRef, {
    once: false,
  });
  return (
    <motion.div
      ref={heroRef}
      initial={{ y: 50, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
      transition={{
        duration: 0.4,
        delay: 0.6,
        type: "spring",
        stiffness: 100,
        damping: 17,
      }}
      className="container mx-auto h-screen flex flex-col justify-center text-center items-center relative lg:mt-32 2xl:mt-12"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-blue-500/5 via-transparent to-transparent rounded-full blur-3xl" />
      <div className="py-1 px-4 items-center border rounded-full bg-secondary/80 backdrop-blur-sm font-medium text-muted-foreground mb-2 hover:scale-105 transition-transform duration-300 cursor-default xl:mt-64">
        <span className="flex text-sm items-center gap-2">
          <h2>Introducing Coretex</h2>
          <ArrowRight size={12} className="animate-pulse" />
        </span>
      </div>

      <div className="space-y-6 relative z-10">
        <span className="tracking-tighter leading-none block">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold">
            Expand your mind.
          </h1>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold">
            Organize your world.
          </h1>
        </span>

        <span className="text-muted-foreground/90 block md:text-lg text-base mx-8 sm:mx-24 md:mx-38 xl:mx-80">
          <p>
            Coretex lets you save videos, tweets, playlist and notes in one
            place and keeping your ideas organized and accessible.
          </p>
        </span>
      </div>

      <div className="relative mt-20 w-full">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl blur dark:opacity-30 opacity-70 group-hover:opacity-100 transition duration-1000"></div>
        <div className="flex relative border p-0.5 bg-accent rounded-xl backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 lg:w-5xl xl:w-7xl">
          <Image
            alt="Coretex Dashboard Preview"
            src="/screenshot_coretex.png"
            height={998}
            width={1916}
            className="rounded-lg border shadow-sm"
            priority
          />
        </div>
      </div>
    </motion.div>
  );
};
