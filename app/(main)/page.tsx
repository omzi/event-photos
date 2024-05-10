import type { Metadata } from 'next';
import Home from '#/app/(main)/Home';

export const metadata: Metadata = {
	title: `Home ~ ${process.env.NEXT_PUBLIC_EVENT_NAME}`,
	description: 'View the event photos gallery.'
};

const Page = () => {
	return <Home />;
};

export default Page;
