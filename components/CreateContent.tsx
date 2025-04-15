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

export const CreateContent = () => {
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
                    <YoutubeTab />
                  </TabsContent>
                  <TabsContent value="twitter">
                    <TwitterTab />
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
  );
};
