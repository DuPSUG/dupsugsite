/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: { unoptimized: true },
  output: 'export',
  distDir: "docsnew",
  basePath: '/dupsugsite',
  assetPrefix: '/dupsugsite/',
  images: { unoptimized: true }
}

export default nextConfig
