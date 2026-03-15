import type { LanguagePreference } from '../../../shared/i18n';
import type { ThemePreference } from '../../../shared/theme/themes';
import type { PlanId } from '../../subscription/model/types';

export type RegionCode = 'US' | 'DE' | 'GB' | 'RU' | 'JP' | 'IN' | 'BR' | 'CA' | 'AU' | 'KZ';
export type RegionPreference = 'system' | RegionCode;

export type PersistedAppState = {
  languagePreference: LanguagePreference;
  themePreference: ThemePreference;
  regionPreference: RegionPreference;
  selectedPlan: PlanId;
  isSubscribed: boolean;
};

export type DeviceLocaleInfo = {
  languageCode: string | null;
  regionCode: string | null;
  currencyCode: string | null;
  languageTag: string;
};
