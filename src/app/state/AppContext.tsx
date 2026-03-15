import React, { createContext, useContext, useMemo, useState } from 'react';
import { useColorScheme } from 'react-native';
import type { PlanId } from '../../features/subscription/model/types';
import { useAppPreferences } from './useAppPreferences';
import type { DeviceLocaleInfo, RegionCode, RegionPreference } from '../../features/settings/model/types';
import { type Dictionary, type Language, type LanguagePreference } from '../../shared/i18n';
import { type AppTheme, type ThemeMode, type ThemePreference } from '../../shared/theme/themes';

export type ScreenId = 'paywall' | 'meditations' | 'preferences' | 'player';

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
  const preferences = useAppPreferences(systemScheme);

  const value = useMemo<AppContextValue>(
    () => ({
      screen,
      setScreen,
      ...preferences,
    }),
    [screen, preferences]
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
