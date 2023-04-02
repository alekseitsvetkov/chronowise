/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@chronowise/ui"],
  images: {
    domains: ['chronowise.vercel.app', 'localhost'],
  },
}

module.exports = nextConfig