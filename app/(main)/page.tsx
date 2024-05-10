import type { Metadata } from 'next';

import Home from '#/app/(main)/Home';

export const metadata: Metadata = {
	title: 'Home ~ EPG',
	description: 'View the Event Photos Gallery.'
};

const Page = () => {
	return <Home />;
};

export default Page;
