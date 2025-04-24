import { Asterisk, Plus, X } from "lucide-react";
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
import { ContentType, useContentState } from "@/app/store/contentState";
import { useQueryClient } from "@tanstack/react-query";

export const CreateContent = () => {
  const [tagsInput, setTagsInput] = useState<string>("");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const {
    title,
    type,
    link,
    tags,
    description,
    setTitle,
    setTags,
    setType,
    setLink,
    setDescription,
  } = useContentState();
  const queryClient = useQueryClient();

  const handleSubmit = async () => {
    try {
      const response = await axios.post("/api/content", {
        title,
        type,
        link,
        summary: description,
        tags,
      });

      if (response.status === 201) {
        toast.success("Content created successfully");
        setIsSheetOpen(false);
        queryClient.invalidateQueries({ queryKey: ["content"] });
      } else {
        toast.error("Failed to create content");
      }
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

  const resetForm = () => {
    setTitle("");
    setType(ContentType.YOUTUBE);
    setLink("");
    setTags([]);
    setTagsInput("");
  };

  return (
    <Sheet
      open={isSheetOpen}
      onOpenChange={(open) => {
        setIsSheetOpen(open);
        if (!open) {
          resetForm();
        }
      }}
    >
      <SheetTrigger asChild>
        <Button onClick={() => setIsSheetOpen(true)}>
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
              <div className="space-y-3">
                <label className="text-sm font-semibold flex mt-2.5">
                  Title
                  <span>
                    <Asterisk size={12} className="text-yellow-500" />
                  </span>
                </label>
                <Input
                  value={title}
                  placeholder="Give a title for your content"
                  onChange={(e) => setTitle(e.target.value)}
                />
                <label className="text-sm font-semibold flex justify-center">
                  Content Type
                  <span>
                    <Asterisk size={12} className="text-yellow-500" />
                  </span>
                </label>
                <Tabs
                  defaultValue={ContentType.YOUTUBE}
                  onValueChange={(value) => setType(value as ContentType)}
                >
                  <div className="mx-8">
                    <TabsList>
                      <TabsTrigger value={ContentType.YOUTUBE}>
                        Youtube
                      </TabsTrigger>
                      <TabsTrigger value={ContentType.TWITTER}>
                        Twitter
                      </TabsTrigger>
                      <TabsTrigger value={ContentType.SPOTIFY}>
                        Spotify
                      </TabsTrigger>
                    </TabsList>
                  </div>

                  <TabsContent value={ContentType.YOUTUBE}>
                    <YoutubeTab />
                  </TabsContent>
                  <TabsContent value={ContentType.TWITTER}>
                    <TwitterTab />
                  </TabsContent>
                  <TabsContent value={ContentType.SPOTIFY}>
                    <SpotifyTab />
                  </TabsContent>
                </Tabs>
                <div>
                  <label className="text-sm font-semibold">Description</label>
                  <div className="mt-3">
                    <textarea
                      value={description}
                      placeholder="Write a description"
                      className="bg-primary/5 rounded-md p-3 w-full border text-sm h-40"
                      maxLength={255}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                    <p
                      className={
                        description.length === 255
                          ? "text-red-500 font-semibold text-sm mt-2"
                          : `text-sm mt-2 text-muted-foreground font-semibold`
                      }
                    >
                      Character Count: {description.length}/255
                    </p>
                  </div>
                </div>
                <label className="flex text-sm font-semibold">
                  Tags
                  <span>
                    <Asterisk size={12} className="text-yellow-500" />
                  </span>
                </label>
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
                            type === ContentType.TWITTER
                              ? "bg-blue-500 hover:bg-blue-600"
                              : type === ContentType.SPOTIFY
                              ? "bg-green-500 hover:bg-green-600"
                              : type === ContentType.YOUTUBE
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
          <Button
            onClick={handleSubmit}
            className="w-full mt-5 font-semibold mb-12"
          >
            Submit
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
