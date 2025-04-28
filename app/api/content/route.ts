import { authOptions } from "@/app/config/auth.config";
import { validate } from "@/app/middlewares/validate.middleware";
import { ContentType } from "@/app/store/contentState";
import { prisma } from "@/app/utils/prisma";
import {
  ContentInput,
  ContentSchema,
} from "@/app/validators/content.validator";
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
    if (type === ContentType.NOTES) {
      await prisma.$transaction(async (prisma) => {
        const TagsRecord = tags ? await upsertTags(prisma, tags) : [];
        await prisma.notes.create({
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
      });
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

      await prisma.$transaction(async (tx) => {
        const TagsRecord = await upsertTags(tx, tags);
        await tx.content.create({
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
      });
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
