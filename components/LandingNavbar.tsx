"use client";

import { Layers, Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";

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
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="border-b border-border/50 w-full z-10 relative"
    >
      <div className="max-w-6xl mx-auto border-x border-border/50 flex justify-between items-center w-full p-4">
        <div className="flex gap-3 items-center group cursor-pointer">
          <Layers
            size={38}
            className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30 transition-all duration-300 group-hover:shadow-blue-500/50 group-hover:scale-105"
          />
          <h1 className="text-lg font-bold tracking-tight">Coretex</h1>
        </div>
        <div className="gap-2 md:gap-0 md:space-x-4 items-center flex">
          <Button variant={"ghost"} onClick={() => handleTheme()}>
            {theme === "dark" ? <Sun /> : <Moon />}
          </Button>
          <Button
            variant="outline"
            className="text-sm cursor-pointer font-semibold"
            onClick={() => {
              router.push("/signin");
            }}
          >
            Login
          </Button>
          <Button
            variant="default"
            className="text-sm cursor-pointer font-semibold"
            onClick={() => {
              router.push("/signup");
            }}
          >
            Sign up
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
