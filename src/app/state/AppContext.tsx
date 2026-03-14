import React, { createContext, useContext, useMemo, useState } from 'react';
import type { MoodId } from '../../features/affirmation/model/types';
import { DEFAULT_LANGUAGE, DEFAULT_THEME_MODE } from '../../features/settings/config/settings.config';
import type { PlanId } from '../../features/subscription/model/types';
import { getDictionary, type Dictionary, type Language } from '../../shared/i18n';
import { getTheme, type AppTheme, type ThemeMode } from '../../shared/theme/themes';

export type ScreenId = 'paywall' | 'meditations' | 'preferences';

export type AppContextValue = {
  screen: ScreenId;
  setScreen: (screen: ScreenId) => void;

  isSubscribed: boolean;
  setIsSubscribed: (value: boolean) => void;

  selectedPlan: PlanId;
  setSelectedPlan: (plan: PlanId) => void;

  language: Language;
  setLanguage: (language: Language) => void;

  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;

  selectedMood: MoodId;
  setSelectedMood: (mood: MoodId) => void;

  generatedText: string;
  setGeneratedText: (value: string) => void;

  lastPrompt: string;
  setLastPrompt: (value: string) => void;

  isGenerating: boolean;
  setIsGenerating: (value: boolean) => void;

  theme: AppTheme;
  t: Dictionary;
};

const AppContext = createContext<AppContextValue | null>(null);

export function AppContextProvider({ children }: React.PropsWithChildren) {
  const [screen, setScreen] = useState<ScreenId>('paywall');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PlanId>('yearly');
  const [language, setLanguage] = useState<Language>(DEFAULT_LANGUAGE);
  const [themeMode, setThemeMode] = useState<ThemeMode>(DEFAULT_THEME_MODE);
  const [selectedMood, setSelectedMood] = useState<MoodId>('neutral');
  const [generatedText, setGeneratedText] = useState('');
  const [lastPrompt, setLastPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const theme = useMemo(() => getTheme(themeMode), [themeMode]);
  const t = useMemo(() => getDictionary(language), [language]);

  const value = useMemo<AppContextValue>(
    () => ({
      screen,
      setScreen,
      isSubscribed,
      setIsSubscribed,
      selectedPlan,
      setSelectedPlan,
      language,
      setLanguage,
      themeMode,
      setThemeMode,
      selectedMood,
      setSelectedMood,
      generatedText,
      setGeneratedText,
      lastPrompt,
      setLastPrompt,
      isGenerating,
      setIsGenerating,
      theme,
      t,
    }),
    [
      screen,
      isSubscribed,
      selectedPlan,
      language,
      themeMode,
      selectedMood,
      generatedText,
      lastPrompt,
      isGenerating,
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
