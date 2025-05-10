"use client";

import { Github, Linkedin } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export const LandingFooter = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(footerRef, {
    once: false,
  });
  const handleLinkedinClick = () => {
    window.open(
      "https://www.linkedin.com/in/prathamesh-pimpalkar-903b0621a/",
      "_blank"
    );
  };

  const handleGithubClick = () => {
    window.open("https://github.com/Prathamesh0222", "_blank");
  };

  return (
    <motion.div
      ref={footerRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
      transition={{
        duration: 0.4,
        delay: 0.3,
        type: "spring",
        damping: 10,
        stiffness: 100,
      }}
      className="container mx-auto p-3 flex justify-between text-muted-foreground pb-8"
    >
      <h1>Developed & Designed By Prathamesh</h1>
      <span className="flex gap-4">
        <Github
          onClick={handleGithubClick}
          className="cursor-pointer hover:scale-115 hover:-rotate-12"
        />
        <Linkedin
          onClick={handleLinkedinClick}
          className="cursor-pointer hover:scale-115 hover:-rotate-12"
        />
      </span>
    </motion.div>
  );
};
