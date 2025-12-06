"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const LandingImages = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const isDark = theme === "dark";
  const imageSrc = isDark
    ? "https://res.cloudinary.com/ddsyzx9hf/image/upload/v1765025573/sample_coretex_dark_csbzwo.png"
    : "https://res.cloudinary.com/ddsyzx9hf/image/upload/v1765025573/sample_coretex_light_gcoab6.png";
  const imageSrc2 = isDark
    ? "https://res.cloudinary.com/ddsyzx9hf/image/upload/v1765025573/sample_coretex1_dark_t3tbkn.png"
    : "https://res.cloudinary.com/ddsyzx9hf/image/upload/v1765025572/sample_coretex1_light_cxiby0.png";

  return (
    <div className="relative">
      <div className="absolute inset-x-0 bottom-0 h-40 md:h-100 w-full mask-t-from-10% bg-background z-50 " />
      <div className="relative min-h-72 sm:min-h-80 md:min-h-100 lg:min-h-140 pt-20 perspective-distant translate-x-10 md:translate-x-25 -translate-y-30">
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="perspective-[4000px] -translate-y-10"
        >
          <Image
            alt="Coretex Dashboard Preview"
            src={imageSrc2}
            height={1080}
            width={1920}
            className="rounded-lg border mask-r-from-50% mask-b-from-50% shadow-2xl"
            priority
            style={{
              transform: "rotateY(20deg) rotateX(40deg) rotateZ(-20deg)",
            }}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2, ease: "easeInOut" }}
          className="perspective-[4000px] md:-translate-y-10 absolute inset-0"
        >
          <Image
            alt="Coretex Dashboard Preview"
            src={imageSrc}
            height={1080}
            width={1920}
            className="rounded-lg mask-r-from-70% mask-b-from-70% shadow-2xl"
            priority
            style={{
              transform: "rotateY(20deg) rotateX(40deg) rotateZ(-20deg)",
            }}
          />
        </motion.div>
      </div>
    </div>
  );
};
