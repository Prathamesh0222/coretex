import { Layers, Music, Notebook, Twitter, Youtube } from "lucide-react";

export const MiniSpace = ({
  name,
  color,
  itemCount,
  items,
}: {
  name: string;
  color: string;
  itemCount: number;
  items: Array<"youtube" | "twitter" | "spotify" | "notes">;
}) => {
  const colorConfig: Record<
    string,
    { bg: string; border: string; text: string; accent: string }
  > = {
    blue: {
      bg: "bg-blue-500/5",
      border: "border-blue-500/30",
      text: "text-blue-500",
      accent: "bg-blue-500/10",
    },
    purple: {
      bg: "bg-purple-500/5",
      border: "border-purple-500/30",
      text: "text-purple-500",
      accent: "bg-purple-500/10",
    },
    green: {
      bg: "bg-green-500/5",
      border: "border-green-500/30",
      text: "text-green-500",
      accent: "bg-green-500/10",
    },
    orange: {
      bg: "bg-orange-500/5",
      border: "border-orange-500/30",
      text: "text-orange-500",
      accent: "bg-orange-500/10",
    },
  };

  const colors = colorConfig[color] || colorConfig.blue;

  const iconMap = {
    youtube: <Youtube size={13} className="text-red-500" />,
    twitter: <Twitter size={13} className="text-blue-500" />,
    spotify: <Music size={13} className="text-green-500" />,
    notes: <Notebook size={13} className="text-yellow-500" />,
  };

  return (
    <div
      className={`border ${colors.border} ${colors.bg} rounded-lg md:rounded-xl p-2 md:p-3 space-y-2 md:space-y-3 hover:shadow-sm transition-shadow`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 md:gap-2">
          <div className={`p-1 md:p-1.5 rounded-full ${colors.accent}`}>
            <Layers size={10} className={`md:w-3 md:h-3 ${colors.text}`} />
          </div>
          <div>
            <p className="text-xs md:text-sm font-semibold">{name}</p>
            <p className="text-[10px] md:text-xs text-muted-foreground">
              {itemCount} items
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-1.5 md:space-y-2">
        {items.slice(0, 2).map((item, idx) => {
          const borderColors = {
            youtube: "border-l-red-500 bg-red-500/5",
            twitter: "border-l-blue-500 bg-blue-500/5",
            spotify: "border-l-green-500 bg-green-500/5",
            notes: "border-l-yellow-500 bg-yellow-500/5",
          };
          return (
            <div
              key={idx}
              className={`border-l-2 ${borderColors[item]} rounded px-2 md:px-3 py-1.5 md:py-2 flex items-center gap-1.5 md:gap-2`}
            >
              <div className="p-0.5 md:p-1 bg-background rounded-full border border-border/50">
                {iconMap[item]}
              </div>
              <div className="flex-1 space-y-0.5">
                <div className="h-1 md:h-1.5 bg-foreground/10 rounded w-16 md:w-20 mb-0.5 md:mb-1" />
                <div className="h-1 md:h-1.5 bg-foreground/5 rounded w-10 md:w-14" />
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex gap-1 md:gap-1.5 ">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="p-0.5 md:p-1 bg-background rounded-md border border-border/50"
          >
            {iconMap[item]}
          </div>
        ))}
        {itemCount > items.length && (
          <div className="p-0.5 md:p-1 px-1.5 md:px-2 bg-muted/50 rounded-md border border-border/50 text-[7px] md:text-[8px] text-muted-foreground">
            +{itemCount - items.length}
          </div>
        )}
      </div>
    </div>
  );
};
