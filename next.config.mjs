import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/lib/i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable standalone output for Docker optimization
  output: 'standalone',
  
  // Optimize for low-resource environments
  experimental: {
    // Reduce memory usage
    memoryBasedWorkersCount: true,
    // Optimize build process
    optimizePackageImports: ['lucide-react'],
  },
  
  // Optimize images for low memory
  images: {
    domains: ['localhost'],
    formats: ['image/webp'],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  
  // Environment variables
  env: {
    NEXT_PUBLIC_PLAUSIBLE_DOMAIN: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || 'gstdtoken.net',
  },
  
  // Compression and performance
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  
  // Memory optimization
  swcMinify: true,
  
  // Webpack optimizations for low memory
  webpack: (config, { isServer, dev }) => {
    // Reduce memory usage during build
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    
    // Optimize for production builds
    if (!dev) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true,
            },
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              priority: -10,
              chunks: 'all',
            },
          },
        },
      };
    }
    
    return config;
  },
};

export default withNextIntl(nextConfig);
