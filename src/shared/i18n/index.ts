import { de } from './dictionaries/de';
import { en } from './dictionaries/en';
import { ru } from './dictionaries/ru';

export type Language = 'en' | 'ru' | 'de';
export type LanguagePreference = 'system' | Language;
export type Dictionary = typeof en;

const DICTIONARIES: Record<Language, Dictionary> = {
  en,
  ru,
  de,
};

export function getDictionary(language: Language): Dictionary {
  return DICTIONARIES[language] ?? DICTIONARIES.en;
}

export function resolveLanguage(preference: LanguagePreference, deviceLanguageCode: string | null | undefined): Language {
  if (preference !== 'system') {
    return preference;
  }

  const normalized = (deviceLanguageCode ?? 'en').toLowerCase();

  if (normalized.startsWith('ru')) {
    return 'ru';
  }

  if (normalized.startsWith('de')) {
    return 'de';
  }

  return 'en';
}
