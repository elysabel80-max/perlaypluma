import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Images are served straight from the CDN origin: no `sharp` binary required
  // in restricted/shared hosting environments (Hostinger, cPanel, etc.).
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "media.aiku.io" },
      { protocol: "https", hostname: "*.aiku.io" },
      { protocol: "https", hostname: "*.nihaojewelry.com" },
      { protocol: "https", hostname: "*.awartisan.es" },
    ],
  },
  serverExternalPackages: ["pg"],
};

export default nextConfig;
