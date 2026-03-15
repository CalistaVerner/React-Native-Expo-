import { useMemo } from 'react';
import { useAppContext } from '../../app/state/AppContext';
import { buildPreferenceSections } from '../../features/settings/config/preferenceSections';
import { FEATURE_FLAGS } from '../../shared/config/featureFlags';
import { useModal } from '../../shared/ui/modal/ModalProvider';
import { useToast } from '../../shared/ui/toast/ToastProvider';

export function usePreferencesScreenModel() {
  const {
    theme,
    t,
    language,
    languagePreference,
    setLanguagePreference,
    themePreference,
    setThemePreference,
    regionPreference,
    setRegionPreference,
    regionCode,
    monthlyPrice,
    yearlyPrice,
    fxSnapshotDate,
    isSubscribed,
    setIsSubscribed,
    setScreen,
    resetPreferences,
  } = useAppContext();
  const modal = useModal();
  const { showToast } = useToast();

  const sections = useMemo(
    () =>
      buildPreferenceSections({
        t,
        language,
        regionCode,
        languagePreference,
        themePreference,
        regionPreference,
        setLanguagePreference,
        setThemePreference,
        setRegionPreference,
      }),
    [
      t,
      language,
      regionCode,
      languagePreference,
      themePreference,
      regionPreference,
      setLanguagePreference,
      setThemePreference,
      setRegionPreference,
    ]
  );

  return {
    theme,
    t,
    sections,
    flags: FEATURE_FLAGS.preferences,
    monthlyPrice,
    yearlyPrice,
    fxSnapshotDate,
    isSubscribed,
    toggleSubscribed: () => {
      setIsSubscribed(!isSubscribed);
      showToast({
        title: t.preferences.subscriptionToastTitle,
        message: t.preferences.subscriptionToastText,
        variant: 'info',
        icon: { name: 'circle-check', tone: 'primary' },
      });
    },
    resetPreferences: () => {
      modal.confirm({
        title: t.preferences.resetConfirmTitle,
        description: t.preferences.resetConfirmText,
        confirmLabel: t.common.confirm,
        cancelLabel: t.common.cancel,
        confirmVariant: 'primary',
        icon: { name: 'rotate-left', tone: 'warning' },
        onConfirm: () => {
          void resetPreferences().then(() => {
            showToast({
              title: t.preferences.resetToastTitle,
              message: t.preferences.resetToastText,
              variant: 'success',
              icon: { name: 'rotate-left', tone: 'success' },
            });
          });
        },
      });
    },
    backToMeditations: () => setScreen('meditations'),
  };
}
