import type { Dictionary } from '../../../shared/i18n';
import type { PlanId } from '../model/types';

export type PaywallPlanCardModel = {
  id: PlanId;
  title: string;
  description: string;
  priceText: string;
  isSelected: boolean;
  statusText?: string;
  badgeText?: string;
  savingsText?: string;
};

export function buildPaywallPlanCards({
  t,
  selectedPlan,
  monthlyPrice,
  yearlyPrice,
  yearlySavings,
}: {
  t: Dictionary;
  selectedPlan: PlanId;
  monthlyPrice: string;
  yearlyPrice: string;
  yearlySavings: string;
}): PaywallPlanCardModel[] {
  return [
    {
      id: 'monthly',
      title: t.paywall.plans.monthly.title,
      description: t.paywall.plans.monthly.subtitle,
      priceText: monthlyPrice,
      isSelected: selectedPlan === 'monthly',
      statusText: selectedPlan === 'monthly' ? t.common.selected : undefined,
    },
    {
      id: 'yearly',
      title: t.paywall.plans.yearly.title,
      description: t.paywall.plans.yearly.subtitle,
      priceText: yearlyPrice,
      isSelected: selectedPlan === 'yearly',
      statusText: selectedPlan === 'yearly' ? t.common.selected : undefined,
      badgeText: t.paywall.plans.yearly.badge,
      savingsText: yearlySavings,
    },
  ];
}
