import { analyzeContent } from "@/app/services/ai/Analysis";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { url, type } = await req.json();
    const suggestions = await analyzeContent(url, type);
    return NextResponse.json(suggestions);
  } catch (error) {
    console.error("Failed to analyze content", error);
    return NextResponse.json(
      {
        error: "Failed to analyze content",
      },
      {
        status: 500,
      }
    );
  }
}
