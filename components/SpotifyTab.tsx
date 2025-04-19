import { useContentState } from "@/app/store/contentState";
import { Input } from "./ui/input";
import { toast } from "sonner";

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
      toast.error("Invalid Spotify Link. Please paste a valid Spotify URL.");
      return null;
    }
  };

  return (
    <>
      <label className="text-sm font-semibold">Spotify Link</label>
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
    </>
  );
};
