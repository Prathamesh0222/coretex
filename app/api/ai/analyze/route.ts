import { analyzeContent } from "@/app/services/ai/Analysis";
import { NextRequest, NextResponse } from "next/server";
import { analysisRateLimit } from "@/lib/redis";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/config/auth.config";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user.id) {
    return NextResponse.json(
      {
        error: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  const { success, limit, reset, remaining } = await analysisRateLimit.limit(
    session.user.id
  );

  if (!success) {
    return NextResponse.json(
      {
        error: "Too many analysis requests. Please wait a moment.",
        limit,
        reset,
        remaining,
      },
      {
        status: 429,
        headers: {
          "X-RateLimit-Limit": limit.toString(),
          "X-RateLimit-Remaining": remaining.toString(),
          "X-RateLimit-Reset": reset.toString(),
        },
      }
    );
  }

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
