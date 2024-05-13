const sharp = require('sharp');
const { encode } = require('blurhash');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.handler = async (event, context) => {
	try {
		const requestBody = JSON.parse(event.body);
		const { url } = requestBody;

		// Convert image to buffer...
		const loadedImage = await fetch(url).then(response => response.blob()).then(blob => blob.arrayBuffer());

		const { data, info } = await sharp(Buffer.from(loadedImage))
			.ensureAlpha()
			.raw()
			.toBuffer({ resolveWithObject: true });

		const blurhash = encode(new Uint8ClampedArray(data), info.width, info.height, 4, 4);

		await prisma.photo.update({
			where: { url: url },
			data: { blurhash: blurhash }
		});

		return { statusCode: 200, body: JSON.stringify({ message: 'Blurhash updated successfully' } )};
	} catch (error) {
		console.log('Netlify Function Error :>>', error);
		return { statusCode: 500, body: JSON.stringify({ message: 'Internal Server Error', error }) };
	} finally {
		await prisma.$disconnect();
	}
};
