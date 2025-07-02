import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
    SETLISTFM_API_KEY: process.env.SETLISTFM_API_KEY,
  },
};

export default nextConfig;
