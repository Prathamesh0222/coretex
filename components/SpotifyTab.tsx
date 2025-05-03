import { useContentState } from "@/app/store/contentState";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { Asterisk } from "lucide-react";

export const SpotifyTab = () => {
  const { isPreview, setIsPreview, setLink } = useContentState();

  const getEmbedUrl = (link: string) => {
    try {
      const url = new URL(link);
      const pathParts = url.pathname.split("/");
      const type = pathParts[1];
      const id = pathParts[2];
      return `https://open.spotify.com/embed/${type}/${id}`;
    } catch (error) {
      console.error(
        "Invalid Spotify Link. Please paste a valid Spotify URL.",
        error
      );
      toast.error("Invalid Spotify Link. Please paste a valid Spotify URL.");
      return null;
    }
  };

  return (
    <>
      <label className="flex text-sm font-semibold mb-3 mt-2">
        Spotify Link
        <span>
          <Asterisk size={12} className="text-yellow-500" />
        </span>
      </label>
      <Input
        placeholder="Paste Spotify link here..."
        onChange={(e) => {
          const link = e.target.value;
          setIsPreview(link);
          setLink(link);
          if (link && !link.includes("open.spotify.com")) {
            toast.error(
              "Invalid Spotify link. Please paste a valid Spotify URL."
            );
          }
        }}
      />
      <div className="mt-3">
        {isPreview && getEmbedUrl(isPreview) && (
          <iframe
            style={{ borderRadius: "12px" }}
            src={getEmbedUrl(isPreview) || ""}
            width="100%"
            height="352"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
        )}
      </div>
    </>
  );
};
