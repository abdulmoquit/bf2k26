import type { NextConfig } from "next";

const isExport = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: isExport ? "export" : undefined,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  ...(isExport ? {} : {
    async rewrites() {
      return [
        {
          source: "/:path*.html",
          destination: "/:path*",
        },
      ];
    },
  }),
};

export default nextConfig;
