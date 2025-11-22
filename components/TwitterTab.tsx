import { useContentState } from "@/store/contentState";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { Asterisk } from "lucide-react";
import { TwitterEmbed } from "./TwitterEmbed";

export const TwitterTab = () => {
  const { isPreview, setIsPreview, setLink } = useContentState();

  return (
    <div className="space-y-3">
      <label className="flex text-sm font-semibold mb-3 mt-2">
        Twitter Link
        <span>
          <Asterisk size={12} className="text-yellow-500" />
        </span>
      </label>
      <Input
        className="focus-visible:ring-2 focus-visible:ring-primary/50"
        placeholder="Paste Twitter/X link here..."
        onChange={(e) => {
          const link = e.target.value;
          setIsPreview(link);
          setLink(link);
          if (link && !link.includes("x.com")) {
            toast.error(
              "Invalid Twitter Link. Please paste a valid Twitter URL."
            );
          }
        }}
      />
      {isPreview &&
        (isPreview.includes("x.com") ? (
          <div className="border p-4 rounded-xl mt-3 bg-card/50 shadow-sm">
            <div className="relative">
              <TwitterEmbed link={isPreview} />
            </div>
          </div>
        ) : null)}
    </div>
  );
};
