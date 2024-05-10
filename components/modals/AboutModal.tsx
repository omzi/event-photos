'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useAbout } from '#/hooks/useAbout';
import { Button } from '#/components/ui/button';
import { GithubIcon, TwitterIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader } from '#/components/ui/dialog';

const AboutModal = () => {
	const aboutModal = useAbout();

	return (
		<Dialog open={aboutModal.isOpen} onOpenChange={aboutModal.onClose}>
			<DialogContent showCloseButton={false} className='rounded-lg w-[calc(100%-20px)] sm:w-[24rem] md:w-[30rem]'>
				<DialogHeader className='items-center space-y-3'>
					<Image
						src='/images/logo-light.png'
						height={64}
						width={64}
						alt='EPG Logo'
						className='block dark:hidden'
					/>
					<Image
						src='/images/logo-dark.png'
						height={64}
						width={64}
						alt='EPG Logo'
						className='hidden dark:block'
					/>
					<h2 className='text-lg font-bold'>About EPG</h2>
				</DialogHeader>
				<p className='text-center text-muted-foreground'>EPG (Event Photos Gallery) is a customizable, AI-powered platform for uploading photos from your events.</p>
				<div className='flex flex-col mx-auto text-center xs:flex-row gap-y-2 xs:gap-x-2'>
					<Link href='https://twitter.com/intent/follow?screen_name=0xOmzi' target='_blank' rel='noopener noreferrer'>
						<Button className='inline-flex items-center gap-x-2' size='sm' variant='outline' tabIndex={-1}>
							<TwitterIcon className='w-4 h-4' />
							Follow on Twitter
						</Button>
					</Link>
					<Link href='https://github.com/omzi/tremor-ai' target='_blank' rel='noopener noreferrer'>
						<Button className='inline-flex items-center gap-x-2' size='sm' variant='outline' tabIndex={-1}>
							<GithubIcon className='w-4 h-4' />
							Star on GitHub
						</Button>
					</Link>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default AboutModal;
