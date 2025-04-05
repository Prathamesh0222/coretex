import CredentialsProvider from "next-auth/providers/credentials";
import { SigninSchema } from "../validators/auth.validator";
import { prisma } from "../utils/prisma";
import { compare } from "bcryptjs";
import { JWT } from "next-auth/jwt";
import { Session, User } from "next-auth";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { type: "text", placeholder: "John Doe", label: "Username" },
        password: { type: "password", label: "password" },
      },
      async authorize(
        credentials
      ): Promise<{ id: string; username: string; email: string } | null> {
        try {
          const parsedData = SigninSchema.safeParse(credentials);
          if (!parsedData.success) {
            throw new Error("Validation Failed");
          }
          const { email, password } = parsedData.data;

          const user = await prisma.user.findUnique({
            where: { email },
          });
          if (!user) {
            throw new Error("User not found");
          }

          const isPasswordValid = await compare(password, user?.password);
          if (!isPasswordValid) {
            throw new Error("Invalid Password");
          }

          return {
            id: user.id,
            email: user.email,
            username: user.username,
          };
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: User }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      session.user.id = token.id;
      session.user.email = token.email;
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
