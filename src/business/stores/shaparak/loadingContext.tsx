import { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react';

export const LoadingContext = createContext<{ isLoading: boolean; setLoading: Dispatch<SetStateAction<boolean>> }>({
	isLoading: false,
	setLoading: () => {}
});

export default function LoadingProvider({ children }: { children: ReactNode | ReactNode[] }) {
	const [isLoading, setLoading] = useState(false);

	return <LoadingContext.Provider value={{ isLoading, setLoading }}>{children}</LoadingContext.Provider>;
}
