'use client';

import { Payload } from '#/lib/auth';
import { usePathname } from 'next/navigation';
import HeroButton from '#/components/shared/HeroButton';
import { ImageIcon, InfoIcon, SettingsIcon, SparkleIcon, SparklesIcon, UploadIcon } from 'lucide-react';

interface HeroCardProps {
	user?: Payload['user'] | null;
}

const HeroCard = ({ user }: HeroCardProps) => {
	const pathname = usePathname();

	return (
		<section className='relative flex flex-col justify-center items-center gap-y-6 rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 p-5 sm:p-10 shadow-inner'>
			<SparklesIcon className='absolute text-white stroke-1 z-0 top-4 left-4 opacity-20 w-20 h-20' />
			<SparkleIcon className='absolute text-white stroke-1 z-0 bottom-4 right-4 opacity-20 w-20 h-20' />

			<h1 className='text-3xl sm:text-4xl font-semibold font-clash-display flex-wrap text-center text-white shadow-sm'>
				EPG Fest 2024
			</h1>

			<p className='text-white/75 text-lg text-center max-w-[35ch]'>
				Our incredible EPG community got together in Enugu, NG for our first ever in-person conference!
			</p>

			<ul className='grid grid-cols-2 xs:flex justify-center items-center z-10 max-w-5xl w-full mx-auto gap-2.5 xs:gap-x-4 sm:gap-x-8 md:gap-x-12 lg:gap-x-20'>
				<HeroButton
					isLink
					label='Gallery'
					path='/'
					icon={ImageIcon}
					active={pathname === '/'}
				/>
				<HeroButton
					isLink
					label='Details'
					path='/details'
					icon={InfoIcon}
					active={pathname === '/details'}
				/>
				{user && (
					<>
						<HeroButton
							isLink
							label='Upload'
							path='/upload'
							icon={UploadIcon}
							active={pathname === '/upload'}
						/>
						<HeroButton
							isLink
							label='Settings'
							path='/settings'
							icon={SettingsIcon}
							active={pathname === '/settings'}
						/>
					</>
				)}
			</ul>
		</section>
	)
}

export default HeroCard;
