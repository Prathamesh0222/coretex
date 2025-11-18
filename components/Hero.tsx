"use client";

import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { LandingImages } from "./LandingImages";

export const Hero = () => {
  return (
    <div className="border-b border-border/50">
      <div className="max-w-6xl mx-auto border-x border-border/50 pt-10 md:pt-20 lg:pt-32 relative overflow-hidden h-screen flex flex-col justify-center items-start">
        <div className="space-y-6 relative z-10 mb-40 md:mb-20 flex flex-col items-start w-full mt-20 mx-8 md:mt-60">
          <h1 className="text-3xl md:text-6xl font-bold">
            Expand your mind. <br /> Organize your world.
          </h1>
          <p className="text-muted-foreground md:text-lg text-sm leading-relaxed">
            Coretex lets you save videos, tweets, playlist <br /> and notes in
            one place and keeping your ideas <br /> organized and accessible.
          </p>
          <Button className="rounded-full font-medium hover:scale-105 transition-transform duration-300 cursor-pointer">
            Get Started <ArrowRight size={16} className="ml-2" />
          </Button>
        </div>
        <LandingImages />
      </div>
    </div>
  );
};
