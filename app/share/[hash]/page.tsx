"use client";

import { SpotifyEmbed } from "@/components/SpotifyEmbed";
import { TwitterEmbed } from "@/components/TwitterEmbed";
import { YoutubeEmbed } from "@/components/YoutubeEmbed";
import { ContentType } from "@prisma/client";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ClipboardPen,
  Layers,
  Music,
  Notebook,
  Twitter,
  Youtube,
} from "lucide-react";
import { ShareData } from "@/types/content-type";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ShareBrain() {
  const params = useParams();
  const hash = params.hash;
  const [data, setData] = useState<ShareData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/share/${hash}`);
        if (response.data && response.data.success) {
          setData(response.data.data);
        } else {
          setError("Failed to load shared content");
        }
      } catch (error) {
        setError("Error while fetching");
        toast.error("Error while fetching");
        console.error("Error while fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    if (hash) {
      fetchData();
    }
  }, [hash]);

  const allItems = [
    ...(data?.contents || []).map((item) => ({
      ...item,
      itemType: "content" as const,
    })),
    ...(data?.notes || []).map((item) => ({
      ...item,
      itemType: "note" as const,
    })),
  ];

  const getFilteredItems = () => {
    switch (activeTab) {
      case "all":
        return allItems;
      case "youtube":
        return allItems.filter(
          (item) =>
            item.itemType === "content" && item.type === ContentType.YOUTUBE
        );
      case "twitter":
        return allItems.filter(
          (item) =>
            item.itemType === "content" && item.type === ContentType.TWITTER
        );
      case "spotify":
        return allItems.filter(
          (item) =>
            item.itemType === "content" && item.type === ContentType.SPOTIFY
        );
      case "notes":
        return allItems.filter((item) => item.itemType === "note");
      default:
        return allItems;
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen animate-pulse duration-300">
        <Layers
          size={60}
          className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30 transition-all duration-300 group-hover:shadow-blue-500/50 group-hover:scale-105"
        />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <div className="text-xl text-red-500">
          {error || "Content not found"}
        </div>
      </div>
    );
  }

  return (
    <div className="lg:border lg:m-4 lg:rounded-xl lg:h-[97vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] dark:bg-[#141212] bg-[#f6f7f7]">
      <div className="w-full p-4 md:p-12">
        <div className="flex flex-col items-center justify-center space-y-6 py-8">
          <div className="relative">
            <div className="w-32 h-32 rounded-full border-4 border-primary/20 shadow-xl flex items-center justify-center dark:text-white text-black font-bold text-4xl transform hover:scale-105 transition-all duration-300">
              {data.user.username.split(" ")[0].charAt(0).toUpperCase()}
            </div>
            <div className="absolute -bottom-2 -right-2">
              <ThemeToggle />
            </div>
          </div>

          <div className="text-center space-y-2">
            <h1 className="text-4xl font-extrabold">
              {data.user?.username}&apos;s <br />
              Coretex Space
            </h1>
            <p className="text-muted-foreground text-sm">
              A collection of thoughts, ideas and inspirations
            </p>
          </div>
        </div>

        <div className="mt-2 flex justify-center">
          <Tabs
            className="w-full"
            defaultValue="all"
            onValueChange={setActiveTab}
          >
            <div className="flex justify-center items-center w-full overflow-x-auto pb-4 md:pb-0">
              <TabsList className="w-full h-auto flex-wrap md:w-auto md:flex-nowrap gap-2 bg-muted/50 p-1">
                <TabsTrigger value="all">All ({allItems.length})</TabsTrigger>
                <TabsTrigger value="youtube">
                  Youtube (
                  {
                    allItems.filter(
                      (item) =>
                        item.itemType === "content" &&
                        item.type === ContentType.YOUTUBE
                    ).length
                  }
                  )
                </TabsTrigger>
                <TabsTrigger value="twitter">
                  Twitter (
                  {
                    allItems.filter(
                      (item) =>
                        item.itemType === "content" &&
                        item.type === ContentType.TWITTER
                    ).length
                  }
                  )
                </TabsTrigger>
                <TabsTrigger value="spotify">
                  Spotify (
                  {
                    allItems.filter(
                      (item) =>
                        item.itemType === "content" &&
                        item.type === ContentType.SPOTIFY
                    ).length
                  }
                  )
                </TabsTrigger>
                <TabsTrigger value="notes">
                  Notes (
                  {allItems.filter((item) => item.itemType === "note").length})
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="all">
              {getFilteredItems().length > 0 ? (
                <div className="columns-1 md:columns-2 lg:columns-3 gap-4 mt-12 mb-12 md:mb-12 lg:mb-0 w-full">
                  {getFilteredItems().map((item) => (
                    <div key={item.id} className="break-inside-avoid mb-4">
                      <Card
                        className={`border-l-5 ${
                          "type" in item && item.type === ContentType.YOUTUBE
                            ? "border-red-500"
                            : "type" in item &&
                              item.type === ContentType.TWITTER
                            ? "border-blue-500"
                            : "type" in item &&
                              item.type === ContentType.SPOTIFY
                            ? "border-green-500"
                            : !("type" in item)
                            ? "border-yellow-500"
                            : ""
                        }`}
                      >
                        <CardHeader>
                          <div className="flex items-center gap-2">
                            <span>
                              {"type" in item &&
                              item.type === ContentType.YOUTUBE ? (
                                <div className="p-2 border rounded-full bg-red-500/20">
                                  <Youtube size={15} className="text-red-500" />
                                </div>
                              ) : "type" in item &&
                                item.type === ContentType.TWITTER ? (
                                <div className="p-2 border rounded-full bg-blue-500/20">
                                  <Twitter
                                    size={15}
                                    className="text-blue-500"
                                  />
                                </div>
                              ) : "type" in item &&
                                item.type === ContentType.SPOTIFY ? (
                                <div className="p-2 border rounded-full bg-green-500/20">
                                  <Music size={15} className="text-green-500" />
                                </div>
                              ) : !("type" in item) ? (
                                <div className="p-2 border rounded-full bg-yellow-500/20">
                                  <Notebook
                                    size={15}
                                    className="text-yellow-500"
                                  />
                                </div>
                              ) : (
                                ""
                              )}
                            </span>
                            <div className="space-y-2">
                              <h1 className="font-semibold">{item.title}</h1>
                              <div
                                className={`border rounded-md text-center text-xs w-16 ${
                                  "type" in item &&
                                  item.type === ContentType.YOUTUBE
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
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          {item.itemType === "note" ? (
                            <div
                              dangerouslySetInnerHTML={{
                                __html: item.description,
                              }}
                              className="prose prose-sm max-w-none"
                            />
                          ) : item.type === ContentType.YOUTUBE ? (
                            <YoutubeEmbed link={item.link} />
                          ) : item.type === ContentType.TWITTER ? (
                            <TwitterEmbed link={item.link} />
                          ) : (
                            <SpotifyEmbed link={item.link} />
                          )}
                          {item.itemType === "content" && item.summary && (
                            <div
                              className={`border ${
                                item.type === ContentType.YOUTUBE
                                  ? "dark:bg-red-500/20 bg-red-800/30 border-red-300/40"
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
                              <p className="tracking-tight pl-1">
                                {item.summary}
                              </p>
                            </div>
                          )}
                        </CardContent>
                        <CardFooter>
                          <div className="flex flex-wrap gap-2">
                            {item.itemType === "note"
                              ? item.NotesTags.map((tag, index) => (
                                  <Badge
                                    className="rounded-lg font-semibold bg-yellow-600/10 hover:bg-yellow-600/20 text-yellow-500"
                                    key={index}
                                  >
                                    {tag.tags.title.toUpperCase()}
                                  </Badge>
                                ))
                              : item.itemType === "content" &&
                                item.ContentTags.map((tag, index) => (
                                  <Badge
                                    className={`rounded-lg font-semibold  ${
                                      item.type === ContentType.TWITTER
                                        ? "bg-blue-600/10 hover:bg-blue-600/20 text-blue-500"
                                        : item.type === ContentType.SPOTIFY
                                        ? "bg-green-600/10 hover:bg-green-600/20 text-green-500"
                                        : item.type === ContentType.YOUTUBE
                                        ? "bg-red-600/10 hover:bg-red-600/20 text-red-500"
                                        : ""
                                    }`}
                                    key={index}
                                  >
                                    {tag.tags.title.toUpperCase()}
                                  </Badge>
                                ))}
                          </div>
                        </CardFooter>
                      </Card>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 h-screen">
                  <h3 className="text-xl text-gray-600 mb-2">
                    This Second Brain is Empty
                  </h3>
                  <p className="text-gray-500">
                    {data.user?.username} hasn&apos;t added any content or notes
                    yet.
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="youtube">
              {getFilteredItems().length > 0 ? (
                <div className="columns-1 md:columns-2 lg:columns-3 gap-4 mt-12 mb-12 md:mb-12 lg:mb-0 w-full">
                  {getFilteredItems().map((item) => (
                    <div key={item.id} className="break-inside-avoid mb-4">
                      <Card className="border-l-5 border-red-500">
                        <CardHeader>
                          <div className="flex items-center gap-2">
                            <span>
                              <div className="p-2 border rounded-full bg-red-500/20">
                                <Youtube size={15} className="text-red-500" />
                              </div>
                            </span>
                            <div className="space-y-2">
                              <h1 className="font-semibold">{item.title}</h1>
                              <div className="border rounded-md text-center text-xs w-16 bg-red-600/10 text-red-500">
                                YOUTUBE
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          {item.itemType === "content" && (
                            <YoutubeEmbed link={item.link} />
                          )}
                          {item.itemType === "content" && item.summary && (
                            <div className="border dark:bg-red-500/20 bg-red-800/30 border-red-300/40 p-3 rounded-xl text-sm mt-4 shadow-sm hover:shadow-md transition-all duration-200">
                              <span className="flex items-center gap-2 font-semibold text-xs uppercase mb-1 text-muted-foreground">
                                <ClipboardPen
                                  size={14}
                                  className="text-muted-foreground"
                                />
                                Summary
                              </span>
                              <p className="tracking-tight pl-1">
                                {item.summary}
                              </p>
                            </div>
                          )}
                        </CardContent>
                        <CardFooter>
                          <div className="flex flex-wrap gap-2">
                            {item.itemType === "content" &&
                              item.ContentTags.map((tag, index) => (
                                <Badge
                                  className="rounded-lg font-semibold bg-red-600/10 hover:bg-red-600/20 text-red-500"
                                  key={index}
                                >
                                  {tag.tags.title.toUpperCase()}
                                </Badge>
                              ))}
                          </div>
                        </CardFooter>
                      </Card>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 h-screen">
                  <h3 className="text-xl text-gray-600 mb-2">
                    No YouTube content found
                  </h3>
                  <p className="text-gray-500">
                    {data.user?.username} hasn&apos;t added any YouTube content
                    yet.
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="twitter">
              {getFilteredItems().length > 0 ? (
                <div className="columns-1 md:columns-2 lg:columns-3 gap-4 mt-12 mb-12 md:mb-12 lg:mb-0 w-full">
                  {getFilteredItems().map((item) => (
                    <div key={item.id} className="break-inside-avoid mb-4">
                      <Card className="border-l-5 border-blue-500">
                        <CardHeader>
                          <div className="flex items-center gap-2">
                            <span>
                              <div className="p-2 border rounded-full bg-blue-500/20">
                                <Twitter size={15} className="text-blue-500" />
                              </div>
                            </span>
                            <div className="space-y-2">
                              <h1 className="font-semibold">{item.title}</h1>
                              <div className="border rounded-md text-center text-xs w-16 bg-blue-600/10 text-blue-500">
                                TWITTER
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          {item.itemType === "content" && (
                            <TwitterEmbed link={item.link} />
                          )}
                          {item.itemType === "content" && item.summary && (
                            <div className="border bg-blue-500/20 border-blue-300/40 p-3 rounded-xl text-sm mt-4 shadow-sm hover:shadow-md transition-all duration-200">
                              <span className="flex items-center gap-2 font-semibold text-xs uppercase mb-1 text-muted-foreground">
                                <ClipboardPen
                                  size={14}
                                  className="text-muted-foreground"
                                />
                                Summary
                              </span>
                              <p className="tracking-tight pl-1">
                                {item.summary}
                              </p>
                            </div>
                          )}
                        </CardContent>
                        <CardFooter>
                          <div className="flex flex-wrap gap-2">
                            {item.itemType === "content" &&
                              item.ContentTags.map((tag, index) => (
                                <Badge
                                  className="rounded-lg font-semibold bg-blue-600/10 hover:bg-blue-600/20 text-blue-500"
                                  key={index}
                                >
                                  {tag.tags.title.toUpperCase()}
                                </Badge>
                              ))}
                          </div>
                        </CardFooter>
                      </Card>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 h-screen">
                  <h3 className="text-xl text-gray-600 mb-2">
                    No Twitter content found
                  </h3>
                  <p className="text-gray-500">
                    {data.user?.username} hasn&apos;t added any Twitter content
                    yet.
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="spotify">
              {getFilteredItems().length > 0 ? (
                <div className="columns-1 md:columns-2 lg:columns-3 gap-4 mt-12 mb-12 md:mb-12 lg:mb-0 w-full">
                  {getFilteredItems().map((item) => (
                    <div key={item.id} className="break-inside-avoid mb-4">
                      <Card className="border-l-5 border-green-500">
                        <CardHeader>
                          <div className="flex items-center gap-2">
                            <span>
                              <div className="p-2 border rounded-full bg-green-500/20">
                                <Music size={15} className="text-green-500" />
                              </div>
                            </span>
                            <div className="space-y-2">
                              <h1 className="font-semibold">{item.title}</h1>
                              <div className="border rounded-md text-center text-xs w-16 bg-green-600/10 text-green-500">
                                SPOTIFY
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          {item.itemType === "content" && (
                            <SpotifyEmbed link={item.link} />
                          )}
                          {item.itemType === "content" && item.summary && (
                            <div className="border bg-green-400/20 border-green-300/40 p-3 rounded-xl text-sm mt-4 shadow-sm hover:shadow-md transition-all duration-200">
                              <span className="flex items-center gap-2 font-semibold text-xs uppercase mb-1 text-muted-foreground">
                                <ClipboardPen
                                  size={14}
                                  className="text-muted-foreground"
                                />
                                Summary
                              </span>
                              <p className="tracking-tight pl-1">
                                {item.summary}
                              </p>
                            </div>
                          )}
                        </CardContent>
                        <CardFooter>
                          <div className="flex flex-wrap gap-2">
                            {item.itemType === "content" &&
                              item.ContentTags.map((tag, index) => (
                                <Badge
                                  className="rounded-lg font-semibold bg-green-600/10 hover:bg-green-600/20 text-green-500"
                                  key={index}
                                >
                                  {tag.tags.title.toUpperCase()}
                                </Badge>
                              ))}
                          </div>
                        </CardFooter>
                      </Card>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 h-screen">
                  <h3 className="text-xl text-gray-600 mb-2">
                    No Spotify content found
                  </h3>
                  <p className="text-gray-500">
                    {data.user?.username} hasn&apos;t added any Spotify content
                    yet.
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="notes">
              {getFilteredItems().length > 0 ? (
                <div className="columns-1 md:columns-2 lg:columns-3 gap-4 mt-12 mb-12 md:mb-12 lg:mb-0 w-full">
                  {getFilteredItems().map((item) => (
                    <div key={item.id} className="break-inside-avoid mb-4">
                      <Card className="border-l-5 border-yellow-500">
                        <CardHeader>
                          <div className="flex items-center gap-2">
                            <span>
                              <div className="p-2 border rounded-full bg-yellow-500/20">
                                <Notebook
                                  size={15}
                                  className="text-yellow-500"
                                />
                              </div>
                            </span>
                            <div className="space-y-2">
                              <h1 className="font-semibold">{item.title}</h1>
                              <div className="border rounded-md text-center text-xs w-16 bg-yellow-600/10 text-yellow-500">
                                NOTES
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          {item.itemType === "note" && (
                            <div
                              dangerouslySetInnerHTML={{
                                __html: item.description,
                              }}
                              className="prose prose-sm max-w-none"
                            />
                          )}
                        </CardContent>
                        <CardFooter>
                          <div className="flex flex-wrap gap-2">
                            {item.itemType === "note" &&
                              item.NotesTags.map((tag, index) => (
                                <Badge
                                  className="rounded-lg font-semibold bg-yellow-600/10 hover:bg-yellow-600/20 text-yellow-500"
                                  key={index}
                                >
                                  {tag.tags.title.toUpperCase()}
                                </Badge>
                              ))}
                          </div>
                        </CardFooter>
                      </Card>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 h-screen">
                  <h3 className="text-xl text-gray-600 mb-2">No notes found</h3>
                  <p className="text-gray-500">
                    {data.user?.username} hasn&apos;t added any notes yet.
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
