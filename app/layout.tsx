import type { Metadata } from "next";
import "./globals.css";
import { CustomProvider } from "./providers/CustomProvider";
import { AuthProvider } from "./providers/AuthProvider";
import { Toaster } from "@/components/ui/sonner";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Coretex",
  description: "Second Brain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} antialiased`}
        suppressHydrationWarning
      >
        <AuthProvider>
          <CustomProvider>{children}</CustomProvider>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
