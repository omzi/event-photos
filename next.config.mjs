/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		optimizeCss: true
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'files.edgestore.dev'
			}
		]
	}
};

export default nextConfig;
