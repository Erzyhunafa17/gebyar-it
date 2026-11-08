import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Enable server components and app router features */
  reactStrictMode: true,
  // Allow @react-three packages to be transpiled properly
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],
  experimental: {
    cpus: 1,
  },
};

export default nextConfig;
