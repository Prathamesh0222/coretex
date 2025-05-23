"use client";

import { Layers, Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export const LandingNavbar = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  if (!mounted) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        delay: 0.4,
        type: "spring",
        stiffness: 100,
        damping: 17,
      }}
      className="flex justify-between items-center p-6 max-w-7xl mx-auto z-10 relative"
    >
      <div className="flex gap-3 items-center group cursor-pointer">
        <Layers
          size={38}
          className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30 transition-all duration-300 group-hover:shadow-blue-500/50 group-hover:scale-105"
        />
        <h1 className="text-lg md:text-2xl font-bold tracking-tight">
          Coretex
        </h1>
      </div>
      <div className="gap-2 md:gap-0 md:space-x-4 items-center flex">
        <Button variant={"ghost"} onClick={() => handleTheme()}>
          {theme === "dark" ? <Sun /> : <Moon />}
        </Button>
        <Button
          variant="outline"
          className="text-md hover:bg-secondary/80 cursor-pointer font-medium"
          onClick={() => {
            router.push("/signin");
          }}
        >
          Login
        </Button>
        <Button
          variant="default"
          className="text-md dark:text-white text-black bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer font-medium"
          onClick={() => {
            router.push("/signup");
          }}
        >
          Sign up
        </Button>
      </div>
    </motion.div>
  );
};
