import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus } from "lucide-react";
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
          <SheetTrigger>
            <Button>
              <Plus /> Add Content
            </Button>
          </SheetTrigger>
          <SheetContent>
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
                    <label className="text-sm font-semibold">
                      Content Type
                    </label>
                    <Input />
                    <label className="text-sm font-semibold">Link</label>
                    <Input onChange={(e) => setIsPreview(e.target.value)} />
                    {isPreview && (
                      <div className="border p-4 rounded-xl">
                        <iframe
                          width="320"
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
                    )}

                    <label className="text-sm font-semibold">Tags</label>
                    <Input
                      type="text"
                      placeholder="Press enter to add the tag"
                      value={tagsInput}
                      onChange={(e) => setTagsInput(e.target.value)}
                      onKeyDown={handleTagInput}
                    />
                    <div className="flex gap-2">
                      {tags.map((tag) => (
                        <Badge className="rounded-lg">{tag}</Badge>
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
