import { Github, Linkedin } from "lucide-react";

export const LandingFooter = () => {
  return (
    <div className="container mx-auto p-3 flex justify-between text-muted-foreground pb-8">
      <h1>Developed & Designed By Prathamesh</h1>
      <span className="flex gap-4">
        <Github className="cursor-pointer hover:scale-115 hover:-rotate-12" />
        <Linkedin className="cursor-pointer hover:scale-115 hover:-rotate-12" />
      </span>
    </div>
  );
};
