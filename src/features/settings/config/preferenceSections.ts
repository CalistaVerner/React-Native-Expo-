import type { Dictionary, Language, LanguagePreference } from '../../../shared/i18n';
import type { ThemePreference } from '../../../shared/theme/themes';
import type { SelectBoxOption } from '../../../shared/ui/SelectBox';
import type { RegionCode, RegionPreference } from '../model/types';
import type { PreferenceSectionModel } from '../model/preferenceFields';
import {
  buildLanguagePreferenceOptions,
  buildRegionPreferenceOptions,
  buildThemePreferenceOptions,
} from '../lib/preferenceSelectOptions';

export function buildPreferenceSections({
  t,
  language,
  regionCode,
  languagePreference,
  themePreference,
  regionPreference,
  setLanguagePreference,
  setThemePreference,
  setRegionPreference,
}: {
  t: Dictionary;
  language: Language;
  regionCode: RegionCode;
  languagePreference: LanguagePreference;
  themePreference: ThemePreference;
  regionPreference: RegionPreference;
  setLanguagePreference: (value: LanguagePreference) => void;
  setThemePreference: (value: ThemePreference) => void;
  setRegionPreference: (value: RegionPreference) => void;
}): PreferenceSectionModel[] {
  return [
    {
      key: 'experience',
      title: t.preferences.title,
      caption: t.preferences.subtitle,
      fields: [
        {
          key: 'language',
          componentType: 'select',
          title: t.preferences.language,
          modalTitle: t.preferences.language,
          value: languagePreference,
          options: buildLanguagePreferenceOptions(t, language) as SelectBoxOption<string>[],
          onChange: setLanguagePreference as (value: string) => void,
        },
        {
          key: 'theme',
          componentType: 'select',
          title: t.preferences.theme,
          modalTitle: t.preferences.theme,
          value: themePreference,
          options: buildThemePreferenceOptions(t) as SelectBoxOption<string>[],
          onChange: setThemePreference as (value: string) => void,
        },
      ],
    },
    {
      key: 'pricing',
      title: t.preferences.region,
      caption: t.preferences.regionDescription,
      fields: [
        {
          key: 'region',
          componentType: 'select',
          title: t.preferences.region,
          modalTitle: t.preferences.region,
          description: t.preferences.regionDescription,
          value: regionPreference,
          options: buildRegionPreferenceOptions(t, regionCode) as SelectBoxOption<string>[],
          onChange: setRegionPreference as (value: string) => void,
        },
      ],
    },
  ];
}
