import { Layers, Music, Notebook, Twitter, Youtube } from "lucide-react";

export const MiniSidebar = () => {
  return (
    <div className="bg-background border border-border dark:border-border/50 rounded-lg md:rounded-xl p-3 md:p-4 space-y-2 md:space-y-3 w-full relative pb-8 md:pb-10">
      <div className="flex items-center gap-1.5 md:gap-2 pb-2 md:pb-3 border-b border-border/50">
        <Layers
          size={20}
          className="md:w-[25px] md:h-[25px] p-0.5 md:p-1 rounded-md md:rounded-lg bg-blue-500 text-white"
        />
        <span className="text-xs md:text-sm font-bold">Coretex</span>
      </div>
      <div className="space-y-3 md:space-y-5">
        <div className="bg-blue-400 text-white rounded-md md:rounded-lg p-2 md:p-2.5 flex items-center gap-1.5 md:gap-2">
          <Layers size={12} className="md:w-3.5 md:h-3.5" />
          <span className="text-[10px] md:text-xs font-semibold">
            Dashboard
          </span>
        </div>
        <div className="bg-muted/30 rounded-md md:rounded-lg p-2 md:p-2.5 flex items-center gap-1.5 md:gap-2">
          <Youtube size={12} className="md:w-3.5 md:h-3.5 text-red-500" />
          <span className="text-[10px] md:text-xs font-semibold">YouTube</span>
        </div>
        <div className="bg-muted/30 rounded-md md:rounded-lg p-2 md:p-2.5 flex items-center gap-1.5 md:gap-2">
          <Twitter size={12} className="md:w-3.5 md:h-3.5 text-blue-500" />
          <span className="text-[10px] md:text-xs font-semibold">Twitter</span>
        </div>
        <div className="bg-muted/30 rounded-md md:rounded-lg p-2 md:p-2.5 flex items-center gap-1.5 md:gap-2">
          <Music size={12} className="md:w-3.5 md:h-3.5 text-green-500" />
          <span className="text-[10px] md:text-xs font-semibold">Spotify</span>
        </div>
        <div className="bg-muted/30 rounded-md md:rounded-lg p-2 md:p-2.5 flex items-center gap-1.5 md:gap-2">
          <Notebook size={12} className="md:w-3.5 md:h-3.5 text-yellow-500" />
          <span className="text-[10px] md:text-xs font-semibold">Notes</span>
        </div>
      </div>
    </div>
  );
};
