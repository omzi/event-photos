import prisma from '#/lib/prisma';
import type { Metadata } from 'next';
import Home from '#/app/(main)/Home';

export const metadata: Metadata = {
	title: `Home ~ ${process.env.NEXT_PUBLIC_EVENT_NAME}`,
	description: 'View the event photos gallery.'
};

const Page = async () => {
	const photos = await prisma.photo.findMany({
		orderBy: { createdAt: 'desc' }
	});

	return <Home photos={photos} />;
};

export default Page;
