/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**',
			},
			{
				protocol: 'http',
				hostname: '**',
			},
		],
		unoptimized: true,
	},
	// In dev the browser resolves './' relative to the current URL, which
	// breaks deep routes like /blogs/[slug] by prefixing chunks with /blogs/.
	// Only apply the relative prefix for the static export (GitHub Pages).
	assetPrefix: process.env.NODE_ENV === 'production' ? './' : '',
	output: 'export',
}

module.exports = nextConfig
