import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CreateContent } from "./CreateContent";
import { useContent } from "@/app/hooks/useContent";
import { Badge } from "./ui/badge";
import { ContentType } from "@/app/store/contentState";
import { YoutubeEmbed } from "./YoutubeEmbed";
import { TwitterEmbed } from "./TwitterEmbed";
import { SpotifyEmbed } from "./SpotifyEmbed";
import {
  Calendar,
  ClipboardPen,
  Music,
  Trash,
  Twitter,
  Youtube,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { toast } from "sonner";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";

interface ContentAreaProps {
  currentFilter: string;
}

export const ContentArea = ({ currentFilter }: ContentAreaProps) => {
  const { data: fetchContents, isLoading, error } = useContent();
  const queryClient = useQueryClient();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const filteredContent = fetchContents?.filter((content) => {
    switch (currentFilter.toLowerCase()) {
      case "youtube":
        return content.type === ContentType.YOUTUBE;
      case "twitter":
        return content.type === ContentType.TWITTER;
      case "spotify":
        return content.type === ContentType.SPOTIFY;
      case "dashboard":
      case "all":
      default:
        return true;
    }
  });

  const formatTitle = (filter: string) => {
    return filter.charAt(0).toUpperCase() + filter.slice(1);
  };

  const removeContent = async (contentId: string) => {
    try {
      const response = await axios.delete("/api/content", {
        data: { id: contentId },
      });

      if (response.status === 200) {
        queryClient.invalidateQueries({ queryKey: ["content"] });
        toast.success("Content deleted successfully");
      } else {
        toast.error("Failed to delete content");
      }
    } catch (error) {
      console.error("Error while deleting content", error);
      toast.error("Error while deleting content");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between">
        <span>
          <h1 className="text-2xl">{formatTitle(currentFilter)}</h1>
        </span>
        <CreateContent />
      </div>
      <div className="columns-1 md:columns-2 lg:columns-3 gap-4 mt-12 w-full">
        {filteredContent?.map((content) => (
          <div key={content.id} className="break-inside-avoid mb-4">
            <Card
              className={`border-l-5 ${
                content.type === ContentType.YOUTUBE
                  ? "border-red-500"
                  : content.type === ContentType.TWITTER
                  ? "border-blue-500"
                  : content.type === ContentType.SPOTIFY && "border-green-500"
              }`}
            >
              <CardHeader>
                <div className="flex items-center gap-2">
                  <span>
                    {content.type === ContentType.YOUTUBE ? (
                      <div className="p-2 border rounded-full bg-red-500/20">
                        <Youtube size={15} className="text-red-500" />
                      </div>
                    ) : content.type === ContentType.TWITTER ? (
                      <div className="p-2 border rounded-full bg-blue-500/20">
                        <Twitter size={15} className="text-blue-500" />
                      </div>
                    ) : content.type === ContentType.SPOTIFY ? (
                      <div className="p-2 border rounded-full bg-green-500/20">
                        <Music size={15} className="text-green-500" />
                      </div>
                    ) : (
                      ""
                    )}
                  </span>
                  <div className="space-y-2">
                    <CardTitle>{content.title}</CardTitle>
                    <CardDescription>
                      <div
                        className={`border rounded-md text-center text-xs w-16 ${
                          content.type === ContentType.YOUTUBE
                            ? "bg-red-600/10 text-red-500"
                            : content.type === ContentType.TWITTER
                            ? "bg-blue-600/10 text-blue-500"
                            : content.type === ContentType.SPOTIFY
                            ? "bg-green-600/10 text-green-500"
                            : ""
                        }`}
                      >
                        {content.type}
                      </div>
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {content.type === ContentType.YOUTUBE && (
                  <YoutubeEmbed link={content.link} />
                )}
                {content.type === ContentType.TWITTER && (
                  <TwitterEmbed link={content.link} />
                )}
                {content.type === ContentType.SPOTIFY && (
                  <SpotifyEmbed link={content.link} />
                )}
                {content.summary && (
                  <div className="border bg-red-500/20 border-red-300/40 p-3 rounded-xl text-sm mt-4 shadow-sm hover:shadow-md transition-all duration-200">
                    <span className="flex items-center gap-2 font-semibold text-xs uppercase mb-1 text-muted-foreground">
                      <ClipboardPen
                        size={14}
                        className="text-muted-foreground"
                      />
                      Summary
                    </span>
                    <p className="tracking-tight pl-1">{content.summary}</p>
                  </div>
                )}

                <div className="flex flex-wrap gap-2 mt-4">
                  {content.ContentTags.map((contentTag, index) => (
                    <Badge
                      key={index}
                      className={`rounded-lg font-semibold  ${
                        content.type === ContentType.TWITTER
                          ? "bg-blue-600/10 hover:bg-blue-600/20 text-blue-500"
                          : content.type === ContentType.SPOTIFY
                          ? "bg-green-600/10 hover:bg-green-600/20 text-green-500"
                          : content.type === ContentType.YOUTUBE
                          ? "bg-red-600/10 hover:bg-red-600/20 text-red-500"
                          : ""
                      }`}
                    >
                      {contentTag.tags.title.toUpperCase()}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t flex items-center">
                <div className="flex text-xs gap-1 items-center text-muted-foreground">
                  <Calendar size={12} />
                  <p>Created:</p>
                  {new Date(content.createdAt).toLocaleDateString("en-GB")}
                </div>
                <div className="flex justify-end w-full">
                  <Dialog>
                    <DialogTrigger>
                      <Trash size={15} className="cursor-pointer" />
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                          This action cannot be undone. This will permanently
                          delete your content and remove your data from our
                          servers.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex gap-2 justify-end">
                        <Button
                          onClick={() => removeContent(content.id)}
                          variant={"destructive"}
                          className="cursor-pointer"
                        >
                          Delete
                        </Button>
                        <Button>Cancel</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};
