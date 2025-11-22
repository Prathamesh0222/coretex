"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

export const LandingCTA = () => {
  return (
    <div className="border-b border-border/50">
      <div className="max-w-6xl mx-auto border-x border-border/50 py-24 md:py-32 px-6 text-center relative">
        <div className="absolute -top-1 -left-[1px] -translate-x-1/2 w-2 h-2 dark:bg-white bg-neutral-950 rounded-full border border-neutral-800 z-20" />
        <div className="absolute -top-1 -right-[1px] translate-x-1/2 w-2 h-2 dark:bg-white bg-neutral-950 rounded-full border border-neutral-800 z-20" />
        <div className="absolute -bottom-1 -left-[1px] -translate-x-1/2 w-2 h-2 dark:bg-white bg-neutral-950 rounded-full border border-neutral-800 z-20" />
        <div className="absolute -bottom-1 -right-[1px] translate-x-1/2 w-2 h-2 dark:bg-white bg-neutral-950 rounded-full border border-neutral-800 z-20" />
        <h2 className="text-4xl font-bold tracking-tight mb-6">
          Build your second brain. <br className="hidden md:block" />
          Simple. Powerful. Free.
        </h2>
        <p className="text-base mb-6 max-w-2xl mx-auto leading-relaxed">
          Join thousands of users who are organizing <br />
          their digital life smarter and creating faster. <br />
          No credit card required.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <Button className="h-9 cursor-pointer rounded-full font-semibold">
            Start Building <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
