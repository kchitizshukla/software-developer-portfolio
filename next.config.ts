import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root so a lockfile elsewhere on the machine can't be picked up.
  turbopack: {
    root: path.resolve(import.meta.dirname),
  },
  // Hide the floating Next.js dev-tools badge in the corner.
  devIndicators: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  poweredByHeader: false,
};

export default nextConfig;
