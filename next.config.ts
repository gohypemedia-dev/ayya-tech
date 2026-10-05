import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/elements',
        destination: '/',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
