/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
  },
  // Optimizaciones para producción
  compress: true,
  poweredByHeader: false,
}

module.exports = nextConfig
