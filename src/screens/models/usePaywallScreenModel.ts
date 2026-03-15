import { useMemo } from 'react';
import { useAppContext } from '../../app/state/AppContext';
import { buildPaywallPlanCards } from '../../features/subscription/lib/planPresentation';
import { FEATURE_FLAGS } from '../../shared/config/featureFlags';
import { useToast } from '../../shared/ui/toast/ToastProvider';

export function usePaywallScreenModel() {
  const {
    theme,
    t,
    selectedPlan,
    setSelectedPlan,
    setIsSubscribed,
    setScreen,
    regionCode,
    monthlyPrice,
    yearlyPrice,
    yearlySavings,
    detectedCurrencyCode,
  } = useAppContext();
  const { showToast } = useToast();

  const plans = useMemo(
    () =>
      buildPaywallPlanCards({
        t,
        selectedPlan,
        monthlyPrice,
        yearlyPrice,
        yearlySavings,
      }),
    [t, selectedPlan, monthlyPrice, yearlyPrice, yearlySavings]
  );

  return {
    theme,
    t,
    regionCode,
    detectedCurrencyCode,
    plans,
    flags: FEATURE_FLAGS.paywall,
    setSelectedPlan,
    onTryFree: () => {
      setIsSubscribed(true);
      setScreen('meditations');
      showToast({
        title: t.paywall.premiumToastTitle,
        message: t.paywall.premiumToastText,
        variant: 'success',
        icon: { name: 'star', tone: 'accent' },
      });
    },
    onContinueFree: () => {
      setScreen('meditations');
      showToast({
        title: t.paywall.freeToastTitle,
        message: t.paywall.freeToastText,
        variant: 'info',
        icon: { name: 'leaf', tone: 'primary' },
      });
    },
  };
}
