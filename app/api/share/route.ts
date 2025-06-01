import { authOptions } from "@/app/config/auth.config";
import { prisma } from "@/app/utils/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

function generatesHash() {
  const char = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < 16; i++) {
    result += char.charAt(Math.floor(Math.random() * char.length));
  }
  return result;
}

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        {
          error: "Not logged in",
        },
        {
          status: 401,
        }
      );
    }

    const userId = session.user.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const existingLink = await prisma.link.findFirst({
      where: {
        userId,
        isActive: true,
      },
    });

    if (existingLink) {
      return NextResponse.json({
        success: true,
        data: {
          hash: existingLink.hash,
          shareUrl: `http://localhost:3000/share/${existingLink.hash}`,
        },
      });
    }

    const hash = await generatesHash();

    const newLink = await prisma.link.create({
      data: {
        hash,
        userId,
      },
    });

    return NextResponse.json({
      success: true,
      shareUrl: `http://localhost:3000/share/${newLink.hash}`,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
};
