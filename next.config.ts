import type { NextConfig } from "next";

// Static export: `next build` writes plain HTML/CSS/JS to out/, which
// Cloudflare serves as static assets (wrangler.jsonc, docs/DEPLOY.md).
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
