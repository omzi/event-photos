'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Payload } from '#/lib/auth';
import { InfoIcon } from 'lucide-react';
import { useAbout } from '#/hooks/useAbout';
import ModeToggle from '#/components/ModeToggle';
import { generateDefaultAvatar } from '#/lib/utils';
import UserButton from '#/components/shared/UserButton';

interface NavBarProps {
	user?: Payload['user'] | null;
}

const NavBar = ({ user }: NavBarProps) => {
	const aboutModal = useAbout();
	
	return (
		<nav className='flex items-center justify-between w-full p-4 py-4 md:px-8 md:mt-2.5'>
			<Link href='/'>
				<Image
					src='/images/logo-light.png'
					height={40}
					width={40}
					alt='EPG Logo'
					className='block dark:hidden'
				/>
				<Image
					src='/images/logo-dark.png'
					height={40}
					width={40}
					alt='EPG Logo'
					className='hidden dark:block'
				/>
			</Link>
			<div className='flex items-center gap-x-2'>
				<ModeToggle />
				<button onClick={aboutModal.onOpen} className='items-center justify-center gap-x-1 p-1.5 rounded-full text-white bg-black shadow-sm'>
					<InfoIcon className='hidden xs:inline w-8 h-8 mr-2 p-1.5 rounded-full bg-white/25 text-white' />
					<span className='xs:pr-4 px-2 xs:px-0'>About</span>
				</button>
				
				{user && (
					<UserButton
						profilePicture={generateDefaultAvatar(user.email)}
						email={user.email}
					/>
				)}
			</div>
		</nav>
	)
}

export default NavBar;
