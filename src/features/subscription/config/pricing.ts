import pricingJson from '../../../../assets/config/pricing.json';
import { SUPPORTED_REGIONS } from '../../settings/config/settings.config';
import type { RegionCode } from '../../settings/model/types';

export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'RUB' | 'JPY' | 'INR' | 'BRL' | 'CAD' | 'AUD' | 'KZT';

export type PricingRegion = {
  region: RegionCode;
  currency: CurrencyCode;
  locale: string;
};

export const FX_SNAPSHOT_DATE = pricingJson.fxSnapshotDate;

export const FX_RATES_FROM_USD: Record<CurrencyCode, number> = pricingJson.fxRatesFromUsd as Record<CurrencyCode, number>;

export const REGION_PRICING: Record<RegionCode, PricingRegion> = Object.fromEntries(
  SUPPORTED_REGIONS.map((region) => {
    const pricingRegion = pricingJson.regions[region];

    return [
      region,
      {
        region,
        currency: pricingRegion.currency as CurrencyCode,
        locale: pricingRegion.locale,
      },
    ];
  }),
) as Record<RegionCode, PricingRegion>;
