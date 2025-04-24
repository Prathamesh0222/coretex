import { useContentState } from "@/app/store/contentState";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { Asterisk } from "lucide-react";

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
              <blockquote
                className="twitter-tweet"
                data-theme="dark"
                data-cards="hidden"
                data-conversation="none"
              >
                <p lang="en" dir="ltr">
                  <a href={isPreview}></a>
                </p>
                <a href={isPreview?.replace("x.com", "twitter.com")}></a>
              </blockquote>
            </div>
            <script
              async
              src="https://platform.twitter.com/widgets.js"
              charSet="utf-8"
            ></script>
          </div>
        ) : null)}
    </div>
  );
};
