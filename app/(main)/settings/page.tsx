import type { Metadata } from 'next';
import Settings from '#/app/(main)/settings/Settings';

export const metadata: Metadata = {
	title: `Settings ~ ${process.env.EVENT_NAME}`,
	description: 'Edit your event details.'
};

const Page = () => {
	return <Settings />;
};

export default Page;
