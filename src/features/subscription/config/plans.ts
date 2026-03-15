import pricingJson from '../../../../assets/config/pricing.json';
import type { Plan, PlanId } from '../model/types';

export const PLANS: Plan[] = pricingJson.plans.map((plan) => ({
  id: plan.id as PlanId,
  priceUsd: plan.priceUsd,
  isDefault: plan.isDefault,
}));

export const DEFAULT_PLAN_ID: PlanId = (PLANS.find((plan) => plan.isDefault)?.id ?? PLANS[0]?.id ?? 'yearly') as PlanId;

export function getPlanById(planId: PlanId): Plan {
  return PLANS.find((plan) => plan.id === planId) ?? PLANS.find((plan) => plan.id === DEFAULT_PLAN_ID) ?? {
    id: DEFAULT_PLAN_ID,
    priceUsd: 0,
    isDefault: true,
  };
}

export function isPlanId(value: string | null | undefined): value is PlanId {
  return PLANS.some((plan) => plan.id === value);
}
