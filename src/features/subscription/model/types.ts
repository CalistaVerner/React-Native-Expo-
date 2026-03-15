export type PlanId = 'monthly' | 'yearly';

export type Plan = {
  id: PlanId;
  priceUsd: number;
  isDefault?: boolean;
};
