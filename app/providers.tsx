'use client';

import { ReactNode } from 'react';
import { ThemeProvider } from '#/components/providers/ThemeProvider';
import { ModalProvider } from '#/components/providers/ModalProvider';

const Providers = ({ children }: { children: ReactNode }) => {
	return (
		<ThemeProvider attribute='class' defaultTheme='light' enableSystem storageKey='theme'>
			<ModalProvider />
			{children}
		</ThemeProvider>
	)
}

export default Providers;
