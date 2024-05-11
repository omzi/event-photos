import { useCookies } from 'react-cookie';
import { createContext, FC, ReactNode, useState, useEffect, useContext } from 'react';

interface UserContextProps {
	photoCount: number;
	isLoading: boolean;
}

const UserContext = createContext<UserContextProps>({
	photoCount: 0,
	isLoading: true
});

interface UserProviderProps {
	children: ReactNode;
}

const UserProvider: FC<UserProviderProps> = ({ children }) => {
	const [cookies] = useCookies(['photoCount']);
	const [photoCount, setPhotoCount] = useState(0);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		// console.log('Cookies :>>', cookies);

		setPhotoCount(cookies.photoCount || 0);
		setIsLoading(false);
	}, [cookies]);

	const contextValue: UserContextProps = {
		photoCount,
		isLoading
	};

	return (
		<UserContext.Provider value={contextValue}>
			{children}
		</UserContext.Provider>
	);
};

const useUser = (): UserContextProps => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error('useUser must be used within a UserProvider');
	}
	return context;
};

export { UserProvider, useUser };
