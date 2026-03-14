import type { Plan } from '../model/types';

export const PLANS: Plan[] = [
  {
    id: 'monthly',
    price: '$9.99 / month',
  },
  {
    id: 'yearly',
    price: '$49.99 / year',
    isRecommended: true,
  },
];
