import { prisma } from "@/app/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ hash: string }> }
) => {
  try {
    const { hash } = await params;

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
    console.error("Error fetching shared content:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
};
