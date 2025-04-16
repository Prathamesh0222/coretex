import { Plus, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { YoutubeTab } from "./YoutubeTab";
import { TwitterTab } from "./TwitterTab";
import { SpotifyTab } from "./SpotifyTab";
import { KeyboardEvent, useState } from "react";
import { toast } from "sonner";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import axios from "axios";

enum ContentType {
  Youtube = "youtube",
  Twitter = "twitter",
  Spotify = "spotify",
  Notes = "Notes",
}

export const CreateContent = () => {
  const [tagsInput, setTagsInput] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [title, setTitle] = useState<string>("");
  const [type, setType] = useState<ContentType>(ContentType.Youtube);
  const [link, setLink] = useState<string>("");

  const handleSubmit = async () => {
    try {
      await axios.post("/api/content", {
        title,
        type,
        link,
        tags,
      });
      toast.success("Content created successfully");
      setTitle("");
      setType(ContentType.Youtube);
      setLink("");
      setTags([]);
    } catch (error) {
      console.error("Error while creating content", error);
      toast.error("Error while creating content");
    }
  };

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
                <Input
                  value={title}
                  placeholder="Give a title for your content"
                  onChange={(e) => setTitle(e.target.value)}
                />
                <label className="text-sm font-semibold flex justify-center">
                  Content Type
                </label>
                <Tabs
                  defaultValue="youtube"
                  onValueChange={(value) => setType(value as ContentType)}
                >
                  <div className="mx-8">
                    <TabsList>
                      <TabsTrigger value={ContentType.Youtube}>
                        Youtube
                      </TabsTrigger>
                      <TabsTrigger value={ContentType.Twitter}>
                        Twitter
                      </TabsTrigger>
                      <TabsTrigger value={ContentType.Spotify}>
                        Spotify
                      </TabsTrigger>
                    </TabsList>
                  </div>

                  <TabsContent value={ContentType.Youtube}>
                    <YoutubeTab />
                  </TabsContent>
                  <TabsContent value={ContentType.Twitter}>
                    <TwitterTab />
                  </TabsContent>
                  <TabsContent value={ContentType.Spotify}>
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
                <div className="border-2 h-40 border-dashed rounded-xl p-3">
                  <div className="flex flex-wrap gap-2 mb-12">
                    {tags.length === 0 ? (
                      <p className="text-muted-foreground text-sm text-center">
                        Tags will appear here as you add them.
                      </p>
                    ) : (
                      tags.map((tag, index) => (
                        <Badge
                          key={index}
                          className={`rounded-lg  ${
                            type === ContentType.Twitter
                              ? "bg-blue-500 hover:bg-blue-600"
                              : type === ContentType.Spotify
                              ? "bg-green-500 hover:bg-green-600"
                              : type === ContentType.Youtube
                              ? "bg-red-500 hover:bg-red-600"
                              : ""
                          }`}
                        >
                          {tag}
                          <span onClick={() => handleRemoveTagInput(tag)}>
                            <X className="w-3 h-3 cursor-pointer" />
                          </span>
                        </Badge>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="Notes"></TabsContent>
          </Tabs>
          <Button onClick={handleSubmit} className="w-full mt-5 font-semibold">
            Submit
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
