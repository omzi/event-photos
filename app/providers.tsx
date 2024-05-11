'use client';

import { ReactNode } from 'react';
import { EdgeStoreProvider } from '#/lib/edgestore';
import { UserProvider } from '#/components/contexts/UserContext';
import { ThemeProvider } from '#/components/providers/ThemeProvider';
import { ModalProvider } from '#/components/providers/ModalProvider';

const Providers = ({ children }: { children: ReactNode }) => {
	return (
		<UserProvider>
			<ThemeProvider attribute='class' storageKey='theme' enableSystem disableTransitionOnChange>
				<EdgeStoreProvider>
					<ModalProvider />
					{children}
				</EdgeStoreProvider>
			</ThemeProvider>
		</UserProvider>
	)
}

export default Providers;
