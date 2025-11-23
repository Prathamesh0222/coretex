"use client";

import { Github, Linkedin, Layers } from "lucide-react";
import Link from "next/link";

export const LandingFooter = () => {
  const socialLinks = [
    {
      name: "GitHub",
      href: process.env.GITHUB_URL,
      icon: Github,
      ariaLabel: "Visit GitHub profile",
    },
    {
      name: "LinkedIn",
      href: process.env.LINKEDIN_URL,
      icon: Linkedin,
      ariaLabel: "Connect on LinkedIn",
    },
  ];

  return (
    <footer className="border-b border-border/50 relative">
      <div className="max-w-6xl mx-auto border-x border-border/50 relative">
        <div className="absolute -top-1 -left-[1px] -translate-x-1/2 w-2 h-2 dark:bg-white bg-neutral-950 rounded-full border border-neutral-800 z-20" />
        <div className="absolute -top-1 -right-[1px] translate-x-1/2 w-2 h-2 dark:bg-white bg-neutral-950 rounded-full border border-neutral-800 z-20" />
        <div className="px-6 py-12 md:py-16">
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8 md:gap-12 mb-10">
            <div className="flex-1 max-w-sm space-y-4 text-center md:text-left">
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <Layers
                  size={36}
                  className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30"
                  aria-hidden="true"
                />
                <div>
                  <h2 className="text-xl font-bold tracking-tight">Coretex</h2>
                  <p className="text-xs text-muted-foreground">
                    Your Second Brain
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Organize your digital life with AI-powered search, smart tags,
                and seamless sharing. Built for creators, thinkers, and
                knowledge workers.
              </p>
            </div>
            <nav className="space-y-3" aria-label="Quick links">
              <h3 className="text-sm font-semibold tracking-tight text-center md:text-left">
                Quick Links
              </h3>
              <ul className="space-y-2 flex flex-col items-center md:items-start">
                <li>
                  <Link
                    href="/signin"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 inline-block hover:translate-x-1"
                  >
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link
                    href="/signup"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 inline-block hover:translate-x-1"
                  >
                    Get Started
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 inline-block hover:translate-x-1"
                  >
                    Dashboard
                  </Link>
                </li>
              </ul>
            </nav>
            <div className="space-y-3 text-center">
              <h3 className="text-sm font-semibold tracking-tight">Connect</h3>
              <div className="flex items-center gap-3 justify-center md:justify-start">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg border border-border/50 bg-background hover:bg-muted hover:border-border transition-all duration-300 hover:scale-110 group"
                    aria-label={social.ariaLabel}
                  >
                    <social.icon className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-border/50 pt-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
              <p className="text-center md:text-left">
                © {new Date().getFullYear()} Coretex. All rights reserved.
              </p>
              <div className="flex items-center gap-4">
                <button className="hover:text-foreground transition-colors duration-200">
                  Privacy
                </button>
                <span className="text-border">•</span>
                <button className="hover:text-foreground transition-colors duration-200">
                  Terms
                </button>
                <span className="text-border">•</span>
                <button className="hover:text-foreground transition-colors duration-200">
                  Cookies
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
