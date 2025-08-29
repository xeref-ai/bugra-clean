
const {
  NEXT_PUBLIC_ACTIVITY_ENABLED
} = process.env;

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_ACTIVITY_ENABLED,
  }
};

module.exports = nextConfig;
