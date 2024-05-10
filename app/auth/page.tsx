import Auth from '#/app/auth/Auth';
import type { Metadata } from 'next';
import { getSession } from '#/lib/auth';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
	title: `Sign In ~ ${process.env.EVENT_NAME}`,
	description: 'Sign in your EPG account'
};

const Page = async () => {
	const session = await getSession();
	if (session) redirect('/');

	return <Auth />;
};

export default Page;
