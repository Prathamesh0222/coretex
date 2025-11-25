import { authOptions } from "@/app/config/auth.config";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (req: NextRequest) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { contentId, notesId } = await req.json();
    const userId = session.user.id;

    if (!contentId && !notesId) {
      return NextResponse.json(
        { error: "Either contentId or notesId is required" },
        { status: 400 }
      );
    }

    if (contentId) {
      const content = await prisma.content.findFirst({
        where: { id: contentId, userId },
      });

      if (!content) {
        return NextResponse.json(
          { error: "Content not found or unauthorized" },
          { status: 404 }
        );
      }

      await prisma.content.update({
        where: { id: contentId },
        data: { spacesId: null },
      });
    }

    if (notesId) {
      const notes = await prisma.notes.findFirst({
        where: { id: notesId, userId },
      });

      if (!notes) {
        return NextResponse.json(
          { error: "Notes not found or unauthorized" },
          { status: 404 }
        );
      }

      await prisma.notes.update({
        where: { id: notesId },
        data: { spacesId: null },
      });
    }

    return NextResponse.json(
      { success: true, message: "Removed from space successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error removing from space", error);
    return NextResponse.json(
      { error: "Error removing from space" },
      { status: 500 }
    );
  }
};
