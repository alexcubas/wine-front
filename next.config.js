/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
    "img.wine.com.br",
    "www.wine.com.br"
    ],
    formats: ['image/avif', 'image/webp']
    } 
}

module.exports = nextConfig
