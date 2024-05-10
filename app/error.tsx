'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FC, useEffect } from 'react';
import { Button } from '#/components/ui/button';

type ErrorProps = {
	error: Error & { digest?: string }
	reset: () => void // Attempt to recover by trying to re-render the segment
}

const Error: FC<ErrorProps> = ({ error, reset }) => {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error('A fatal error occurred :>>', error);
	}, [error]);

	return (
		<div className='flex flex-col items-center justify-center h-full space-y-4'>
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
			<h2 className='text-4xl font-semibold font-clash-display text-center'>An Error Occurred ;(</h2>
			<p className='text-muted-foreground text-base text-center px-4 xs:w-96'>
				We hit a snag! We&apos;ll have it sorted out soon.
			</p>
			<Button className='bg-black hover:bg-gray-800 transition-colors duration-300' onClick={() => reset()}>
				Try again?
			</Button>
			<Link href='/'>
				<Button className='bg-core hover:bg-blue-800 transition-colors duration-300'>
					Go home
				</Button>
			</Link>
		</div>
	)
}

export default Error;
