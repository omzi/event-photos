'use client';

import { useState } from 'react';
import Loader from 'react-ts-loaders';
import { toast } from 'react-toastify';
import { useLogOut } from '#/hooks/useLogOut';
import { usePathname } from 'next/navigation';
import { Button } from '#/components/ui/button';
import { AlertTriangleIcon } from 'lucide-react';
import { cn, protectedRoutes } from '#/lib/utils';
import * as logOut from '#/lib/actions/handleLogOut';
import { Dialog, DialogContent, DialogHeader } from '#/components/ui/dialog';

const LogOutModal = () => {
	const pathname = usePathname();
	const logOutModal = useLogOut();
	const [isLoggingOut, setIsLoggingOut] = useState(false);

	const handleLogOut = async () => {
		setIsLoggingOut(true);
		await logOut.default();
		setIsLoggingOut(false);
		logOutModal.onClose();
		toast.info(`You've been logged out!`);

		if (protectedRoutes.includes(pathname)) {
			document.location.href = pathname;
		}
	}

	const handleLogOutModalClose = () => {
		if (isLoggingOut) return;
		
		logOutModal.onClose();
	}
	
	return (
		<Dialog open={logOutModal.isOpen} onOpenChange={handleLogOutModalClose}>
			<DialogContent className='rounded-lg w-[calc(100%-20px)] xs:w-[24rem] sm:w-[36rem] md:w-[44rem] space-y-0 flex flex-col gap-0' showCloseButton={false}>
				<DialogHeader>
					<div className='sm:flex sm:items-start'>
						<div className='flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-red-100 rounded-full sm:mx-0 sm:h-10 sm:w-10'>
							<AlertTriangleIcon className='w-6 h-6 text-red-600' />
						</div>
						<div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
							<h3 className='text-base font-semibold leading-6 text-gray-900 dark:text-gray-100'>
								Confirm log out
							</h3>
							<div className='mt-2'>
								<p className='text-sm text-gray-500'>
									Are you sure you want to log out? You will be signed out of
									your account, and any unsaved changes may be lost.
								</p>
							</div>
						</div>
					</div>
				</DialogHeader>
				
				<div className='flex justify-center mt-3.5 gap-x-3.5 sm:justify-end'>
					<Button variant='outline' onClick={handleLogOutModalClose}>Cancel</Button>
					<Button className='relative' disabled={isLoggingOut} onClick={handleLogOut} autoFocus>
						<span className={cn('opacity-100 flex items-center', isLoggingOut && 'opacity-0')}>
							Log Out
						</span>
						{isLoggingOut && (
							<div className='absolute flex items-center justify-center w-full h-full'>
								<Loader type='spinner' size={28} className='text-white leading-[0]' />
							</div>
						)}
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default LogOutModal;
