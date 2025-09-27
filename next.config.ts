import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
      },
      // {
      //   protocol: "https",
      //   hostname: "shopifycdn.net",
      // },
      // {
      //   protocol: "https",
      //   hostname: "www.jaketiendaelectronica.com",
      // },
    ],
  },

  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
