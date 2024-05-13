const path = require('path');

// next dev --experimental-https
/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		optimizeCss: true
	},
	images: {
		deviceSizes: [320, 480, 640, 720, 828, 1080, 1200, 1920, 2048, 3840],
		remotePatterns: [
			{ protocol: 'https', hostname: 'files.edgestore.dev' },
			{ protocol: 'http', hostname: 'localhost' },
			{ protocol: 'https', hostname: 'ep.omzi.dev' }
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
