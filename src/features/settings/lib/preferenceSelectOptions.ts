import type { RegionCode, RegionPreference } from '../model/types';
import type { Dictionary, Language, LanguagePreference } from '../../../shared/i18n';
import type { ThemePreference } from '../../../shared/theme/themes';
import type { SelectBoxIconSpec, SelectBoxOption } from '../../../shared/ui/SelectBox';
import { SUPPORTED_LANGUAGES, SUPPORTED_REGIONS } from '../config/settings.config';
import { getPricingRegion } from '../../subscription/lib/pricing';

const LANGUAGE_ICONS: Record<LanguagePreference, SelectBoxIconSpec> = {
  system: { name: 'globe', tone: 'muted', badgeLabel: 'SYS' },
  en: { name: 'flag', tone: 'primary', badgeLabel: 'EN' },
  ru: { name: 'flag', tone: 'primary', badgeLabel: 'RU' },
  de: { name: 'flag', tone: 'primary', badgeLabel: 'DE' },
};

const THEME_ICONS: Record<ThemePreference, SelectBoxIconSpec> = {
  system: { name: 'desktop', tone: 'muted', badgeLabel: 'SYS' },
  dark: { name: 'moon', tone: 'primary' },
  light: { name: 'sun', tone: 'accent' },
};

const REGION_ICONS: Record<RegionCode, SelectBoxIconSpec> = {
  US: { name: 'location-dot', tone: 'accent', badgeLabel: 'US' },
  DE: { name: 'location-dot', tone: 'accent', badgeLabel: 'DE' },
  GB: { name: 'location-dot', tone: 'accent', badgeLabel: 'GB' },
  RU: { name: 'location-dot', tone: 'accent', badgeLabel: 'RU' },
  JP: { name: 'location-dot', tone: 'accent', badgeLabel: 'JP' },
  IN: { name: 'location-dot', tone: 'accent', badgeLabel: 'IN' },
  BR: { name: 'location-dot', tone: 'accent', badgeLabel: 'BR' },
  CA: { name: 'location-dot', tone: 'accent', badgeLabel: 'CA' },
  AU: { name: 'location-dot', tone: 'accent', badgeLabel: 'AU' },
  KZ: { name: 'location-dot', tone: 'accent', badgeLabel: 'KZ' },
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
    ...SUPPORTED_LANGUAGES.map((language) => ({
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
  const regionOptions = SUPPORTED_REGIONS.map((region) => ({
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
      icon: { name: 'compass', tone: 'muted', badgeLabel: 'SYS' },
      badgeText: getPricingRegion(activeRegion).currency,
    },
    ...regionOptions,
  ];
}
