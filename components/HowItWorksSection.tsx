"use client";

import React from "react";
import { Link as LinkIcon, Search, Share2, BrainCircuit } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type ColorKey = "blue" | "purple" | "green" | "orange";

interface Step {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: ColorKey;
}

export const HowItWorksSection = () => {
  const steps: Step[] = [
    {
      number: "01",
      title: "Capture",
      description:
        "Paste links from YouTube, Twitter, or Spotify. We centralize everything instantly.",
      icon: LinkIcon,
      color: "blue",
    },
    {
      number: "02",
      title: "Process",
      description:
        "Our AI analyzes content, generating auto-summaries and extracting key metadata.",
      icon: BrainCircuit,
      color: "purple",
    },
    {
      number: "03",
      title: "Organize",
      description:
        "Content is semantically indexed. Find ideas by meaning, not just exact keywords.",
      icon: Search,
      color: "green",
    },
    {
      number: "04",
      title: "Collaborate",
      description:
        "Curate collections and share knowledge with your team via a single secure link.",
      icon: Share2,
      color: "orange",
    },
  ];

  const StepCard = ({ step }: { step: Step }) => {
    const colorStyles = {
      blue: "text-blue-500 bg-blue-500/10",
      purple: "text-purple-500 bg-purple-500/10",
      green: "text-green-500 bg-green-500/10",
      orange: "text-orange-500 bg-orange-500/10",
    };

    const Icon = step.icon;

    return (
      <div className="group p-8 md:p-10 space-y-6 hover:bg-muted/30 transition-colors duration-300">
        <div className="flex items-start justify-between">
          <div
            className={`p-3 rounded-xl ${
              colorStyles[step.color]
            } transition-transform duration-300 group-hover:scale-110`}
          >
            <Icon className="w-6 h-6" />
          </div>
          <span className="text-4xl font-bold text-muted-foreground/20 font-mono select-none">
            {step.number}
          </span>
        </div>
        <div className="space-y-3">
          <h3 className="text-xl font-semibold tracking-tight">{step.title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {step.description}
          </p>
        </div>
      </div>
    );
  };

  return (
    <section className="border-b border-border/50">
      <div className="max-w-6xl mx-auto border-x border-border/50 relative">
        <div className="absolute -top-1 -left-[1px] -translate-x-1/2 w-2 h-2 dark:bg-white bg-black rounded-full border border-neutral-800 z-20" />
        <div className="absolute -top-1 -right-[1px] translate-x-1/2 w-2 h-2 dark:bg-white bg-neutral-950 rounded-full border border-neutral-800 z-20" />
        <div className="border-b border-border/50 p-8 md:p-16 text-center space-y-4 relative">
          <div className="absolute -bottom-5 -left-[1px] -translate-x-1/2 w-2 h-2 dark:bg-white bg-neutral-950 rounded-full border border-neutral-800 z-20" />
          <div className="absolute -bottom-5 -right-[1px] translate-x-1/2 w-2 h-2 dark:bg-white bg-neutral-950 rounded-full border border-neutral-800 z-20" />

          <p className="text-xs text-blue-400 font-semibold uppercase tracking-wider">
            Workflow
          </p>
          <h2 className="text-4xl font-bold tracking-tight">
            Knowledge management, <br className="hidden md:block" /> reimagined.
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Transform chaos into clarity. We handle the heavy lifting of tagging
            and organizing,
            <br /> so you can focus on creating.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-border/50">
          {steps.map((step) => (
            <StepCard key={step.number} step={step} />
          ))}
        </div>
      </div>
    </section>
  );
};
