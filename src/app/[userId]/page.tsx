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
    // Redirect to home page with the userId in the URL
    // The main page will handle the auto-loading
    router.replace(`/?userId=${userId}`);
  }, [userId, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
      <div className="text-white text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white mb-4"></div>
        <p>Loading collection...</p>
      </div>
    </div>
  );
}
