"use client";

import { ContentArea } from "@/components/ContentArea";
import { Sidebar } from "@/components/Sidebar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const session = useSession();
  const router = useRouter();
  const [currentFilter, setCurrentFilter] = useState<string>("all");

  useEffect(() => {
    if (session.status === "unauthenticated") {
      router.push("/signin");
    }
  }, [session.status, router]);

  return (
    <div className="flex h-screen">
      <Sidebar onFilterChange={setCurrentFilter} />
      <div className="w-full p-3 h-screen overflow-hidden">
        <div className="border h-full p-2 rounded-xl dark:bg-[#141212] bg-[#f6f7f7] overflow-y-auto">
          <ContentArea currentFilter={currentFilter} />
        </div>
      </div>
    </div>
  );
}
