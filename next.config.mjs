// next.config.mjs
const repo = 'dupsugsite';

export default {
  output: 'export',
  distDir: 'docs',
  basePath: `/${repo}`,
  assetPrefix: '.',            // force relative asset + RSC URLs
  images: { unoptimized: true }
};