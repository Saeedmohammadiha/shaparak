import ApiConfigSingleton from 'business/stores/api-config-singleton';
import useInitialSettingStore from 'business/stores/initial-setting-store';
import { changeLanguage } from 'i18next';
import { useEffect, useState } from 'react';
import themeInitializer from 'ui/theme-config/baseTheme';
import { useConnection } from '../postMessage/useConnection';

export function useInitConfig() {
	const { readyToLoad } = useConnection();
	const { setSettings } = useInitialSettingStore((s) => s);
	const [configReady, seConfigReady] = useState(false);

	useEffect(() => {
		void getConfig();
	}, []);

	const getConfig = async () => {
		try {
			const res = await fetch('/api-config.json');
			const apiConf = (await res.json()) as Record<string, string>;
			ApiConfigSingleton.initiateApiConfig(apiConf.apiBaseUrl);

			//read lang and theme from query string
			const urlParams = new URLSearchParams(window.location.search);
			const language = urlParams.get('Lang') ?? 'fa-IR';
			const themeName = urlParams.get('Theme') ?? 'light';
			void changeLanguage(language);

			//get the theme and set the language
			const theme = await themeInitializer(themeName, apiConf.ThemeRoute);

			//set the settings {theme, language, idToken, refreshToken} to store
			setSettings({
				theme: theme,
				themeName: themeName,
				language: language as 'fa-IR' | 'en-GB'
			});

			seConfigReady(true);
		} catch (err) {
			//TODO: add a convinent alert for this
			//probaly send a postmessage to parent
			alert("can't initiate");
			console.log(err);
		}
	};

	return configReady && readyToLoad;
}
