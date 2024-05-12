import prisma from '#/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

const GET = async (request: NextRequest) => {
	try {
		const photos = await prisma.photo.findMany({
			orderBy: { createdAt: 'desc' }
		});

		return NextResponse.json({ message: 'All event photos', data: photos }, { status: 200 });
	} catch (error) {
		console.error('Server Error [GET/Photos]:>>', error);
		return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
	}
}

export { GET };
