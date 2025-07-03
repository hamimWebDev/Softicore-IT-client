/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // loader: "custom",
    // unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // any domain
      },
    ],
  },
}

module.exports = nextConfig 