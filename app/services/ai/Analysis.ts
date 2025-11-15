import { ContentType } from "@/app/store/contentState";
import { GoogleGenAI } from "@google/genai";
import { getYoutubeVideoData } from "../metadata/YoutubeVideoData";
import { getSpotifyData } from "../metadata/SpotifyData";
import { getTwitterData } from "../metadata/TwitterData";

export const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

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
    case "TWITTER":
      videoData = await getTwitterData(url);
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
