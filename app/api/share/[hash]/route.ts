import { prisma } from "@/app/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { hash: string } }
) => {
  try {
    const { hash } = params;

    const link = await prisma.link.findFirst({
      where: {
        hash,
        isActive: true,
      },
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
    });

    if (!link) {
      return NextResponse.json({ error: "Link not found" }, { status: 404 });
    }

    const [contents, notes] = await Promise.all([
      prisma.content.findMany({
        where: {
          userId: link.userId,
        },
        include: {
          ContentTags: {
            include: {
              tags: true,
            },
          },
        },
      }),
      prisma.notes.findMany({
        where: {
          userId: link.userId,
        },
        include: {
          NotesTags: {
            include: {
              tags: true,
            },
          },
        },
      }),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        user: link.user,
        contents,
        notes,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
};
