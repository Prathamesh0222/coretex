import { authOptions } from "@/app/config/auth.config";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

function generatesHash() {
  const char = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < 16; i++) {
    result += char.charAt(Math.floor(Math.random() * char.length));
  }
  return result;
}

export const POST = async () => {
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
          shareUrl: `${process.env.NEXTAUTH_URL}/share/${existingLink.hash}`,
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
      data: {
        hash: newLink.hash,
        shareUrl: `${process.env.NEXTAUTH_URL}/share/${newLink.hash}`,
      },
    });
  } catch (error) {
    console.error("Failed", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
};
