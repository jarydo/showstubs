"use client";

import { useState } from "react";
import { Setlist } from "@/types/setlist";
import TicketStub from "@/components/TicketStub";

export default function Home() {
  const [username, setUsername] = useState("");
  const [setlists, setSetlists] = useState<Setlist[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchSetlists = async () => {
    if (!username.trim()) {
      setError("Please enter a username.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `/api/setlists/${encodeURIComponent(username)}`
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch setlists");
      }

      setSetlists(data.setlists || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setSetlists([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchSetlists();
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 bg-gradient-to-r from-pink-400 to-yellow-400 bg-clip-text text-transparent">
            🎫 ShowStubs
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Turn your setlist.fm setlist history into beautiful ticket stubs
          </p>
          <div className="text-sm text-gray-400 max-w-2xl mx-auto">
            <p>
              💡 <strong>How to find your User ID:</strong> Go to your
              setlist.fm profile and look at the URL. Your User ID is the number
              after <code className="bg-gray-800 px-1 rounded">/user/</code>
            </p>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-white/20">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4"
          >
            <div className="flex-1">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-white mb-2"
              >
                setlist.fm User ID
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your setlist.fm user ID"
                className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-lg hover:from-pink-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-400"
            >
              {loading ? "Generating..." : "Generate Tickets"}
            </button>
          </form>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-6">
            <p className="text-red-200">{error}</p>
          </div>
        )}

        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            <p className="text-white mt-4">Fetching your setlist history...</p>
          </div>
        )}

        {setlists.length > 0 && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-2">
                Your setlist Ticket Stubs ({setlists.length} shows)
              </h2>
              <p className="text-gray-300">
                Click any ticket to download as image
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {setlists.map((setlist, index) => (
                <TicketStub key={`${setlist.id}-${index}`} setlist={setlist} />
              ))}
            </div>
          </div>
        )}

        {!loading && setlists.length === 0 && username && !error && (
          <div className="text-center py-12">
            <p className="text-gray-300 text-lg">
              No setlists found for this username.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
