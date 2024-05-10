import type { Metadata } from 'next';

import Details from '#/app/(main)/details/Details';

export const metadata: Metadata = {
	title: `Event Details ~ ${process.env.EVENT_NAME}`,
	description: 'Edit event details.'
};

const Page = () => {
	return <Details />;
};

export default Page;
