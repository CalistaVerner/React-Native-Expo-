import type { RegionCode } from '../../settings/model/types';

export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'RUB' | 'JPY' | 'INR' | 'BRL' | 'CAD' | 'AUD' | 'KZT';

export type PricingRegion = {
  region: RegionCode;
  currency: CurrencyCode;
  locale: string;
};

export const FX_SNAPSHOT_DATE = '2026-03-14';

export const FX_RATES_FROM_USD: Record<CurrencyCode, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.78,
  RUB: 90,
  JPY: 149,
  INR: 83,
  BRL: 5.1,
  CAD: 1.36,
  AUD: 1.52,
  KZT: 499,
};

export const REGION_PRICING: Record<RegionCode, PricingRegion> = {
  US: { region: 'US', currency: 'USD', locale: 'en-US' },
  DE: { region: 'DE', currency: 'EUR', locale: 'de-DE' },
  GB: { region: 'GB', currency: 'GBP', locale: 'en-GB' },
  RU: { region: 'RU', currency: 'RUB', locale: 'ru-RU' },
  JP: { region: 'JP', currency: 'JPY', locale: 'ja-JP' },
  IN: { region: 'IN', currency: 'INR', locale: 'en-IN' },
  BR: { region: 'BR', currency: 'BRL', locale: 'pt-BR' },
  CA: { region: 'CA', currency: 'CAD', locale: 'en-CA' },
  AU: { region: 'AU', currency: 'AUD', locale: 'en-AU' },
  KZ: { region: 'KZ', currency: 'KZT', locale: 'kk-KZ' },
};
