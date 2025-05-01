import { Layers } from "lucide-react";
import { Button } from "./ui/button";

export const LandingNavbar = () => {
  return (
    <div className="flex justify-between items-center p-6 max-w-7xl mx-auto">
      <div className="flex gap-3 items-center group cursor-pointer">
        <Layers
          size={38}
          className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30 transition-all duration-300 group-hover:shadow-blue-500/50 group-hover:scale-105"
        />
        <h1 className="text-2xl font-bold tracking-tight">Coretex</h1>
      </div>
      <div className="space-x-4">
        <Button variant="ghost" className="text-lg hover:bg-secondary/80">
          Login
        </Button>
        <Button
          variant="default"
          className="text-lg dark:text-white text-black bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          Sign up
        </Button>
      </div>
    </div>
  );
};
