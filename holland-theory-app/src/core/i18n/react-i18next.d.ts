import 'react-i18next';
import EN_JSON from './locales/en.json';

declare module 'react-i18next' {
  interface Resources {
    en: typeof EN_JSON;
  }
}