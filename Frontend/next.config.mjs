/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Removed output: 'export' to fix webpack runtime errors
  // Removed trailingSlash: true for better compatibility
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.ishop.cholobangla.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Add experimental features for better Next.js 15 compatibility
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
}

export default nextConfig
