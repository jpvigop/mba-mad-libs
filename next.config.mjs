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
  
  // Add custom webpack config to help with hydration issues
  webpack: (config, { dev, isServer }) => {
    // Only apply in the client and during development
    if (!isServer && dev) {
      // Find the ReactRefreshPlugin and modify its options
      const plugins = config.plugins;
      for (const plugin of plugins) {
        if (plugin.constructor.name === 'ReactRefreshPlugin') {
          // Make React Refresh more tolerant of DOM changes
          plugin.options.overlay = {
            entry: plugin.options.overlay.entry,
            module: plugin.options.overlay.module,
            sockIntegration: plugin.options.overlay.sockIntegration,
            sockHost: plugin.options.overlay.sockHost,
            sockPath: plugin.options.overlay.sockPath,
            // Disable error overlay for hydration issues
            catchRuntimeError: false
          };
        }
      }
    }
    return config;
  },
};

export default nextConfig; 