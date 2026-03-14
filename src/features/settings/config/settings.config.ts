import type { Language, LanguagePreference } from '../../../shared/i18n';
import type { ThemeMode, ThemePreference } from '../../../shared/theme/themes';
import type { RegionCode, RegionPreference } from '../model/types';

export const DEFAULT_LANGUAGE_PREFERENCE: LanguagePreference = 'system';
export const DEFAULT_THEME_PREFERENCE: ThemePreference = 'system';
export const DEFAULT_REGION_PREFERENCE: RegionPreference = 'system';

export const SUPPORTED_LANGUAGES: Language[] = ['en', 'ru', 'de'];
export const SUPPORTED_LANGUAGE_PREFERENCES: LanguagePreference[] = ['system', 'en', 'ru', 'de'];
export const SUPPORTED_THEME_MODES: ThemeMode[] = ['dark', 'light'];
export const SUPPORTED_THEME_PREFERENCES: ThemePreference[] = ['system', 'dark', 'light'];
export const SUPPORTED_REGIONS: RegionCode[] = ['US', 'DE', 'GB', 'RU', 'JP', 'IN', 'BR', 'CA', 'AU', 'KZ'];
