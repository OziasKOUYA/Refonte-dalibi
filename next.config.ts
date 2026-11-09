import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Évite d'embarquer tout le catalogue d'icônes dans le bundle
  experimental: {
    optimizePackageImports: ["@hugeicons/core-free-icons"],
  },
};

export default nextConfig;
