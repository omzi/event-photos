'use client';

import Link from 'next/link';
import { cn } from '#/lib/utils';
import { LucideIcon } from 'lucide-react';

interface HeroButtonProps {
	label: string;
	onClick?: () => void;
	icon: LucideIcon;
	active?: boolean;
	isLink?: boolean;
	path?: string;
}

const HeroButton = ({
	label,
	onClick,
	icon: Icon,
	active,
	isLink,
	path
}: HeroButtonProps) => {
	return (
		<>
			{isLink ? (
				<Link
					href={path!}
					onClick={onClick}
					role='button'
					className={cn(
						'flex justify-start xs:justify-center items-center flex-row xs:flex-col gap-2 w-full xs:w-16 sm:w-24 flex-shrink-0 py-2 px-4 rounded-xl bg-white/35 xs:bg-transparent hover:bg-white/35',
						active && 'bg-white/35 xs:bg-white/35'
					)}
				>
					<li className='flex justify-center items-center w-fit rounded-full bg-white p-2 xs:p-3 sm:p-4'>
						<Icon className='w-4 h-4 sm:w-5 sm:h-5 text-core' />
					</li>
					<p className='text-sm md:text-base text-center text-white'>{label}</p>
				</Link>
			) : (
				<div
					onClick={onClick}
					role='button'
					className={cn(
						'flex justify-start xs:justify-center items-center flex-row xs:flex-col gap-2 w-full xs:w-16 sm:w-24 flex-shrink-0 py-2 px-4 rounded-xl bg-white/35 xs:bg-transparent hover:bg-white/35',
						active && 'bg-white/35 xs:bg-white/35'
					)}
				>
					<li className='flex justify-center items-center w-fit rounded-full bg-white p-2 xs:p-3 sm:p-4'>
						<Icon className='w-4 h-4 sm:w-5 sm:h-5 text-core' />
					</li>
					<p className='text-sm md:text-base text-center text-white'>{label}</p>
				</div>
			)}
		</>
	);
};

export default HeroButton;
