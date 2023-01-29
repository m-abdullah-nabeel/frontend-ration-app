import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import ur from './ur.json';

i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    lng: 'ur',
    fallbackLng: 'ur',
    resources: {
        en: en,
        ur: ur,
    },
    interpolation: {
        escapeValue: false // react already safes from xss
    }
});

export default i18n;
