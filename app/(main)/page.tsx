import prisma from '#/lib/prisma';
import dynamic from 'next/dynamic';
import type { Metadata } from 'next';
import { Loader } from 'lucide-react';

const Home = dynamic(() => import('#/app/(main)/Home'), {
	ssr: false,
	loading: () => (
		<div className='flex-1 flex flex-col items-center justify-center gap-y-4 h-full min-h-96 bg-gray-100 dark:bg-white/15 rounded-2xl p-5 sm:p-10 mb-4'>
			<Loader size={48} className='animate-spin' />
		</div>
	)
});

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
