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
	// output: 'export' generates relative './_next/...' paths by default.
	// From deep routes like /blogs/slug, './' resolves to '/blogs/' and all
	// chunk loads 404. Setting assetPrefix '/' forces absolute '/_next/...'
	// paths that work at any URL depth. Safe for root-domain GitHub Pages.
	assetPrefix: '/',
	output: 'export',
}

module.exports = nextConfig
