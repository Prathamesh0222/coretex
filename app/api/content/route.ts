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
        const TagsRecord = await upsertTags(prisma, tags);
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
    return NextResponse.json(
      {
        content: response,
      },
      {
        status: 200,
      }
    );
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
