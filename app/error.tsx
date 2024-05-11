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
		<div className='flex flex-col items-center justify-center h-full space-y-4 bg-white dark:bg-black'>
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
			<h2 className='text-4xl font-semibold text-center font-clash-display'>An Error Occurred ;(</h2>
			<p className='px-4 text-base text-center text-muted-foreground xs:w-96'>
				We hit a snag! We&apos;ll have it sorted out soon.
			</p>
			<Button className='transition-colors duration-300 bg-gray-800 hover:bg-gray-700' onClick={() => reset()}>
				Try again?
			</Button>
			<Link href='/'>
				<Button className='transition-colors duration-300 bg-core hover:bg-blue-800'>
					Go home
				</Button>
			</Link>
		</div>
	)
}

export default Error;
