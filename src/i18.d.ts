import 'i18next';
import BASE_FA_TRANSLATION from './common/locales/fa/base.json';
import FA_TRANSLATION from './common/locales/fa/translation.json';

declare module 'i18next' {
	interface CustomTypeOptions {
		defaultNS: 'translation';
		resources: {
			translation: typeof FA_TRANSLATION;
			BASE: typeof BASE_FA_TRANSLATION;
		};
	}
}
