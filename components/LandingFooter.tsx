'use client';

import { Github, Linkedin } from "lucide-react";

export const LandingFooter = () => {
  const handleLinkedinClick = () => {
    window.open('https://www.linkedin.com/in/prathamesh-pimpalkar-903b0621a/', '_blank');
  }

  const handleGithubClick = () => {
    window.open('https://github.com/Prathamesh0222', '_blank');
  }

  return (
    <div className="container mx-auto p-3 flex justify-between text-muted-foreground pb-8">
      <h1>Developed & Designed By Prathamesh</h1>
      <span className="flex gap-4">
        <Github onClick={handleGithubClick} className="cursor-pointer hover:scale-115 hover:-rotate-12" />
        <Linkedin onClick={handleLinkedinClick} className="cursor-pointer hover:scale-115 hover:-rotate-12" />
      </span>
    </div>
  );
};
