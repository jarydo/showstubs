import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
    SETLISTFM_API_KEY: process.env.SETLISTFM_API_KEY,
  },
  assetPrefix:
    process.env.NODE_ENV === "production"
      ? "https://curiosity-cards-jaryd-diamonds-projects.vercel.app"
      : "",

  images: {
    unoptimized: true,
  },
};

export default nextConfig;
