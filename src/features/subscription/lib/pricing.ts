import { REGION_PRICING, FX_RATES_FROM_USD, type CurrencyCode, type PricingRegion } from '../config/pricing';
import type { PlanId } from '../model/types';
import type { RegionCode } from '../../settings/model/types';

export type LocalizedPrice = {
  planId: PlanId;
  usdAmount: number;
  regionalAmount: number;
  formattedPrice: string;
};

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
  switch ((rawRegion ?? '').toUpperCase()) {
    case 'DE':
    case 'GB':
    case 'RU':
    case 'JP':
    case 'IN':
    case 'BR':
    case 'CA':
    case 'AU':
    case 'KZ':
    case 'US':
      return (rawRegion ?? 'US').toUpperCase() as RegionCode;
    default:
      return 'US';
  }
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

export function computeYearlySavings(monthlyUsd: number, yearlyUsd: number, regionCode: RegionCode) {
  const region = getPricingRegion(regionCode);
  const monthlyTotal = convertUsdToRegionalPrice(monthlyUsd * 12, region.currency);
  const yearlyTotal = convertUsdToRegionalPrice(yearlyUsd, region.currency);
  const savings = Math.max(monthlyTotal - yearlyTotal, 0);
  return formatRegionalPrice(savings, region);
}
