import { getLocales } from 'expo-localization';
import type { DeviceLocaleInfo } from '../model/types';

export function getDeviceLocaleInfo(): DeviceLocaleInfo {
  const locale = getLocales()[0];

  return {
    languageCode: locale?.languageCode ?? 'en',
    regionCode: locale?.regionCode ?? null,
    currencyCode: locale?.currencyCode ?? null,
    languageTag: locale?.languageTag ?? 'en-US',
  };
}
