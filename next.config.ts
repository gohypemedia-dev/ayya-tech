import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [{
      source: '/parallax_frames/:path*',
      headers: [{ key: 'Cache-Control', value: 'public, max-age=86400' }],
    }];
  },
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
