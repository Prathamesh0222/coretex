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
  const videoData = await getYoutubeVideoData(url);
  const content = `
      Analyze this YouTube video:
    Title: ${videoData.title}
    Description: ${videoData.description}
    Tags: ${videoData.tags.join(", ")}

    Please provide in JSON format only:
    {
      "suggestedTitle": "${videoData.title}",
      "suggestedTags": [5 relevant tags based on content],
      "summary": [brief summary under 255 characters]
    }
    `;
  console.log("Content", content);

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: content,
  });
  const text = response.text;
  console.log("asdasdadsad", text);
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
