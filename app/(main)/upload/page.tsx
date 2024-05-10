import type { Metadata } from 'next';
import Upload from '#/app/(main)/upload/Upload';

export const metadata: Metadata = {
	title: 'Upload Event Photos ~ EPG',
	description: 'Upload photos from your event.'
};

const Page = () => {
	return <Upload />;
};

export default Page;
