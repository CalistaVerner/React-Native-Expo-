import { en } from './dictionaries/en';
import { ru } from './dictionaries/ru';

export type Language = 'en' | 'ru';
export type Dictionary = typeof en;

const DICTIONARIES: Record<Language, Dictionary> = {
  en,
  ru,
};

export function getDictionary(language: Language): Dictionary {
  return DICTIONARIES[language] ?? DICTIONARIES.en;
}
