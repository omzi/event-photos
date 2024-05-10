'use client';

import Link from 'next/link';
import { useLogOut } from '#/hooks/useLogOut';
import { ExternalLinkIcon } from 'lucide-react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger
} from '#/components/ui/dropdown-menu';
import { Button } from '#/components/ui/button';
import { Skeleton } from '#/components/ui/skeleton';
import { MouseEvent as ReactMouseEvent } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '#/components/ui/avatar';

interface UserButtonProps {
	profilePicture: string;
	email: string;
}

const UserButton = ({
	profilePicture,
	email
}: UserButtonProps) => {
	const logOutModal = useLogOut();
	const handleLogOutClick = (e: ReactMouseEvent<HTMLDivElement, MouseEvent>) => {
		logOutModal.onOpen();
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='ghost' className='relative w-10 h-10 rounded-full'>
					<Avatar className='w-10 h-10'>
						<AvatarImage src={profilePicture} alt={`User's profile picture`} />
						<AvatarFallback>
							<Skeleton className='w-10 h-10 rounded-full' />
						</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-56 bg-white dark:bg-black' align='end' forceMount>
				<DropdownMenuLabel className='font-normal'>
					<p className='text-xs leading-none text-muted-foreground'>
						{email}
					</p>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<Link href='https://github.com/omzi/tremor-ai' target='_blank'>
						<DropdownMenuItem>
							About
							<DropdownMenuShortcut>
								<ExternalLinkIcon size={16} />
							</DropdownMenuShortcut>
						</DropdownMenuItem>
					</Link>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={handleLogOutClick}>
					Log Out
					<DropdownMenuShortcut className='opacity-100'>
						<kbd className='ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground'>
							<span className='text-xs'>⌘</span>L
						</kbd>
					</DropdownMenuShortcut>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default UserButton;
