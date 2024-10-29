import { useEffect } from 'react';
import { create } from 'zustand';

interface LoadingState {
	loading: boolean;
	setLoading: (isLoading: boolean) => void;
}

export const useLoading = create<LoadingState>((set) => ({
	loading: false,
	setLoading: (isLoading: boolean) => {
		set((store) => {
			return { ...store, loading: isLoading };
		});
	}
}));

export const useLoadingHandler = (loading: boolean) => {
	const setLoading = useLoading((state) => state.setLoading);

	useEffect(() => {
		setLoading(loading);
	}, [loading]);
};
