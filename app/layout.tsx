import type { Metadata } from "next";
import "./globals.css";
import { CustomProvider } from "./providers/CustomProvider";
import { AuthProvider } from "./providers/AuthProvider";
import { Toaster } from "@/components/ui/sonner";
import { Manrope } from "next/font/google";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
});

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
        className={`${manrope.className} antialiased`}
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
