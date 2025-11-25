import {
  Youtube,
  Twitter,
  Music,
  Sparkles,
  BrainCircuit,
  Layers,
  Tag,
} from "lucide-react";
import { Badge } from "./ui/badge";
import { MiniAISearch } from "./MiniAiSearch";
import { MiniSidebar } from "./MiniSidebar";
import { MiniSpace } from "./MiniSpace";

export const LandingFeatures = () => {
  return (
    <div className="border-b border-border/50 relative">
      <div className="border-x border-border/50 max-w-6xl mx-auto relative">
        <div className="absolute -top-1 -left-[1px] -translate-x-1/2 w-2 h-2 dark:bg-white bg-black rounded-full border border-neutral-800 z-20" />
        <div className="absolute -top-1 -right-[1px] translate-x-1/2 w-2 h-2 dark:bg-white bg-neutral-950 rounded-full border border-neutral-800 z-20" />

        <div className="text-center space-y-3 md:space-y-4 py-8 md:py-12 lg:py-16 px-4 md:px-6 border-b border-border/50 relative">
          <div className="absolute -bottom-5 -left-[1px] -translate-x-1/2 w-2 h-2 dark:bg-white bg-neutral-950 rounded-full border border-neutral-800 z-20" />
          <div className="absolute -bottom-5 -right-[1px] translate-x-1/2 w-2 h-2 dark:bg-white bg-neutral-950 rounded-full border border-neutral-800 z-20" />
          <p className="text-xs text-blue-400 font-semibold uppercase tracking-wider">
            Features
          </p>
          <h2 className="text-4xl font-bold tracking-tight">
            Save anything. Find everything.
            <br />
            Share instantly.
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
            Capture content from anywhere, organize it with AI, and search it
            instantly. The ultimate workspace for your knowledge.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-6 md:p-8 lg:p-12 border-b md:border-b-0 md:border-r border-border/50 space-y-4 md:space-y-6 min-h-[400px] md:min-h-[450px] lg:min-h-[500px] relative overflow-hidden">
            <div className="space-y-2 md:space-y-3">
              <div className="flex items-center gap-2 md:gap-3">
                <BrainCircuit
                  size={24}
                  className="md:w-[30px] md:h-[30px] p-1.5 md:p-2 rounded-lg md:rounded-xl bg-blue-400 text-white"
                />
                <h3 className="text-lg md:text-xl font-semibold">
                  AI Vector Search
                </h3>
              </div>
              <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">
                Don&apos;t remember the exact title? Search by meaning. Ask
                &quot;motivational songs&quot; and find your saved Spotify
                tracks instantly with semantic search.
              </p>
            </div>
            <div className="absolute -bottom-12 w-full left-0 right-0 px-6 md:px-8 lg:px-12">
              <MiniAISearch />
            </div>
          </div>

          <div className="p-6 md:p-8 lg:p-12 border-b border-border/50 space-y-4 md:space-y-6 relative overflow-hidden min-h-[400px] md:min-h-[440px] lg:min-h-[480px]">
            <div className="space-y-2 md:space-y-3">
              <div className="flex items-center gap-2 md:gap-3">
                <Tag
                  size={24}
                  className="md:w-[30px] md:h-[30px] p-1.5 md:p-2 rounded-lg md:rounded-xl bg-blue-400 text-white"
                />
                <h3 className="text-lg md:text-xl font-semibold">
                  Smart Organization
                </h3>
              </div>
              <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">
                Organize content with smart tags and filters. Quickly switch
                between YouTube, Twitter, Spotify, and notes with our intuitive
                sidebar.
              </p>
            </div>
            <div className="absolute -bottom-8 w-full left-0 right-0 px-6 md:px-8 lg:px-12">
              <MiniSidebar />
            </div>
          </div>

          <div className="p-6 md:p-8 lg:p-12 border-t md:border-r border-border/50 space-y-4 md:space-y-6">
            <div className="space-y-2 md:space-y-3">
              <div className="flex items-center gap-2 md:gap-3">
                <Layers
                  size={24}
                  className="md:w-[30px] md:h-[30px] p-1.5 md:p-2 rounded-lg md:rounded-xl bg-blue-400 text-white"
                />
                <h3 className="text-lg md:text-xl font-semibold">
                  Organized Spaces
                </h3>
              </div>
              <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">
                Create dedicated spaces for work, personal projects, or ideas.
                Name them anything you want and organize your content exactly
                how you need it.
              </p>
            </div>
            <div className="space-y-2 md:space-y-3 pt-2">
              <MiniSpace
                name="Work Projects"
                color="blue"
                itemCount={12}
                items={["youtube", "notes", "twitter"]}
              />

              <div className="grid grid-cols-2 gap-2 md:gap-3">
                <MiniSpace
                  name="Inspiration"
                  color="green"
                  itemCount={15}
                  items={["twitter", "spotify", "youtube"]}
                />
                <MiniSpace
                  name="Ideas"
                  color="orange"
                  itemCount={6}
                  items={["notes", "twitter"]}
                />
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8 lg:p-12 space-y-4 md:space-y-6">
            <div className="space-y-2 md:space-y-3">
              <div className="flex items-center gap-2 md:gap-3">
                <Sparkles
                  size={24}
                  className="md:w-[30px] md:h-[30px] p-1.5 md:p-2 rounded-lg md:rounded-xl bg-blue-400 text-white"
                />
                <h3 className="text-lg md:text-xl font-semibold">
                  Smart Summaries & Tags
                </h3>
              </div>
              <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">
                AI-generated summaries save you time. Tag your content for quick
                filtering and never lose track of important information again.
              </p>
            </div>
            <div className="pt-2 space-y-2 md:space-y-3">
              <div className="border border-border dark:border-border/50 rounded-lg md:rounded-xl overflow-hidden bg-background">
                <div className="p-2 md:p-3 border-b border-border dark:border-border/50 flex items-center gap-1.5 md:gap-2">
                  <div className="p-1 md:p-1.5 border rounded-full bg-red-500/20">
                    <Youtube size={10} className="md:w-3 md:h-3 text-red-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs md:text-sm font-semibold truncate">
                      The Science of Productivity
                    </p>
                    <Badge
                      variant="outline"
                      className="text-[8px] md:text-[9px] font-semibold border border-red-400/40 bg-red-600/10 text-red-500"
                    >
                      YOUTUBE
                    </Badge>
                  </div>
                </div>

                <div className="bg-muted/30 h-20 md:h-25 flex items-center justify-center border-b border-border dark:border-border/50">
                  <div className="p-1.5 md:p-2 rounded-full bg-red-500/20">
                    <Youtube size={14} className="md:w-4 md:h-4 text-red-500" />
                  </div>
                </div>

                <div className="p-2 md:p-3 bg-red-500/5 border-b border-red-500/20 dark:border-red-500/20">
                  <div className="flex items-center gap-1 md:gap-1.5 mb-1.5 md:mb-2">
                    <Sparkles
                      size={10}
                      className="md:w-3 md:h-3 text-red-500"
                    />
                    <span className="text-[10px] md:text-xs font-semibold uppercase text-muted-foreground">
                      AI Summary
                    </span>
                  </div>
                  <p className="text-[10px] md:text-xs leading-relaxed text-foreground/80">
                    Learn science-backed techniques to boost productivity.
                    Covers time management, focus strategies, and habit
                    formation for maximum efficiency.
                  </p>
                </div>

                <div className="p-2 md:p-3">
                  <div className="flex flex-wrap gap-1 md:gap-1.5">
                    <Badge
                      variant="outline"
                      className="bg-red-600/10 text-red-500 text-[8px] md:text-[9px] font-semibold border border-red-500/20 px-1.5 md:px-2 py-0.5 rounded-md"
                    >
                      PRODUCTIVITY
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-red-600/10 text-red-500 text-[8px] md:text-[9px] font-semibold border border-red-500/20 px-1.5 md:px-2 py-0.5 rounded-md"
                    >
                      SCIENCE
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-red-600/10 text-red-500 text-[8px] md:text-[9px] font-semibold border border-red-500/20 px-1.5 md:px-2 py-0.5 rounded-md"
                    >
                      LEARNING
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-1.5 md:gap-2">
                <div className="border border-border dark:border-border/50 rounded-md md:rounded-lg p-1.5 md:p-2.5 bg-background space-y-1.5 md:space-y-2">
                  <div className="flex items-center gap-1 md:gap-1.5">
                    <Twitter
                      size={8}
                      className="md:w-2.5 md:h-2.5 text-blue-500"
                    />
                    <div className="h-1 md:h-1.5 bg-foreground/10 rounded w-12 md:w-16" />
                  </div>
                  <div className="bg-blue-500/5 border border-blue-500/20 dark:border-blue-500/20 rounded p-1.5 md:p-2 space-y-0.5 md:space-y-1">
                    <div className="flex items-center gap-0.5 md:gap-1">
                      <Sparkles
                        size={6}
                        className="md:w-2 md:h-2 text-blue-500"
                      />
                      <div className="h-0.5 md:h-1 bg-blue-500/20 rounded w-8 md:w-12" />
                    </div>
                    <div className="h-0.5 md:h-1 bg-foreground/10 rounded w-full" />
                    <div className="h-0.5 md:h-1 bg-foreground/10 rounded w-3/4" />
                  </div>
                  <div className="flex gap-0.5 md:gap-1">
                    <div className="px-1 md:px-1.5 py-0.5 rounded bg-blue-600/10 border border-blue-500/20">
                      <div className="h-0.5 md:h-1 bg-blue-500/40 rounded w-6 md:w-8" />
                    </div>
                  </div>
                </div>

                <div className="border border-border dark:border-border/50 rounded-md md:rounded-xl p-1.5 md:p-2.5 bg-background space-y-1.5 md:space-y-2">
                  <div className="flex items-center gap-1 md:gap-1.5">
                    <Music
                      size={8}
                      className="md:w-2.5 md:h-2.5 text-green-500"
                    />
                    <div className="h-1 md:h-1.5 bg-foreground/10 rounded w-12 md:w-16" />
                  </div>
                  <div className="bg-green-500/5 border border-green-500/20 dark:border-green-500/20 rounded p-1.5 md:p-2 space-y-0.5 md:space-y-1">
                    <div className="flex items-center gap-0.5 md:gap-1">
                      <Sparkles
                        size={6}
                        className="md:w-2 md:h-2 text-green-500"
                      />
                      <div className="h-0.5 md:h-1 bg-green-500/20 rounded w-8 md:w-12" />
                    </div>
                    <div className="h-0.5 md:h-1 bg-foreground/10 rounded w-full" />
                    <div className="h-0.5 md:h-1 bg-foreground/10 rounded w-3/4" />
                  </div>
                  <div className="flex gap-0.5 md:gap-1">
                    <div className="px-1 md:px-1.5 py-0.5 rounded bg-green-600/10 border border-green-500/20 dark:border-green-500/20">
                      <div className="h-0.5 md:h-1 bg-green-500/40 rounded w-6 md:w-8" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
