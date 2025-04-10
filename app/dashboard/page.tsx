"use client";

import { ContentArea } from "@/components/ContentArea";
import { Sidebar } from "@/components/Sidebar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === "unauthenticated") {
      router.push("/signin");
    }
  }, [session.status, router]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full p-3">
        <div className="border h-full p-2 rounded-xl dark:bg-[#141212] bg-[#f6f7f7]">
          <ContentArea />
        </div>
      </div>
    </div>
  );
}
