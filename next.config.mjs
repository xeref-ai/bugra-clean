/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    allowedDevOrigins: ["local-origin.dev", "*.local-origin.dev", "*.cloudworkstations.dev"],
  },
};

export default nextConfig;
