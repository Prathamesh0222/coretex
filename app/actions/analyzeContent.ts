"use server";

import { analyzeContent } from "../../services/ai/Analysis";
import { ContentType } from "../../store/contentState";

export const analyzeContentAction = async (url: string, type: ContentType) => {
  try {
    const analysis = await analyzeContent(url, type);
    return { success: true, data: analysis };
  } catch (error) {
    console.error("Failed to analyze content:", error);
    return { success: false, error: "Failed to analyze content" };
  }
};
