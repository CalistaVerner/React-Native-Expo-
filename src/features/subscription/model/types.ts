export type PlanId = 'monthly' | 'yearly';

export type Plan = {
  id: PlanId;
  price: string;
  isRecommended?: boolean;
};
