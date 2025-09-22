/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: { unoptimized: true },
  output: 'export',
  distDir: "docs",
  basePath: '/dupsugsite',
  assetPrefix: '.',              // forces relative requests
  images: { unoptimized: true }
}

export default nextConfig
