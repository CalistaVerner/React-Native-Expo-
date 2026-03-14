import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { AppState, useColorScheme } from 'react-native';
import type { MoodId } from '../../features/affirmation/model/types';
import {
  DEFAULT_LANGUAGE_PREFERENCE,
  DEFAULT_REGION_PREFERENCE,
  DEFAULT_THEME_PREFERENCE,
} from '../../features/settings/config/settings.config';
import { getDeviceLocaleInfo } from '../../features/settings/lib/deviceLocale';
import type { DeviceLocaleInfo, RegionCode, RegionPreference } from '../../features/settings/model/types';
import { buildLocalizedPrice, computeYearlySavings, getPricingRegion, resolveRegionCode } from '../../features/subscription/lib/pricing';
import type { PlanId } from '../../features/subscription/model/types';
import { getDictionary, resolveLanguage, type Dictionary, type Language, type LanguagePreference } from '../../shared/i18n';
import { clearPersistedState, loadPersistedState, savePersistedState } from '../../shared/lib/storage';
import { getTheme, resolveThemeMode, type AppTheme, type ThemeMode, type ThemePreference } from '../../shared/theme/themes';
import { FX_SNAPSHOT_DATE } from '../../features/subscription/config/pricing';

export type ScreenId = 'paywall' | 'meditations' | 'preferences';

export type AppContextValue = {
  screen: ScreenId;
  setScreen: (screen: ScreenId) => void;

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

  selectedMood: MoodId;
  setSelectedMood: (mood: MoodId) => void;

  affirmationText: string;
  setAffirmationText: (value: string) => void;

  lastPrompt: string;
  setLastPrompt: (value: string) => void;

  isGenerating: boolean;
  setIsGenerating: (value: boolean) => void;

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

const AppContext = createContext<AppContextValue | null>(null);

export function AppContextProvider({ children }: React.PropsWithChildren) {
  const systemScheme = useColorScheme();
  const [screen, setScreen] = useState<ScreenId>('paywall');
  const [isHydrated, setIsHydrated] = useState(false);
  const [deviceLocale, setDeviceLocale] = useState<DeviceLocaleInfo>(getDeviceLocaleInfo());
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PlanId>('yearly');
  const [languagePreference, setLanguagePreference] = useState<LanguagePreference>(DEFAULT_LANGUAGE_PREFERENCE);
  const [themePreference, setThemePreference] = useState<ThemePreference>(DEFAULT_THEME_PREFERENCE);
  const [regionPreference, setRegionPreference] = useState<RegionPreference>(DEFAULT_REGION_PREFERENCE);
  const [selectedMood, setSelectedMood] = useState<MoodId>('neutral');
  const [affirmationText, setAffirmationText] = useState('');
  const [lastPrompt, setLastPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    let mounted = true;

    loadPersistedState()
      .then((persisted) => {
        if (!mounted || !persisted) {
          return;
        }

        setLanguagePreference(persisted.languagePreference);
        setThemePreference(persisted.themePreference);
        setRegionPreference(persisted.regionPreference);
        setSelectedPlan(persisted.selectedPlan);
        setIsSubscribed(persisted.isSubscribed);
      })
      .finally(() => {
        if (mounted) {
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
        setDeviceLocale(getDeviceLocaleInfo());
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

  const monthlyPrice = useMemo(() => buildLocalizedPrice('monthly', 9.99, regionCode).formattedPrice, [regionCode]);
  const yearlyPrice = useMemo(() => buildLocalizedPrice('yearly', 49.99, regionCode).formattedPrice, [regionCode]);
  const yearlySavings = useMemo(() => computeYearlySavings(9.99, 49.99, regionCode), [regionCode]);

  const resetPreferences = async () => {
    setLanguagePreference(DEFAULT_LANGUAGE_PREFERENCE);
    setThemePreference(DEFAULT_THEME_PREFERENCE);
    setRegionPreference(DEFAULT_REGION_PREFERENCE);
    setSelectedPlan('yearly');
    await clearPersistedState();
    setIsHydrated(true);
  };

  const value = useMemo<AppContextValue>(
    () => ({
      screen,
      setScreen,
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
      selectedMood,
      setSelectedMood,
      affirmationText,
      setAffirmationText,
      lastPrompt,
      setLastPrompt,
      isGenerating,
      setIsGenerating,
      deviceLocale,
      detectedCurrencyCode: getPricingRegion(regionCode).currency,
      monthlyPrice,
      yearlyPrice,
      yearlySavings,
      fxSnapshotDate: FX_SNAPSHOT_DATE,
      theme,
      t,
      resetPreferences,
    }),
    [
      screen,
      isHydrated,
      isSubscribed,
      selectedPlan,
      language,
      languagePreference,
      themeMode,
      themePreference,
      regionCode,
      regionPreference,
      selectedMood,
      affirmationText,
      lastPrompt,
      isGenerating,
      deviceLocale,
      monthlyPrice,
      yearlyPrice,
      yearlySavings,
      theme,
      t,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const ctx = useContext(AppContext);

  if (!ctx) {
    throw new Error('useAppContext must be used inside AppContextProvider');
  }

  return ctx;
}
