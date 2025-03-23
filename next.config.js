/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable React Strict Mode which causes double-rendering
  reactStrictMode: false,
  
  // Generate static HTML export (no server rendering)
  output: 'export',
  
  // Disable image optimization since we're using static export
  images: {
    unoptimized: true,
  },
  
  // Disable server components completely
  experimental: {
    appDir: true,
  },

  // Disable any tracing/sourcemaps in production
  productionBrowserSourceMaps: false,
  
  // Add specific attributes to suppress in the HTML
  suppressHydrationWarning: true,
}

module.exports = nextConfig
