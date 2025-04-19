import {
  Card,
  CardContent,
  CardDescription,
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

export const ContentArea = () => {
  const { data: fetchContents, isLoading, error } = useContent();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between">
        <span>
          <h1 className="text-2xl">Dashboard</h1>
          <p className="text-muted-foreground">Your Content</p>
        </span>
        <CreateContent />
      </div>
      <div className="grid grid-cols-3 mt-12 gap-4">
        {fetchContents?.map((content) => (
          <Card key={content.id}>
            <CardHeader>
              <CardTitle>{content.title}</CardTitle>
              <CardDescription>Content Type: {content.type}</CardDescription>
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
              <div className="flex flex-wrap gap-2 mt-2">
                {content.ContentTags.map((contentTag, index) => (
                  <Badge
                    key={index}
                    className={`rounded-lg mt-3  ${
                      content.type === ContentType.TWITTER
                        ? "bg-blue-500 hover:bg-blue-600"
                        : content.type === ContentType.SPOTIFY
                        ? "bg-green-500 hover:bg-green-600"
                        : content.type === ContentType.YOUTUBE
                        ? "bg-red-500 hover:bg-red-600"
                        : ""
                    }`}
                  >
                    {contentTag.tags.title}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
