import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/storage/"
      },
      {
        protocol: "https",
        hostname: "helldestruction-production-64b8.up.railway.app",
        pathname: "/storage/**"
      }
    ],
  },
};

export default nextConfig;
