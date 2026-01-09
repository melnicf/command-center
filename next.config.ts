import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.logo.dev",
      },
      {
        protocol: "https",
        hostname: "logos.apistemic.com",
      },
      {
        protocol: "https",
        hostname: "img.logokit.com",
      },
    ],
  },
};

export default nextConfig;
