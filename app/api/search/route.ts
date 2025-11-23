import { authOptions } from "@/app/config/auth.config";
import { ai } from "@/app/services/ai/Analysis";
import { prisma } from "@/app/utils/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
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

  try {
    const { query, limit = 10 } = await req.json();
    if (!query || typeof query !== "string") {
      return NextResponse.json(
        {
          error: "Query is required and must be a string",
        },
        {
          status: 400,
        }
      );
    }

    const userId = session.user.id;

    let queryEmbedding: number[] | undefined;
    let queryEmbeddingResponse: any;
    try {
      queryEmbeddingResponse = await ai.models.embedContent({
        model: "gemini-embedding-001",
        contents: query,
      });

      queryEmbedding = queryEmbeddingResponse.embeddings?.[0]?.values;

      if (queryEmbedding && queryEmbedding.length === 3072) {
        queryEmbedding = queryEmbedding.slice(0, 1536);
      }
    } catch (embeddingError) {
      console.error("Error generating query embedding:", embeddingError);
      return NextResponse.json(
        {
          error: "Failed to generate query embedding",
          details:
            embeddingError instanceof Error
              ? embeddingError.message
              : String(embeddingError),
        },
        {
          status: 500,
        }
      );
    }

    if (!queryEmbedding || queryEmbedding.length !== 1536) {
      console.error("Invalid embedding response:", {
        hasEmbedding: !!queryEmbedding,
        length: queryEmbedding?.length,
        responseStructure: queryEmbeddingResponse,
      });
      return NextResponse.json(
        {
          error: "Failed to generate query embedding",
          details: queryEmbedding
            ? `Invalid embedding length: ${queryEmbedding.length}, expected 1536`
            : "No embedding returned from API",
        },
        {
          status: 500,
        }
      );
    }

    const contentResults = await prisma.$queryRaw<
      Array<{
        id: string;
        title: string;
        link: string;
        type: string;
        summary: string | null;
        createdAt: Date;
        similarity: number;
      }>
    >`
        SELECT
          id,
          title,
          link,
          type,
          summary,
          "createdAt",
          1 - (embedding <=> ${queryEmbedding}::vector) as similarity
        FROM "Content"
        WHERE
          "userId" = ${userId}
          AND embedding IS NOT NULL
        ORDER BY embedding <=> ${queryEmbedding}::vector
        LIMIT ${limit}
      `;

    const notesResults = await prisma.$queryRaw<
      Array<{
        id: string;
        title: string;
        description: string;
        createdAt: Date;
        similarity: number;
      }>
    >`
        SELECT
          id,
          title,
          description,
          "createdAt",
          1 - (embedding <=> ${queryEmbedding}::vector) as similarity
        FROM "Notes"
        WHERE
          "userId" = ${userId}
          AND embedding IS NOT NULL
        ORDER BY embedding <=> ${queryEmbedding}::vector
        LIMIT ${limit}
      `;

    const allResults = [
      ...contentResults.map((item) => ({
        ...item,
        resultType: "content",
      })),
      ...notesResults.map((item) => ({
        ...item,
        resultType: "notes",
      })),
    ]
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, limit);

    const enrichedResults = await Promise.all(
      allResults.map(async (result) => {
        if (result.resultType === "content") {
          const fullContent = await prisma.content.findUnique({
            where: { id: result.id },
            include: {
              ContentTags: {
                include: {
                  tags: true,
                },
              },
            },
          });
          return {
            ...fullContent,
            similarity: result.similarity,
            resultType: "content",
          };
        } else {
          const fullNote = await prisma.notes.findUnique({
            where: { id: result.id },
            include: {
              NotesTags: {
                include: {
                  tags: true,
                },
              },
            },
          });
          return {
            ...fullNote,
            similarity: result.similarity,
            resultType: "notes",
          };
        }
      })
    );

    return NextResponse.json({
      results: enrichedResults,
      query,
    });
  } catch (error) {
    console.error("Error while searching", error);
    return NextResponse.json(
      {
        error: "Error while searching",
      },
      {
        status: 500,
      }
    );
  }
};
