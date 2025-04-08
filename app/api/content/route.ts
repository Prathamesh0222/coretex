import { authOptions } from "@/app/config/auth.config";
import { validate } from "@/app/middlewares/validate.middleware";
import { prisma } from "@/app/utils/prisma";
import {
  ContentInput,
  ContentSchema,
} from "@/app/validators/content.validator";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const contentPostHandler = async (
  req: NextRequest,
  context: { validatedData: ContentInput }
) => {
  const { title, type, link, tags } = context.validatedData;
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
  try {
    await prisma.$transaction(async (prisma) => {
      const TagsRecord = await Promise.all(
        tags.map((tag) =>
          prisma.tags.upsert({
            where: {
              title: tag,
            },
            update: {},
            create: {
              title: tag,
            },
          })
        )
      );
      await prisma.content.create({
        data: {
          title,
          link,
          type,
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
