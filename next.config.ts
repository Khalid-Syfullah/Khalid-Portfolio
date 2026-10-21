import type { NextConfig } from "next";

// Static export: `next build` writes plain HTML/CSS/JS to out/, which
// GitHub Actions uploads to the Lightsail server (see docs/DEPLOY.md).
const nextConfig: NextConfig = {
  output: "export",
  // No Next image optimizer in a static export; images are pre-sized in public/images.
  images: { unoptimized: true },
  poweredByHeader: false,
  reactStrictMode: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
