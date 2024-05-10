'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Payload } from '#/lib/auth';
import { InfoIcon } from 'lucide-react';
import { useAbout } from '#/hooks/useAbout';
import { Button } from '#/components/ui/button';
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
					src='/images/logo.png'
					height={40}
					width={40}
					alt='EPG Logo'
				/>
			</Link>
			<div className='flex items-center gap-x-2'>
				<ModeToggle />
				<Button onClick={aboutModal.onOpen} className='bg-white dark:bg-black hover:bg-gray-500/5 dark:hover:bg-gray-200/10 rounded-full shadow-sm p-1 h-10' variant='outline'>
					<InfoIcon className='hidden xs:inline w-8 h-8 mr-2 p-1.5 rounded-full bg-black/10 dark:bg-white/25 text-black dark:text-white' />
					<span className='xs:pr-4 px-2 xs:px-0 text-black dark:text-white'>About</span>
				</Button>
				
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
