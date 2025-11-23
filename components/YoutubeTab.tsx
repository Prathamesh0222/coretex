import { useContentState } from "@/store/contentState";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { Asterisk } from "lucide-react";

export const YoutubeTab = () => {
  const { isPreview, setIsPreview, setLink } = useContentState();

  return (
    <>
      <label className="flex text-sm font-semibold mb-3 mt-2">
        Youtube Link
        <span>
          <Asterisk size={12} className="text-yellow-500" />
        </span>
      </label>
      <Input
        placeholder="Paste Youtube link here..."
        onChange={(e) => {
          const link = e.target.value;
          setIsPreview(link);
          setLink(link);
          if (
            link &&
            !link.includes("youtube.com") &&
            !link.includes("youtu.be")
          ) {
            toast.error(
              "Invalid Youtube link. Please paste a valid Youtube URL."
            );
          }
        }}
      />
      {isPreview &&
      (isPreview.includes("youtube.com") || isPreview.includes("youtu.be")) ? (
        <div className="border p-4 rounded-xl mt-3">
          <iframe
            width="445"
            height="250"
            src={isPreview.replace("watch", "embed").replace("?v=", "/")}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="rounded-xl"
          ></iframe>
        </div>
      ) : null}
    </>
  );
};
