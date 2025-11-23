"use client";

import { ContentArea } from "@/components/ContentArea";
import { Sidebar } from "@/components/Sidebar";
import { Layers } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const session = useSession();
  const router = useRouter();
  const [currentFilter, setCurrentFilter] = useState<string>("all");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (session.status === "unauthenticated") {
      router.push("/signin");
    } else if (session.status === "authenticated") {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  }, [session.status, router]);

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen animate-pulse duration-300">
        <Layers
          size={60}
          className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30 transition-all duration-300 group-hover:shadow-blue-500/50 group-hover:scale-105"
        />
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <Sidebar onFilterChange={setCurrentFilter} />
      <div className="w-full lg:p-3 h-screen overflow-hidden">
        <div
          className={`lg:border h-full ${
            currentFilter.toLowerCase() === "search" ? "p-0" : "p-2"
          } lg:rounded-xl dark:bg-[#141212] bg-[#f6f7f7] ${
            currentFilter.toLowerCase() === "search"
              ? "overflow-hidden"
              : "overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          }`}
        >
          <ContentArea currentFilter={currentFilter} />
        </div>
      </div>
    </div>
  );
}
