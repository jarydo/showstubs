// src/app/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import TicketStub from "../components/TicketStub";
import Pagination from "../components/Pagination";
import { Setlist, SetlistsResponse, PaginationInfo } from "../types/setlist";

function HomeContent() {
  const [username, setUsername] = useState("");
  const [setlists, setSetlists] = useState<Setlist[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSharedView, setIsSharedView] = useState(false);

  const searchParams = useSearchParams();

  useEffect(() => {
    // Check for userId in URL search params (from redirect)
    const urlUserId = searchParams.get("userId");
    const urlPage = searchParams.get("page");

    // Also check if there's a userId in the URL path directly
    const pathUserId = window.location.pathname.split("/")[1];

    const targetUserId = urlUserId || pathUserId;
    const targetPage = urlPage ? parseInt(urlPage) : 1;

    if (targetUserId && targetUserId !== "") {
      setUsername(targetUserId);
      setCurrentPage(targetPage);
      setIsSharedView(true);
      fetchSetlists(targetUserId, targetPage);
    }
  }, [searchParams]);

  const fetchSetlists = async (userId?: string, page: number = 1) => {
    const targetUserId = userId || username;

    if (!targetUserId.trim()) {
      setError("Please enter a user ID");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `/api/setlists/${encodeURIComponent(targetUserId)}?page=${page}`
      );
      const data: SetlistsResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch setlists");
      }

      setSetlists(data.setlists || []);
      setPagination(data.pagination);
      setCurrentPage(page);

      // Update URL if not already a shared view
      if (!isSharedView && !searchParams.get("userId")) {
        const url =
          page > 1 ? `/${targetUserId}?page=${page}` : `/${targetUserId}`;
        window.history.pushState({}, "", url);
      } else if (isSharedView && page > 1) {
        // Update URL with page parameter for shared views
        const currentUrl = new URL(window.location.href);
        currentUrl.searchParams.set("page", page.toString());
        window.history.pushState({}, "", currentUrl.toString());
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setSetlists([]);
      setPagination(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchSetlists(undefined, 1);
  };

  const handlePageChange = (page: number) => {
    fetchSetlists(username, page);
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const shareCollection = () => {
    const shareUrl = `${window.location.origin}/${username}`;
    navigator.clipboard
      .writeText(shareUrl)
      .then(() => {
        alert("Share link copied to clipboard!");
      })
      .catch(() => {
        // Fallback for browsers that don't support clipboard API
        const textArea = document.createElement("textarea");
        textArea.value = shareUrl;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        alert("Share link copied to clipboard!");
      });
  };

  return (
    <main className="min-h-screen bg-white py-8 px-4 ">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-black mb-4 ">
            🎫 ShowStubs
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Turn your setlist.fm setlist history into beautiful ticket stubs
          </p>
          {!isSharedView && (
            <div className="text-sm text-gray-500 max-w-2xl mx-auto">
              <p>
                💡 <strong>How to find your User ID:</strong> Go to your
                setlist.fm profile and look at the URL. Your User ID is the
                number after{" "}
                <code className="bg-gray-200 px-1 rounded">/user/</code>
              </p>
            </div>
          )}
        </div>

        {!isSharedView && (
          <div className="bg-black/10 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-black/20">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-4"
            >
              <div className="flex-1">
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your setlist.fm user ID"
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-black/30 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-transparent"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 bg-[#85b146] text-white font-semibold rounded-lg hover:bg-[#6a8c38] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#56732d]"
              >
                {loading ? "Generating..." : "Generate Tickets"}
              </button>
            </form>
          </div>
        )}

        {error && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-6">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-400"></div>
            <p className="text-gray-600 mt-4">
              Fetching your setlist history...
            </p>
          </div>
        )}

        {setlists.length > 0 && pagination && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-black mb-2">
                {isSharedView
                  ? `Concert Ticket Stubs (${pagination.totalItems} shows)`
                  : `Your Concert Ticket Stubs (${pagination.totalItems} shows)`}
              </h2>
              <div className="flex justify-center gap-4 items-center">
                <p className="text-gray-600 text-sm">
                  Showing {20 * (pagination.currentPage - 1) + 1}-
                  {setlists.length + 20 * (pagination.currentPage - 1)} of{" "}
                  {pagination.totalItems} shows
                </p>
              </div>
              <div className="flex justify-center mt-4">
                {username && (
                  <button
                    onClick={shareCollection}
                    className="px-4 py-2 bg-[#85b146] hover:bg-[#6a8c38] text-white text-sm font-medium rounded-lg transition-colors duration-200 cursor-pointer flex items-center gap-2"
                  >
                    📋 Share Collection
                  </button>
                )}
              </div>
            </div>

            {/* Pagination at top */}
            <Pagination
              currentPage={currentPage}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
              loading={loading}
            />

            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 place-items-center">
              {setlists.map((setlist, index) => (
                <TicketStub key={`${setlist.id}-${index}`} setlist={setlist} />
              ))}
            </div>

            {/* Pagination at bottom */}
            <Pagination
              currentPage={currentPage}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
              loading={loading}
            />
          </div>
        )}

        {!loading && setlists.length === 0 && username && !error && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              No setlists found for this user ID.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

// Loading fallback component
function LoadingFallback() {
  return (
    <main className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-black mb-4">
            🎫 ShowStubs
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Turn your setlist.fm concert history into beautiful ticket stubs
          </p>
        </div>
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-400"></div>
          <p className="text-gray-600 mt-4">Loading...</p>
        </div>
      </div>
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <HomeContent />
    </Suspense>
  );
}
