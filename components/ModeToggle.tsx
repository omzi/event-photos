'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { Button } from '#/components/ui/button';

const ModeToggle = () => {
	const { setTheme, theme } = useTheme();

	return (
		<Button className='bg-white dark:bg-black hover:bg-black/10 dark:hover:bg-white/25 rounded-full' variant='outline' size='icon' onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
			<Sun className='block h-5 w-5 dark:hidden' />
			<Moon className='hidden h-5 w-5 dark:block' />
			<span className='sr-only'>Toggle theme</span>
		</Button>
	);
};

export default ModeToggle;
