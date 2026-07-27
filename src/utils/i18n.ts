// Internationalization (i18n) for Kid Chess Academy
import { en } from '../locales/en';
import { vi } from '../locales/vi';
import { getPuzzleTranslation, LocalizedPuzzleText } from '../locales/puzzleTranslations';

export type Language = 'en' | 'vi';

export const TRANSLATIONS = {
  en,
  vi,
};

export type TranslationKey = keyof typeof en;

export function getTranslation(lang: Language | string, key: TranslationKey, params?: Record<string, string | number>): string {
  const selectedLang: Language = (lang === 'vi' || lang === 'en') ? lang : 'vi';
  const dict = TRANSLATIONS[selectedLang] || TRANSLATIONS.en;
  let text = dict[key] || TRANSLATIONS.en[key] || (key as string);

  if (params) {
    Object.entries(params).forEach(([paramKey, paramValue]) => {
      text = text.replace(new RegExp(`\\{${paramKey}\\}`, 'g'), String(paramValue));
    });
  }

  return text;
}

export { getPuzzleTranslation };
export type { LocalizedPuzzleText };
