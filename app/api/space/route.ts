import { authOptions } from "@/app/config/auth.config";
import { prisma } from "@/app/utils/prisma";
import { AddToSpaceSchema } from "@/app/validators/space.validator";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const session = await getServerSession(authOptions);
    const { name, description } = await req.json();

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

    await prisma.spaces.create({
      data: {
        name,
        description,
        userId: session?.user.id,
      },
    });

    return NextResponse.json(
      {
        success: "Space created successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error while creating a space", error);
    return NextResponse.json(
      {
        error: "Error while creating a space",
      },
      {
        status: 500,
      }
    );
  }
};

export const PATCH = async (req: NextRequest) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const parsedData = AddToSpaceSchema.safeParse(await req.json());
    if (!parsedData.success) {
      return NextResponse.json(
        { error: parsedData.error.errors },
        { status: 400 }
      );
    }

    const { spaceId, contentIds, notesIds } = parsedData.data;
    const userId = session.user.id;

    const space = await prisma.spaces.findFirst({
      where: { id: spaceId, userId },
    });

    if (!space) {
      return NextResponse.json(
        { error: "Space not found or unauthorized" },
        { status: 404 }
      );
    }

    await prisma.$transaction(async (tx) => {
      if (contentIds?.length) {
        const result = await tx.content.updateMany({
          where: {
            id: { in: contentIds },
            userId,
          },
          data: { spacesId: spaceId },
        });

        if (result.count !== contentIds.length) {
          throw new Error("Some content items not found or unauthorized");
        }
      }

      if (notesIds?.length) {
        const result = await tx.notes.updateMany({
          where: {
            id: { in: notesIds },
            userId,
          },
          data: { spacesId: spaceId },
        });

        if (result.count !== notesIds.length) {
          throw new Error("Some notes not found or unauthorized");
        }
      }
    });

    return NextResponse.json(
      { success: true, message: "Items added to space successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating the space", error);
    return NextResponse.json(
      { error: "Error updating the space" },
      { status: 500 }
    );
  }
};

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

  try {
    const spaces = await prisma.spaces.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        content: {
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
        },
        notes: {
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
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(spaces);
  } catch (error) {
    console.error("Error while fetching spaces", error);
    return NextResponse.json(
      { error: "Error while fetching spaces" },
      { status: 500 }
    );
  }
};

export const DELETE = async (req: NextRequest) => {
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

    const { spaceId } = await req.json();

    if (!spaceId) {
      return NextResponse.json(
        {
          error: "Space ID is required",
        },
        {
          status: 400,
        }
      );
    }

    const space = await prisma.spaces.findFirst({
      where: {
        id: spaceId,
        userId: session.user.id,
      },
    });

    if (!space) {
      return NextResponse.json(
        {
          error: "Space not found or unauthorized",
        },
        {
          status: 404,
        }
      );
    }

    await prisma.spaces.delete({
      where: {
        id: spaceId,
      },
    });

    return NextResponse.json(
      {
        message: "Space deleted successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error deleting space", error);
    return NextResponse.json(
      { error: "Error deleting space" },
      { status: 500 }
    );
  }
};
