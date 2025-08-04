import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images : {
    remotePatterns : [
      {hostname : 'c.saavncdn.com'}
    ]
  }
};

export default nextConfig;
