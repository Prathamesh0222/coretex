import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CreateContent } from "./CreateContent";
import { Badge } from "./ui/badge";
import { ContentType, useContentState } from "@/store/contentState";
import { YoutubeEmbed } from "./YoutubeEmbed";
import { TwitterEmbed } from "./TwitterEmbed";
import { SpotifyEmbed } from "./SpotifyEmbed";
import {
  ArrowUpRight,
  Calendar,
  ClipboardPen,
  Download,
  LayoutDashboard,
  Music,
  Notebook,
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
import { ShareButton } from "./ShareButton";
import { VectorSearchChatbox } from "./VectorSearchChatbox";
import { AddToSpaceDropdown } from "./AddToSpaceDropdown";
import { Folder } from "lucide-react";
import { Content, Notes, removeContent, useContent } from "@/hooks/useContent";
import { useSpaces } from "@/hooks/useSpace";

interface ContentAreaProps {
  currentFilter: string;
}

export const ContentArea = ({ currentFilter }: ContentAreaProps) => {
  const { data: fetchContents, error } = useContent();
  const { searchQuery } = useContentState();
  const { data: spaces } = useSpaces();

  if (error) return <div>Error: {error.message}</div>;

  const allContents: Array<Content | Notes> = fetchContents || [];

  const isSpaceFilter = currentFilter.startsWith("space:");
  const spaceId = isSpaceFilter ? currentFilter.replace("space:", "") : null;
  const currentSpace = spaces?.find((space) => space.id === spaceId);

  if (currentFilter.toLowerCase() === "search") {
    return (
      <div className="h-full w-full">
        <VectorSearchChatbox />
      </div>
    );
  }

  const filteredContent = allContents.filter((items) => {
    const matchesFilter = (() => {
      if (isSpaceFilter && spaceId) {
        return items.spacesId === spaceId;
      }

      switch (currentFilter.toLowerCase()) {
        case "youtube":
          return "type" in items && items.type === ContentType.YOUTUBE;
        case "twitter":
          return "type" in items && items.type === ContentType.TWITTER;
        case "spotify":
          return "type" in items && items.type === ContentType.SPOTIFY;
        case "notes":
          return !("type" in items);
        case "dashboard":
        default:
          return true;
      }
    })();

    const matchesSearch = searchQuery
      ? items.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ("ContentTags" in items
          ? items.ContentTags.some((tag) =>
              tag.tags.title.toLowerCase().includes(searchQuery.toLowerCase())
            )
          : "NotesTags" in items
          ? items.NotesTags.some((tag) =>
              tag.tags.title.toLowerCase().includes(searchQuery.toLowerCase())
            )
          : false)
      : true;

    return matchesFilter && matchesSearch;
  });

  const formatTitle = (filter: string) => {
    if (isSpaceFilter && currentSpace) {
      return (
        <div className="flex gap-2 items-center">
          <div className="p-1.5 border rounded-full bg-purple-500/20">
            <Folder size={20} className="text-purple-500" />
          </div>
          <h2 className="text-lg font-semibold">{currentSpace.name}</h2>
        </div>
      );
    }

    const iconMap = {
      youtube: (
        <div className="flex gap-2 items-center">
          <div className="p-1.5 border rounded-full bg-red-500/20">
            <Youtube size={20} className="text-red-500" />
          </div>
          <h2 className="text-sm font-bold">Youtube</h2>
        </div>
      ),
      twitter: (
        <div className="flex gap-2 items-center">
          <div className="p-1.5 border rounded-full bg-blue-500/20">
            <Twitter size={20} className="text-blue-500" />
          </div>
          <h2 className="text-sm font-bold">Twitter</h2>
        </div>
      ),
      spotify: (
        <div className="flex gap-2 items-center">
          <div className="p-1.5 border rounded-full bg-green-500/20">
            <Music size={20} className="text-green-500" />
          </div>
          <h2 className="text-sm font-bold">Spotify</h2>
        </div>
      ),
      notes: (
        <div className="flex gap-2 items-center">
          <div className="p-1.5 border rounded-full bg-yellow-500/20">
            <Notebook size={20} className="text-yellow-500" />
          </div>
          <h2 className="text-sm font-bold">Notes</h2>
        </div>
      ),
      dashboard: (
        <div className="flex gap-2 items-center">
          <div className="p-1.5 border rounded-full bg-blue-500/20">
            <LayoutDashboard size={20} className="text-blue-500" />
          </div>
          <h2 className="text-sm font-bold">Dashboard</h2>
        </div>
      ),
    };

    const icon = iconMap[filter.toLowerCase() as keyof typeof iconMap] || null;

    return <>{icon}</>;
  };

  return (
    <div className="lg:container lg:mx-auto p-4">
      <div className="flex justify-between items-center gap-3">
        <span>
          <h1 className="text-2xl flex items-center">
            {formatTitle(currentFilter)}
          </h1>
        </span>
        <div className="flex gap-5 items-center">
          <ShareButton />
          <CreateContent />
        </div>
      </div>
      {filteredContent.length === 0 && (
        <div className="w-full flex flex-col items-center justify-center h-80 gap-4">
          <Download size={60} className="text-gray-400" />
          <h1 className="text-xl font-semibold text-gray-500">
            No content found
          </h1>
          <p className="text-gray-400 text-center max-w-md">
            Your content library is empty. Click the + button in the top right
            corner to add your first piece of content.
          </p>
        </div>
      )}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-4 mt-12 mb-12 md:mb-12 lg:mb-0 w-full">
        {filteredContent?.map((item) => (
          <div key={item.id} className="break-inside-avoid mb-4">
            <Card
              className={`border-l-5 bg-background/15 ${
                "type" in item && item.type === ContentType.YOUTUBE
                  ? "border-red-500"
                  : "type" in item && item.type === ContentType.TWITTER
                  ? "border-blue-500 gap-0"
                  : "type" in item && item.type === ContentType.SPOTIFY
                  ? "border-green-500"
                  : !("type" in item)
                  ? "border-yellow-500"
                  : ""
              }`}
            >
              <CardHeader>
                <div className="flex items-center gap-2">
                  <span>
                    {"type" in item && item.type === ContentType.YOUTUBE ? (
                      <div className="p-2 border rounded-full bg-red-500/20">
                        <Youtube size={15} className="text-red-500" />
                      </div>
                    ) : "type" in item && item.type === ContentType.TWITTER ? (
                      <div className="p-2 border rounded-full bg-blue-500/20">
                        <Twitter size={15} className="text-blue-500" />
                      </div>
                    ) : "type" in item && item.type === ContentType.SPOTIFY ? (
                      <div className="p-2 border rounded-full bg-green-500/20">
                        <Music size={15} className="text-green-500" />
                      </div>
                    ) : !("type" in item) ? (
                      <div className="p-2 border rounded-full bg-yellow-500/20">
                        <Notebook size={15} className="text-yellow-500" />
                      </div>
                    ) : (
                      ""
                    )}
                  </span>
                  <div className="space-y-2">
                    <CardTitle>{item.title}</CardTitle>
                    <CardDescription>
                      <div
                        className={`border rounded-md text-center text-xs w-16 ${
                          "type" in item && item.type === ContentType.YOUTUBE
                            ? "bg-red-600/10 text-red-500"
                            : "type" in item &&
                              item.type === ContentType.TWITTER
                            ? "bg-blue-600/10 text-blue-500"
                            : "type" in item &&
                              item.type === ContentType.SPOTIFY
                            ? "bg-green-600/10 text-green-500"
                            : !("type" in item)
                            ? "bg-yellow-600/10 text-yellow-500"
                            : ""
                        }`}
                      >
                        {"type" in item ? item.type : "NOTES"}
                      </div>
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {"type" in item && item.type === ContentType.YOUTUBE && (
                  <YoutubeEmbed link={item.link} />
                )}
                {"type" in item && item.type === ContentType.TWITTER && (
                  <TwitterEmbed link={item.link} />
                )}
                {"type" in item && item.type === ContentType.SPOTIFY && (
                  <SpotifyEmbed link={item.link} />
                )}
                {!("type" in item) && (
                  <div
                    dangerouslySetInnerHTML={{ __html: item.description }}
                    className="prose"
                  />
                )}
                {"summary" in item && item.summary && (
                  <div
                    className={`border ${
                      item.type === ContentType.YOUTUBE
                        ? "dark:bg-red-500/20 bg-red-800/30  border-red-300/40"
                        : item.type === ContentType.TWITTER
                        ? "bg-blue-500/20 border-blue-300/40"
                        : item.type === ContentType.SPOTIFY
                        ? "bg-green-400/20 border-green-300/40"
                        : ""
                    } p-3 rounded-xl text-sm mt-4 shadow-sm hover:shadow-md transition-all duration-200`}
                  >
                    <span className="flex items-center gap-2 font-semibold text-xs uppercase mb-1 text-muted-foreground">
                      <ClipboardPen
                        size={14}
                        className="text-muted-foreground"
                      />
                      Summary
                    </span>
                    <p className="tracking-tight pl-1">{item.summary}</p>
                  </div>
                )}

                <div className="flex flex-wrap gap-2 mt-4">
                  {"ContentTags" in item
                    ? item.ContentTags.map((contentTag, index) => (
                        <Badge
                          key={index}
                          className={`rounded-lg font-semibold ${
                            item.type === ContentType.TWITTER
                              ? "bg-blue-600/10 hover:bg-blue-600/20 text-blue-500"
                              : item.type === ContentType.SPOTIFY
                              ? "bg-green-600/10 hover:bg-green-600/20 text-green-500"
                              : item.type === ContentType.YOUTUBE
                              ? "bg-red-600/10 hover:bg-red-600/20 text-red-500"
                              : ""
                          }`}
                        >
                          {contentTag.tags.title.toUpperCase()}
                        </Badge>
                      ))
                    : "NotesTags" in item
                    ? item.NotesTags.map((notesTag, index) => (
                        <Badge
                          key={index}
                          className={`rounded-lg font-semibold  ${
                            !("type" in item)
                              ? "bg-yellow-600/10 hover:bg-yellow-600/20 text-yellow-500"
                              : ""
                          }`}
                        >
                          {notesTag.tags.title.toUpperCase()}
                        </Badge>
                      ))
                    : null}
                </div>
              </CardContent>
              <CardFooter className="border-t flex items-center">
                <div className="flex text-xs gap-1 items-center text-muted-foreground">
                  <Calendar size={12} />
                  <p>Created:</p>
                  {new Date(item.createdAt).toLocaleDateString("en-GB")}
                </div>
                <div className="flex justify-end gap-2 w-full items-center">
                  {"type" in item && (
                    <ArrowUpRight
                      onClick={() => {
                        window.open(item.link, "_blank");
                      }}
                      className="size-5 cursor-pointer hover:text-blue-400"
                    />
                  )}
                  <AddToSpaceDropdown
                    contentId={"type" in item ? item.id : undefined}
                    notesId={!("type" in item) ? item.id : undefined}
                    currentSpaceId={item.spacesId}
                    isViewingSpace={isSpaceFilter}
                    viewingSpaceId={spaceId}
                  />
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
                          onClick={() => removeContent(item.id)}
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
