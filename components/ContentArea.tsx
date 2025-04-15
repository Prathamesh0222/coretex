import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus, X } from "lucide-react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "./ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { KeyboardEvent, useState } from "react";
import { toast } from "sonner";
import { Badge } from "./ui/badge";
import { SpotifyTab } from "./SpotifyTab";

export const ContentArea = () => {
  const [isPreview, setIsPreview] = useState<string>("");
  const [tagsInput, setTagsInput] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);

  const handleTagInput = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newTag = tagsInput.trim();
      if (tags.includes(newTag)) {
        toast.error("Duplicate tags are not allowed");
      } else {
        setTags([...tags, newTag]);
        setTagsInput("");
      }
    }
  };

  const handleRemoveTagInput = (tagId: string) => {
    setTags(tags.filter((tag) => tag !== tagId));
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between">
        <span>
          <h1 className="text-2xl">Dashboard</h1>
          <p className="text-muted-foreground">Your Content</p>
        </span>
        <Sheet>
          <SheetTrigger asChild>
            <Button>
              <Plus /> Add Content
            </Button>
          </SheetTrigger>
          <SheetContent className="overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Create Content</SheetTitle>
              <SheetDescription>
                Give title and content link for creating a content
              </SheetDescription>
            </SheetHeader>
            <div className="mx-4">
              <Tabs defaultValue="content">
                <TabsList>
                  <TabsTrigger value="content">Content</TabsTrigger>
                  <TabsTrigger value="Notes">Notes</TabsTrigger>
                </TabsList>
                <TabsContent value="content">
                  <div className="space-y-4">
                    <label className="text-sm font-semibold">Title</label>
                    <Input />
                    <label className="text-sm font-semibold flex justify-center">
                      Content Type
                    </label>
                    <Tabs defaultValue="youtube">
                      <div className="mx-8">
                        <TabsList>
                          <TabsTrigger value="youtube">Youtube</TabsTrigger>
                          <TabsTrigger value="twitter">Twitter</TabsTrigger>
                          <TabsTrigger value="spotify">Spotify</TabsTrigger>
                        </TabsList>
                      </div>

                      <TabsContent value="youtube">
                        <label className="text-sm font-semibold">Link</label>
                        <Input
                          onChange={(e) => {
                            const link = e.target.value;
                            setIsPreview(link);
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
                        (isPreview.includes("youtube.com") ||
                          isPreview.includes("youtu.be")) ? (
                          <div className="border p-4 rounded-xl mt-3">
                            <iframe
                              width="445"
                              height="250"
                              src={isPreview
                                .replace("watch", "embed")
                                .replace("?v=", "/")}
                              title="YouTube video player"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              referrerPolicy="strict-origin-when-cross-origin"
                              allowFullScreen
                              className="rounded-xl"
                            ></iframe>
                          </div>
                        ) : null}
                      </TabsContent>
                      <TabsContent value="twitter">
                        <div className="space-y-3">
                          <label className="text-sm font-medium text-foreground/80">
                            Twitter Link
                          </label>
                          <Input
                            className="focus-visible:ring-2 focus-visible:ring-primary/50"
                            placeholder="Paste Twitter/X link here..."
                            onChange={(e) => setIsPreview(e.target.value)}
                          />
                          {isPreview && (
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
                                  <a
                                    href={isPreview?.replace(
                                      "x.com",
                                      "twitter.com"
                                    )}
                                  ></a>
                                </blockquote>
                              </div>
                              <script
                                async
                                src="https://platform.twitter.com/widgets.js"
                                charSet="utf-8"
                              ></script>
                            </div>
                          )}
                        </div>
                      </TabsContent>
                      <TabsContent value="spotify">
                        <SpotifyTab />
                      </TabsContent>
                    </Tabs>
                    <label className="text-sm font-semibold">Tags</label>
                    <Input
                      type="text"
                      placeholder="Press enter to add the tag"
                      value={tagsInput}
                      onChange={(e) => setTagsInput(e.target.value)}
                      onKeyDown={handleTagInput}
                    />
                    <div className="flex gap-2 mb-12">
                      {tags.map((tag, index) => (
                        <Badge
                          variant={"destructive"}
                          key={index}
                          className="rounded-lg"
                        >
                          {tag}
                          <span onClick={() => handleRemoveTagInput(tag)}>
                            <X className="w-3 h-3 cursor-pointer" />
                          </span>
                        </Badge>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="Notes">Change your Notes here.</TabsContent>
              </Tabs>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <div className="grid grid-cols-3 mt-12 gap-4">
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
