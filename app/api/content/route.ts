import { authOptions } from "@/app/config/auth.config";
import {
  ContentInput,
  ContentSchema,
} from "@/app/validators/content.validator";
import { generateEmbedding } from "@/lib/embedding";
import { prisma } from "@/lib/prisma";
import { validate } from "@/middlewares/validate.middleware";
import { ContentType } from "@/store/contentState";
import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const upsertTags = async (tx: Prisma.TransactionClient, tags: string[]) => {
  return Promise.all(
    tags.map((tag) => {
      return tx.tags.upsert({
        where: { title: tag },
        update: {},
        create: { title: tag },
      });
    })
  );
};

const contentPostHandler = async (
  req: NextRequest,
  context: { validatedData: ContentInput }
) => {
  const { title, type, link, tags, description, summary } =
    context.validatedData;
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

  if (type === ContentType.NOTES && !description) {
    return NextResponse.json(
      {
        error: "Description is required for NOTES",
      },
      {
        status: 400,
      }
    );
  }

  const userId = session.user.id;

  try {
    let createdContentId: string;
    let textToEmbed: string;

    if (type === ContentType.NOTES) {
      const result = await prisma.$transaction(
        async (prisma): Promise<{ id: string; text: string }> => {
          const TagsRecord = tags ? await upsertTags(prisma, tags) : [];
          const createdNote = await prisma.notes.create({
            data: {
              title,
              description: description as string,
              userId,
              NotesTags: {
                create: TagsRecord.map((tag) => ({
                  tagsId: tag.id,
                })),
              },
            },
          });
          return {
            id: createdNote.id,
            text: `${title} ${description}`,
          };
        }
      );
      createdContentId = result.id;
      textToEmbed = result.text;
    } else {
      if (!link || !tags) {
        return NextResponse.json(
          {
            error: "Link and tags are required for non-notes content",
          },
          {
            status: 400,
          }
        );
      }

      const result = await prisma.$transaction(
        async (
          tx
        ): Promise<{ id: string; text: string; isContent: boolean }> => {
          const TagsRecord = await upsertTags(tx, tags);
          const createdContent = await tx.content.create({
            data: {
              title,
              link,
              type,
              summary,
              userId,
              ContentTags: {
                create: TagsRecord.map((tag) => ({
                  tagsId: tag.id,
                })),
              },
            },
          });
          const tagTitles = TagsRecord.map((tag) => tag.title).join(" ");
          return {
            id: createdContent.id,
            text: `${title} ${summary} ${tagTitles}`.trim(),
            isContent: true,
          };
        }
      );
      createdContentId = result.id;
      textToEmbed = result.text;
    }

    try {
      const embedding = await generateEmbedding(textToEmbed);

      if (type === ContentType.NOTES) {
        await prisma.$executeRaw`
            UPDATE "Notes" 
            SET embedding = ${embedding}::vector 
            WHERE id = ${createdContentId}
          `;
      } else {
        await prisma.$executeRaw`
            UPDATE "Content" 
            SET embedding = ${embedding}::vector 
            WHERE id = ${createdContentId}
          `;
      }
    } catch (embeddingError) {
      console.error("Error generating embedding:", embeddingError);
      console.error("Content ID that failed:", createdContentId);
    }

    return NextResponse.json(
      {
        message: "Content created successfully",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Error while creating content", error);
    return NextResponse.json(
      {
        error: "Error while creating content",
      },
      {
        status: 500,
      }
    );
  }
};

export const POST = validate(ContentSchema)(contentPostHandler);

export const GET = async () => {
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

  const userId = session?.user.id;
  try {
    const response = await prisma.content.findMany({
      where: {
        userId,
      },
      include: {
        ContentTags: {
          include: {
            tags: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const notes = await prisma.notes.findMany({
      where: {
        userId,
      },
      include: {
        NotesTags: {
          include: {
            tags: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const allItems = [...response, ...notes];

    allItems.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return NextResponse.json(allItems);
  } catch (error) {
    console.error("Error while fetching data", error);
    return NextResponse.json(
      {
        error: "Error while fetching data",
      },
      {
        status: 500,
      }
    );
  }
};

export const DELETE = async (req: NextRequest) => {
  const { id: contentId } = await req.json();

  if (!contentId) {
    return NextResponse.json(
      {
        error: "Content ID is required",
      },
      {
        status: 400,
      }
    );
  }

  try {
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

    const userId = session.user.id;
    await prisma.content.delete({
      where: {
        id: contentId,
        userId,
      },
    });

    return NextResponse.json(
      { message: "Content deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error while deleting content", error);
    return NextResponse.json(
      {
        error: "Error while deleting content",
      },
      {
        status: 500,
      }
    );
  }
};
