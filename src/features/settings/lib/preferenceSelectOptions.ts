import type { RegionCode, RegionPreference } from '../model/types';
import type { Dictionary, Language, LanguagePreference } from '../../../shared/i18n';
import type { ThemePreference } from '../../../shared/theme/themes';
import type { SelectBoxOption } from '../../../shared/ui/SelectBox';
import { getPricingRegion } from '../../subscription/lib/pricing';

const LANGUAGE_ICONS: Record<LanguagePreference, string> = {
  system: '🌐',
  en: '🇺🇸',
  ru: '🇷🇺',
  de: '🇩🇪',
};

const THEME_ICONS: Record<ThemePreference, string> = {
  system: '🖥️',
  dark: '🌙',
  light: '☀️',
};

const REGION_ICONS: Record<RegionCode, string> = {
  US: '🇺🇸',
  DE: '🇩🇪',
  GB: '🇬🇧',
  RU: '🇷🇺',
  JP: '🇯🇵',
  IN: '🇮🇳',
  BR: '🇧🇷',
  CA: '🇨🇦',
  AU: '🇦🇺',
  KZ: '🇰🇿',
};

export function buildLanguagePreferenceOptions(t: Dictionary, activeLanguage: Language): SelectBoxOption<LanguagePreference>[] {
  return [
    {
      value: 'system',
      title: t.common.system,
      description: `${t.common.current}: ${t.languageNames[activeLanguage]}`,
      icon: LANGUAGE_ICONS.system,
      badgeText: 'Auto',
    },
    ...(['en', 'ru', 'de'] as const).map((language) => ({
      value: language,
      title: t.languageNames[language],
      icon: LANGUAGE_ICONS[language],
    })),
  ];
}

export function buildThemePreferenceOptions(t: Dictionary): SelectBoxOption<ThemePreference>[] {
  return [
    {
      value: 'system',
      title: t.common.system,
      description: t.preferences.themeSystem,
      icon: THEME_ICONS.system,
    },
    {
      value: 'dark',
      title: t.preferences.dark,
      icon: THEME_ICONS.dark,
    },
    {
      value: 'light',
      title: t.preferences.light,
      icon: THEME_ICONS.light,
    },
  ];
}

export function buildRegionPreferenceOptions(
  t: Dictionary,
  activeRegion: RegionCode,
): SelectBoxOption<RegionPreference>[] {
  const regionOptions = (['US', 'DE', 'GB', 'RU', 'JP', 'IN', 'BR', 'CA', 'AU', 'KZ'] as const).map((region) => ({
    value: region,
    title: t.regions[region],
    icon: REGION_ICONS[region],
    metaText: getPricingRegion(region).currency,
  }));

  return [
    {
      value: 'system',
      title: t.common.system,
      description: `${t.common.current}: ${t.regions[activeRegion]}`,
      icon: '🧭',
      badgeText: getPricingRegion(activeRegion).currency,
    },
    ...regionOptions,
  ];
}
