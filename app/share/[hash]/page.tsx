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
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type SharedContent = {
  id: string;
  title: string;
  link: string;
  type: ContentType;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  ContentTags: {
    tags: {
      id: string;
      title: string;
    };
  }[];
};

type SharedNote = {
  id: string;
  title: string;
  content: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  NotesTags: {
    tags: {
      id: string;
      name: string;
    };
  }[];
};

type ShareData = {
  user: { username: string };
  contents: SharedContent[];
  notes: SharedNote[];
};

export default function ShareBrain() {
  const params = useParams();
  const hash = params.hash;
  const [data, setData] = useState<ShareData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/share/${hash}`);
        console.log("Response", response);
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

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <div className="text-xl">Loading...</div>
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
    <div className="w-full mx-auto container p-6 h-screen">
      <h1 className="text-3xl font-bold mb-6">
        {data.user?.username}&apos;s Second Brain
      </h1>

      {data.contents && data.contents.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">📚 Content</h2>
          <div className="columns-1 md:columns-2 lg:columns-3 gap-4 mt-12 mb-12 md:mb-12 lg:mb-0 w-full">
            {data.contents.map((content) => (
              <div key={content.id} className="break-inside-avoid">
                <Card>
                  <CardHeader>
                    <h1>{content.title}</h1>
                    <Badge
                      className={
                        content.type === ContentType.YOUTUBE
                          ? "bg-red-500/20 border border-red-500 text-red-500"
                          : content.type === ContentType.TWITTER
                          ? "bg-blue-500/20 border-blue-500 text-blue-500"
                          : "bg-green-500/20 border border-green-500 text-green-500"
                      }
                    >
                      {content.type}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    {content.type === ContentType.YOUTUBE ? (
                      <YoutubeEmbed link={content.link} />
                    ) : content.type === ContentType.TWITTER ? (
                      <TwitterEmbed link={content.link} />
                    ) : (
                      <SpotifyEmbed link={content.link} />
                    )}
                  </CardContent>
                  <CardFooter></CardFooter>
                </Card>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.notes && data.notes.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">📝 Notes</h2>
          {data.notes.map((note) => (
            <div key={note.id} className="border p-4 mb-4 rounded">
              <h3 className="text-xl font-semibold">{note.title}</h3>
              <p className="whitespace-pre-wrap">{note.content}</p>
              {note.NotesTags && note.NotesTags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {note.NotesTags.map((noteTag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded"
                    >
                      {noteTag.tags.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {(!data.contents || data.contents.length === 0) &&
        (!data.notes || data.notes.length === 0) && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🧠</div>
            <h3 className="text-xl text-gray-600 mb-2">
              This Second Brain is Empty
            </h3>
            <p className="text-gray-500">
              {data.user?.username} hasn&apos;t added any content or notes yet.
            </p>
          </div>
        )}
    </div>
  );
}
