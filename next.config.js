const path = require('path');

// next dev --experimental-https
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
	},
	webpack: (config) => {
		// Ignore node-specific modules when bundling for the browser
		// See https://webpack.js.org/configuration/resolve/#resolvealias
		config.resolve.alias = {
			...config.resolve.alias,
			'workers': path.resolve(__dirname, 'lib/workers/')
		}

		return config;
	}
};

module.exports = nextConfig;
