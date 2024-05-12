import prisma from '#/lib/prisma';
import { getSession } from '#/lib/auth';
import { Prisma } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const POST = async (request: NextRequest) => {
	const body = await request.json();
	const session = await getSession();

	try {
		if (!session) {
			return NextResponse.json({ message: 'Unauthenticated!' }, { status: 401 });
		}

		const data = body as Prisma.PhotoCreateInput[];
		const photosCount = await prisma.photo.createMany({ data });

		return NextResponse.json({ message: 'Photos saved successfully!', data: photosCount }, { status: 201 });
	} catch (error) {
		console.error('Server Error [GET/Photos]:>>', error);
		return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
	}
}

export { POST };
