/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true,
  },
  env: {
    // Add your env variables here
    RAPIDAPI_KEY,
    API_HOST
  }
}

module.exports = nextConfig 