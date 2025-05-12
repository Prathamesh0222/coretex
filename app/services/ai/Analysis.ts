import { ContentType } from "@/app/store/contentState";
import { GoogleGenAI } from "@google/genai";
import axios from "axios";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export interface AIContentSuggestions {
  suggestedTitle: string;
  suggestedTags: string[];
  summary: string;
}

export async function analyzeContent(
  url: string,
  type: ContentType
): Promise<AIContentSuggestions> {
  let videoData;

  switch (type) {
    case "YOUTUBE":
      videoData = await getYoutubeVideoData(url);
      break;
    case "SPOTIFY":
      videoData = await getSpotifyData(url);
      break;
    default:
      throw new Error("Unsupported content type");
  }
  const content = `
      Analyze this video:
    Title: ${videoData?.title}
    Description: ${videoData?.description}
    Tags: ${videoData?.tags.join(", ")}

    Please provide in JSON format only:
    {
      "suggestedTitle": "${videoData?.title}",
      "suggestedTags": [5 relevant tags based on content],
      "summary": [brief summary under 255 characters]
    }
    `;

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: content,
  });
  const text = response.text;
  if (!text) {
    throw new Error("Failed to get AI response");
  }
  const cleanedText = text
    .replace(/```json\n?/g, "")
    .replace(/```\n?/g, "")
    .trim();

  return JSON.parse(cleanedText);
}

async function getYoutubeVideoData(url: string) {
  const videoUrl = new URL(url);
  let videoId: string | null = null;

  if (videoUrl.hostname === "youtu.be") {
    videoId = videoUrl.pathname.slice(1);
  } else if (videoUrl.hostname.includes("youtube.com")) {
    videoId = videoUrl.searchParams.get("v");
  }

  if (!videoId) {
    throw new Error("Could not extract video ID from URL");
  }

  const response = await axios.get(
    `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${process.env.YOUTUBE_API_KEY}&part=snippet`
  );

  const videoData = response.data.items[0].snippet;
  return {
    title: videoData.title,
    description: videoData.description,
    tags: videoData.tags || [],
  };
}

async function getSpotifyUserToken() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const response = await axios.post(
    "https://accounts.spotify.com/api/token",
    new URLSearchParams({ grant_type: "client_credentials" }).toString(),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${auth}`,
      },
    }
  );

  return response.data.access_token;
}

async function getSpotifyData(url: string) {
  const id = url.split("/").pop()?.split("?")[0];
  const type = url.includes("/track/") ? "track" : "playlist";

  if (!id) throw new Error("Invalid Spotify URL");

  const token = await getSpotifyUserToken();
  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/${type}s/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return {
      title: response.data.name,
      description:
        type === "track"
          ? `By ${response.data.artists[0].name}`
          : `Playlist by ${response.data.owner.display_name}`,
      tags: [
        response.data.type,
        response.data.artists?.[0]?.name || "Various Artists",
      ],
    };
  } catch (error) {
    console.error("Failed while fetching metadata", error);
    throw error;
  }
}
