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
              <div className="flex flex-wrap gap-2 mt-2">
                {content.ContentTags.map((contentTag, index) => (
                  <Badge key={index}>{contentTag.tags.title}</Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <p>Created Content</p>
            </CardFooter>
          </Card>
        ))}
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
