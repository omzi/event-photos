import dynamic from 'next/dynamic';
import type { Metadata } from 'next';
import { Loader } from 'lucide-react';

const Upload = dynamic(() => import('#/app/(main)/upload/Upload'), {
	ssr: false,
	loading: () => (
		<div className='flex-1 flex flex-col items-center justify-center gap-y-4 h-full min-h-96 bg-gray-100 dark:bg-white/15 rounded-2xl p-5 sm:p-10 mb-4'>
			<Loader size={48} className='animate-spin' />
		</div>
	)
});

export const metadata: Metadata = {
	title: `Upload Event Photos ~ ${process.env.NEXT_PUBLIC_EVENT_NAME}`,
	description: 'Upload photos from your event.'
};

const Page = () => {
	return <Upload />;
};

export default Page;
