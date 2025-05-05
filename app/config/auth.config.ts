import CredentialsProvider from "next-auth/providers/credentials";
import { SigninSchema } from "../validators/auth.validator";
import { prisma } from "../utils/prisma";
import { compare } from "bcryptjs";
import { JWT } from "next-auth/jwt";
import { Profile, Session, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    }),
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
    async signIn({
      user,
      account,
      profile,
    }: {
      user: User;
      account: { provider: string } | null;
      profile?: Profile;
    }): Promise<boolean> {
      if (account?.provider === "google" || account?.provider === "github") {
        const email = user.email || profile?.email;

        if (!email) {
          return false;
        }
        try {
          const dbUser = await prisma.user.upsert({
            where: {
              email,
            },
            update: {},
            create: {
              email,
              username: user.name || profile?.name || "",
              password: "",
            },
          });

          user.id = dbUser.id;
          return true;
        } catch (error) {
          console.error("Error while creating user", error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user }: { token: JWT; user: User }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.username = token.username;

      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
