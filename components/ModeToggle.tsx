'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { Button } from '#/components/ui/button';

const ModeToggle = () => {
	const { setTheme, theme } = useTheme();

	return (
		<Button className='bg-white dark:bg-black rounded-full' variant='outline' size='icon' onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
			<Sun className='h-[1.5rem] w-[1.25rem] dark:hidden' />
			<Moon className='hidden h-5 w-5 dark:block' />
			<span className='sr-only'>Toggle theme</span>
		</Button>
	);
};

export default ModeToggle;
