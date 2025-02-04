import { create } from 'zustand';
import { AuthTokens, clearAuth, saveAuthTokens } from '../infrastructure/auth-service';

export interface InitialSetting {
	language: 'fa-IR' | 'en-GB';
	themeName: string;
	theme: object;
	idToken?: string;
	refreshToken?: string;
	osType: number;
	[key: string]: unknown;
}

interface InitialSettingStore {
	settings: InitialSetting;
	setSettings: (setting: Partial<InitialSetting>) => void;
	clearSetting: () => void;
}

const useInitialSettingStore = create<InitialSettingStore>((set) => ({
	settings: <InitialSetting>{ language: 'fa-IR', themeName: 'light', theme: {} },
	setSettings: (newSetting) => {
		if (newSetting) {
			if (newSetting.idToken) {
				saveAuthTokens(<AuthTokens>{
					idToken: newSetting.idToken,
					refreshToken: newSetting.refreshToken
				});
			}
			set((store) => {
				return { settings: { ...store.settings, ...newSetting } };
			});
		}
	},
	clearSetting: () => {
		clearAuth();
		set((prev) => ({
			settings: { ...prev.settings, idToken: undefined, refreshToken: undefined }
		}));
	}
}));

export default useInitialSettingStore;
