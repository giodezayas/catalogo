/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
    // Permitir imágenes desde cualquier dominio en producción
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Optimizaciones para producción
  compress: true,
  poweredByHeader: false,
}

module.exports = nextConfig
