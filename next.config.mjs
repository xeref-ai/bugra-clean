
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import bundleAnalyzer from '@next/bundle-analyzer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your existing Next.js config goes here
};

export default withBundleAnalyzer(nextConfig);
