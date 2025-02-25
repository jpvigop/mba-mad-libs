/** @type {import('next').NextConfig} */
const nextConfig = {
  // Updated config with compatible options
  reactStrictMode: false, // Disable strict mode to prevent double rendering in development
  compiler: {
    // Remove console.logs in production
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Force static rendering for all pages
  // Note: API routes don't work with static exports
  // We'll use client-side generation instead
  output: 'export',
  // Disable image optimization since we're using static export
  images: { unoptimized: true },
};

export default nextConfig; 