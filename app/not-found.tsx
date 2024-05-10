import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { Button } from '#/components/ui/button';

export const metadata: Metadata = {
	title: 'Page Not Found ;( ~ EPG'
};

const NotFound = () => {
	return (
		<div className='flex flex-col items-center justify-center gap-y-4 bg-white dark:bg-black h-svh'>
			<div className='hidden dark:block'>
				<Image
					src='/images/error-dark.svg'
					height='300'
					width='300'
					alt='Error'
					fetchPriority='high'
				/>
			</div>
			<div className='block dark:hidden'>
				<Image
					src='/images/error-light.svg'
					height='300'
					width='300'
					alt='Error'
					fetchPriority='high'
				/>
			</div>
			<h2 className='text-4xl font-semibold font-clash-display text-center'>Page Not Found ;(</h2>
			<p className='text-muted-foreground text-base text-center px-4 xs:w-96'>
				Oops! The page you requested does not exist. Let&apos;s get you back on track.
			</p>
			<Link href='/'>
				<Button className='bg-core hover:bg-blue-800 transition-colors duration-300' size='sm'>
					Go home
				</Button>
			</Link>
		</div>
	)
}

export default NotFound;
