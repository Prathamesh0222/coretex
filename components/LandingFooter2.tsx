import { ArrowRight, Layers } from "lucide-react";
import { Button } from "./ui/button";

export const LandingFooter2 = () => {
  return (
    <div className="flex flex-col justify-center items-center text-center space-y-4 my-24">
      <Layers
        size={60}
        className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30 transition-all duration-300 group-hover:shadow-blue-500/50 group-hover:scale-105"
      />
      <h1 className="text-3xl">
        Build your second brain - free, simple, and powerful.
      </h1>
      <h1 className="text-2xl text-muted-foreground">
        Organize smarter, create faster -
        <span className="text-purple-500"> start now.</span>
      </h1>
      <Button className="mt-2 font-medium">
        Get Started <ArrowRight />
      </Button>
    </div>
  );
};
