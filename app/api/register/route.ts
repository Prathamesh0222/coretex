import { validate } from "@/middlewares/validate.middleware";
import { SignUpInput, SignupSchema } from "@/validators/auth.validator";
import { hash } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const postHandler = async (
  req: NextRequest,
  context: { validatedData: SignUpInput }
) => {
  const { validatedData } = context;

  const { email, username, password } = context.validatedData;

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    return NextResponse.json({
      message: "User already exists",
      status: 422,
    });
  }

  const hashedPassword = await hash(password, 10);

  await prisma.user.create({
    data: {
      email,
      username,
      password: hashedPassword,
    },
  });

  return NextResponse.json({
    message: "Signup successful",
    data: validatedData,
  });
};

export const POST = validate(SignupSchema)(postHandler);
