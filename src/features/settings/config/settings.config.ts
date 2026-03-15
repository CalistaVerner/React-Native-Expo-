import settingsJson from '../../../../assets/config/settings.json';
import type { Language, LanguagePreference } from '../../../shared/i18n';
import type { ThemeMode, ThemePreference } from '../../../shared/theme/themes';
import type { RegionCode, RegionPreference } from '../model/types';

export const DEFAULT_LANGUAGE_PREFERENCE: LanguagePreference = settingsJson.defaults.languagePreference as LanguagePreference;
export const DEFAULT_THEME_PREFERENCE: ThemePreference = settingsJson.defaults.themePreference as ThemePreference;
export const DEFAULT_REGION_PREFERENCE: RegionPreference = settingsJson.defaults.regionPreference as RegionPreference;

export const SUPPORTED_LANGUAGES: Language[] = [...settingsJson.supportedLanguages] as Language[];
export const SUPPORTED_LANGUAGE_PREFERENCES: LanguagePreference[] = [...settingsJson.supportedLanguagePreferences] as LanguagePreference[];
export const SUPPORTED_THEME_MODES: ThemeMode[] = [...settingsJson.supportedThemeModes] as ThemeMode[];
export const SUPPORTED_THEME_PREFERENCES: ThemePreference[] = [...settingsJson.supportedThemePreferences] as ThemePreference[];
export const SUPPORTED_REGIONS: RegionCode[] = [...settingsJson.supportedRegions] as RegionCode[];
