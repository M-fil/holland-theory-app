import i18n from 'i18next';

import EN_JSON from './locales/en.json';
import { SupportedLanguages } from '../constants/lang';

const initLanguage = async () => {
  await i18n.init({
    lng: SupportedLanguages.EN,
    fallbackLng: SupportedLanguages.EN,
    resources: {
      en: {
        translation: EN_JSON,
      },
    },
    fallbackNS: ['translation'],
    defaultNS: 'translation',
    whitelist: [SupportedLanguages.EN],
  });
};

initLanguage();

export default i18n;
