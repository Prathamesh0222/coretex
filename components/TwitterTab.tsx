import { useContentState } from "@/app/store/contentState";
import { Input } from "./ui/input";
import { toast } from "sonner";

export const TwitterTab = () => {
  const { isPreview, setIsPreview } = useContentState();

  return (
    <div className="space-y-3">
      <label className="text-sm font-semibold">Twitter Link</label>
      <Input
        className="focus-visible:ring-2 focus-visible:ring-primary/50"
        placeholder="Paste Twitter/X link here..."
        onChange={(e) => {
          const link = e.target.value;
          setIsPreview(link);
          if (link && !link.includes("twitter.com")) {
            toast.error(
              "Invalid Twitter Link. Please paste a valid Twitter URL."
            );
          }
        }}
      />
      {isPreview &&
        (isPreview.includes("twitter.com") ? (
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
