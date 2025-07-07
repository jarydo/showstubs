"use client";

import { useEffect, use } from "react";
import { useRouter } from "next/navigation";

interface UserPageProps {
  params: Promise<{
    userId: string;
  }>;
}

export default function UserPage({ params }: UserPageProps) {
  const router = useRouter();
  const { userId } = use(params);

  useEffect(() => {
    // Check if we're in a subpath context
    const currentPath = window.location.pathname;
    const isInShowstubs = currentPath.startsWith("/showstubs");

    // Redirect to appropriate base path with the userId in the URL
    if (isInShowstubs) {
      router.replace(`/showstubs?userId=${userId}`);
    } else {
      router.replace(`/?userId=${userId}`);
    }
  }, [userId, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#6a8c38] to-[#85b146] flex items-center justify-center">
      <div className="text-white text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white mb-4"></div>
        <p>Loading collection...</p>
      </div>
    </div>
  );
}
