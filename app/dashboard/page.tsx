"use client";

import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
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
    <div>
      {session.data?.user.username}
      {session.data?.user.email}
      <Button
        onClick={() => {
          signOut();
          router.push("/signin");
        }}
      >
        {session.status === "authenticated" ? "Logout" : "Signin"}
      </Button>
    </div>
  );
}
