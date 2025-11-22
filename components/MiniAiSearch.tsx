import { BrainCircuit, Music, Send, Youtube } from "lucide-react";
import { Input } from "./ui/input";

export const MiniAISearch = () => {
  return (
    <div className="bg-background border border-border dark:border-border/50 rounded-lg md:rounded-xl w-full space-y-2 md:space-y-3 pb-10 md:pb-12">
      <div className="flex items-center gap-1.5 md:gap-2 p-2 md:p-3 border-b border-border/50">
        <div className="p-1 md:p-1.5 rounded-md md:rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20">
          <BrainCircuit className="h-3 w-3 md:h-4 md:w-4 text-blue-500" />
        </div>
        <span className="text-xs md:text-sm font-semibold">Search Results</span>
      </div>
      <div className="px-2 md:px-3 space-y-2 md:space-y-3">
        <div className="flex justify-end">
          <div className="bg-blue-400 text-white rounded-2xl rounded-tr-sm px-2 md:px-3 py-1.5 md:py-2 max-w-[75%]">
            <p className="text-[10px] md:text-xs font-semibold">
              Find motivational content
            </p>
          </div>
        </div>
        <div className="flex items-start gap-1.5 md:gap-2">
          <div className="space-y-1.5 md:space-y-2 flex-1">
            <p className="text-[9px] md:text-[10px] text-muted-foreground">
              Found 3 results matching your query
            </p>
            <div className="space-y-1 md:space-y-1.5 max-w-xs">
              <div className="bg-red-50 dark:bg-red-950/20 border-l-2 rounded border-red-500 p-1.5 md:p-2">
                <div className="flex items-center gap-1 md:gap-1.5 mb-1.5 md:mb-2">
                  <Youtube size={10} className="md:w-3 md:h-3 text-red-500" />
                  <span className="text-[10px] md:text-xs font-semibold">
                    Motivational Speech
                  </span>
                </div>
                <div className="h-1 md:h-1.5 bg-foreground/10 rounded w-3/4" />
                <div className="h-1 md:h-1.5 bg-foreground/10 rounded w-2/3 mt-1.5 md:mt-2" />
              </div>
              <div className="bg-green-50 dark:bg-green-950/20 border-l-2 border-green-500 rounded p-1.5 md:p-2">
                <div className="flex items-center gap-1 md:gap-1.5 mb-1.5 md:mb-2">
                  <Music
                    size={8}
                    className="md:w-2.5 md:h-2.5 text-green-500"
                  />
                  <span className="text-[10px] md:text-xs font-semibold">
                    Workout Playlist
                  </span>
                </div>
                <div className="h-1 md:h-1.5 bg-foreground/10 rounded w-3/4" />
                <div className="h-1 md:h-1.5 bg-foreground/10 rounded w-2/3 mt-1.5 md:mt-2" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-2 md:p-3 border-t border-border/50">
        <div className="relative">
          <Input
            placeholder="Ask about your content..."
            className="w-full text-[10px] md:text-xs py-4 md:py-5 border bg-muted"
            disabled
          />
          <div className="absolute right-1.5 md:right-2 top-1/2 -translate-y-1/2 p-1 md:p-1.5 bg-blue-600 rounded-full">
            <Send className="h-3 w-3 md:h-4 md:w-4 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};
