import { Github, Linkedin } from "lucide-react";

export const LandingFooter = () => {
  return (
    <div className="container mx-auto p-4 flex justify-between text-muted-foreground">
      <h1>Developed & Designed By Prathamesh</h1>
      <span className="flex gap-4">
        <Github />
        <Linkedin />
      </span>
    </div>
  );
};
