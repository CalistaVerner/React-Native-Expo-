import { REGION_PRICING, FX_RATES_FROM_USD, type CurrencyCode, type PricingRegion } from '../config/pricing';
import { DEFAULT_PLAN_ID, PLANS, getPlanById } from '../config/plans';
import type { PlanId } from '../model/types';
import { SUPPORTED_REGIONS } from '../../settings/config/settings.config';
import type { RegionCode } from '../../settings/model/types';

export type LocalizedPrice = {
  planId: PlanId;
  usdAmount: number;
  regionalAmount: number;
  formattedPrice: string;
};

export type PricingSnapshot = Record<PlanId, LocalizedPrice>;

function getCurrencyFractionDigits(currency: CurrencyCode) {
  if (currency === 'JPY') {
    return 0;
  }

  return 2;
}

function roundCurrency(value: number, currency: CurrencyCode) {
  const digits = getCurrencyFractionDigits(currency);
  const factor = Math.pow(10, digits);
  return Math.round(value * factor) / factor;
}

export function getPricingRegion(regionCode: RegionCode): PricingRegion {
  return REGION_PRICING[regionCode] ?? REGION_PRICING.US;
}

export function resolveRegionCode(rawRegion: string | null | undefined): RegionCode {
  const normalizedRegion = (rawRegion ?? '').toUpperCase();

  return (SUPPORTED_REGIONS.find((region) => region === normalizedRegion) ?? 'US') as RegionCode;
}

export function convertUsdToRegionalPrice(usdAmount: number, currency: CurrencyCode) {
  const rate = FX_RATES_FROM_USD[currency] ?? 1;
  return roundCurrency(usdAmount * rate, currency);
}

export function formatRegionalPrice(amount: number, region: PricingRegion) {
  return new Intl.NumberFormat(region.locale, {
    style: 'currency',
    currency: region.currency,
    minimumFractionDigits: getCurrencyFractionDigits(region.currency),
    maximumFractionDigits: getCurrencyFractionDigits(region.currency),
  }).format(amount);
}

export function buildLocalizedPrice(planId: PlanId, usdAmount: number, regionCode: RegionCode): LocalizedPrice {
  const region = getPricingRegion(regionCode);
  const regionalAmount = convertUsdToRegionalPrice(usdAmount, region.currency);

  return {
    planId,
    usdAmount,
    regionalAmount,
    formattedPrice: formatRegionalPrice(regionalAmount, region),
  };
}

export function buildPricingSnapshot(regionCode: RegionCode): PricingSnapshot {
  return Object.fromEntries(
    PLANS.map((plan) => [plan.id, buildLocalizedPrice(plan.id, plan.priceUsd, regionCode)]),
  ) as PricingSnapshot;
}

export function getDefaultPlanId(): PlanId {
  return DEFAULT_PLAN_ID;
}

export function computeYearlySavings(regionCode: RegionCode) {
  const region = getPricingRegion(regionCode);
  const monthlyTotal = convertUsdToRegionalPrice(getPlanById('monthly').priceUsd * 12, region.currency);
  const yearlyTotal = convertUsdToRegionalPrice(getPlanById('yearly').priceUsd, region.currency);
  const savings = Math.max(monthlyTotal - yearlyTotal, 0);
  return formatRegionalPrice(savings, region);
}
