import { useCallback, useEffect, useMemo, useState } from 'react';
import { AppState } from 'react-native';
import {
  DEFAULT_LANGUAGE_PREFERENCE,
  DEFAULT_REGION_PREFERENCE,
  DEFAULT_THEME_PREFERENCE,
} from '../../features/settings/config/settings.config';
import { FX_SNAPSHOT_DATE } from '../../features/subscription/config/pricing';
import { isPlanId } from '../../features/subscription/config/plans';
import {
  buildPricingSnapshot,
  computeYearlySavings,
  getDefaultPlanId,
  getPricingRegion,
  resolveRegionCode,
} from '../../features/subscription/lib/pricing';
import type { PlanId } from '../../features/subscription/model/types';
import { getDeviceLocaleInfo } from '../../features/settings/lib/deviceLocale';
import type { DeviceLocaleInfo, RegionCode, RegionPreference } from '../../features/settings/model/types';
import { getDictionary, resolveLanguage, type Dictionary, type Language, type LanguagePreference } from '../../shared/i18n';
import { clearPersistedState, loadPersistedState, savePersistedState } from '../../shared/lib/storage';
import { createLogger } from '../../shared/lib/logger';
import { getTheme, resolveThemeMode, type AppTheme, type ThemeMode, type ThemePreference } from '../../shared/theme/themes';

const logger = createLogger('app:preferences');

export type AppPreferencesController = {
  isHydrated: boolean;
  isSubscribed: boolean;
  setIsSubscribed: (value: boolean) => void;
  selectedPlan: PlanId;
  setSelectedPlan: (plan: PlanId) => void;
  language: Language;
  languagePreference: LanguagePreference;
  setLanguagePreference: (language: LanguagePreference) => void;
  themeMode: ThemeMode;
  themePreference: ThemePreference;
  setThemePreference: (mode: ThemePreference) => void;
  regionCode: RegionCode;
  regionPreference: RegionPreference;
  setRegionPreference: (region: RegionPreference) => void;
  deviceLocale: DeviceLocaleInfo;
  detectedCurrencyCode: string | null;
  monthlyPrice: string;
  yearlyPrice: string;
  yearlySavings: string;
  fxSnapshotDate: string;
  theme: AppTheme;
  t: Dictionary;
  resetPreferences: () => Promise<void>;
};

function sanitizePlanId(planId: string | null | undefined): PlanId {
  return isPlanId(planId) ? planId : getDefaultPlanId();
}

export function useAppPreferences(systemScheme: string | null | undefined): AppPreferencesController {
  const [isHydrated, setIsHydrated] = useState(false);
  const [deviceLocale, setDeviceLocale] = useState<DeviceLocaleInfo>(getDeviceLocaleInfo());
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PlanId>(getDefaultPlanId());
  const [languagePreference, setLanguagePreference] = useState<LanguagePreference>(DEFAULT_LANGUAGE_PREFERENCE);
  const [themePreference, setThemePreference] = useState<ThemePreference>(DEFAULT_THEME_PREFERENCE);
  const [regionPreference, setRegionPreference] = useState<RegionPreference>(DEFAULT_REGION_PREFERENCE);

  useEffect(() => {
    let mounted = true;

    logger.info('Hydrating app preferences');

    loadPersistedState()
      .then((persisted) => {
        if (!mounted || !persisted) {
          return;
        }

        logger.info('Applying hydrated preferences', {
          languagePreference: persisted.languagePreference,
          themePreference: persisted.themePreference,
          regionPreference: persisted.regionPreference,
          selectedPlan: persisted.selectedPlan,
          isSubscribed: persisted.isSubscribed,
        });

        setLanguagePreference(persisted.languagePreference);
        setThemePreference(persisted.themePreference);
        setRegionPreference(persisted.regionPreference);
        setSelectedPlan(sanitizePlanId(persisted.selectedPlan));
        setIsSubscribed(persisted.isSubscribed);
      })
      .finally(() => {
        if (mounted) {
          logger.info('Preferences hydration completed');
          setIsHydrated(true);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    void savePersistedState({
      languagePreference,
      themePreference,
      regionPreference,
      selectedPlan,
      isSubscribed,
    });
  }, [isHydrated, languagePreference, themePreference, regionPreference, selectedPlan, isSubscribed]);

  useEffect(() => {
    const sub = AppState.addEventListener('change', (state) => {
      if (state === 'active') {
        const nextLocale = getDeviceLocaleInfo();
        logger.debug('Refreshing device locale from active app state', nextLocale);
        setDeviceLocale(nextLocale);
      }
    });

    return () => sub.remove();
  }, []);

  const language = useMemo(() => resolveLanguage(languagePreference, deviceLocale.languageCode), [languagePreference, deviceLocale.languageCode]);
  const regionCode = useMemo(
    () => (regionPreference === 'system' ? resolveRegionCode(deviceLocale.regionCode) : regionPreference),
    [regionPreference, deviceLocale.regionCode]
  );
  const themeMode = useMemo(() => resolveThemeMode(themePreference, systemScheme), [themePreference, systemScheme]);
  const theme = useMemo(() => getTheme(themeMode), [themeMode]);
  const t = useMemo(() => getDictionary(language), [language]);
  const pricingSnapshot = useMemo(() => buildPricingSnapshot(regionCode), [regionCode]);

  const resetPreferences = useCallback(async () => {
    logger.warn('Resetting preferences to defaults');
    setLanguagePreference(DEFAULT_LANGUAGE_PREFERENCE);
    setThemePreference(DEFAULT_THEME_PREFERENCE);
    setRegionPreference(DEFAULT_REGION_PREFERENCE);
    setSelectedPlan(getDefaultPlanId());
    await clearPersistedState();
    setIsHydrated(true);
  }, []);

  return {
    isHydrated,
    isSubscribed,
    setIsSubscribed,
    selectedPlan,
    setSelectedPlan,
    language,
    languagePreference,
    setLanguagePreference,
    themeMode,
    themePreference,
    setThemePreference,
    regionCode,
    regionPreference,
    setRegionPreference,
    deviceLocale,
    detectedCurrencyCode: getPricingRegion(regionCode).currency,
    monthlyPrice: pricingSnapshot.monthly.formattedPrice,
    yearlyPrice: pricingSnapshot.yearly.formattedPrice,
    yearlySavings: computeYearlySavings(regionCode),
    fxSnapshotDate: FX_SNAPSHOT_DATE,
    theme,
    t,
    resetPreferences,
  };
}
