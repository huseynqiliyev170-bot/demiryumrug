/** @type {import('next').NextConfig} */
const nextConfig = {
  agentRules: false,
  images: {
    // Serve modern formats and only the sizes the layout actually requests.
    formats: ['image/avif', 'image/webp'],
    // Next 16 requires every `quality` value used by next/image to be declared.
    qualities: [75, 82],
    deviceSizes: [420, 640, 828, 1080, 1280, 1600, 1920, 2048],
    imageSizes: [128, 256, 384, 512, 640],
    minimumCacheTTL: 31536000,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
      {
        // Optimized product photography — safe to cache aggressively.
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Instagram post plates — same treatment.
        source: '/Posts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}

export default nextConfig
