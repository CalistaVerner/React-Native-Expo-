import AsyncStorage from '@react-native-async-storage/async-storage';
import { APP_CONFIG } from '../config/app.config';
import type { PersistedAppState } from '../../features/settings/model/types';
import { createLogger } from './logger';

const logger = createLogger('storage');

export async function loadPersistedState(): Promise<PersistedAppState | null> {
  logger.debug('Loading persisted state', { key: APP_CONFIG.storageKey });
  const raw = await AsyncStorage.getItem(APP_CONFIG.storageKey);

  if (!raw) {
    logger.info('No persisted state found');
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as PersistedAppState;
    logger.info('Persisted state loaded');
    return parsed;
  } catch (error) {
    logger.warn('Persisted state is invalid JSON', { error });
    return null;
  }
}

export async function savePersistedState(value: PersistedAppState) {
  logger.debug('Saving persisted state', {
    languagePreference: value.languagePreference,
    themePreference: value.themePreference,
    regionPreference: value.regionPreference,
    selectedPlan: value.selectedPlan,
    isSubscribed: value.isSubscribed,
  });
  await AsyncStorage.setItem(APP_CONFIG.storageKey, JSON.stringify(value));
}

export async function clearPersistedState() {
  logger.info('Clearing persisted state', { key: APP_CONFIG.storageKey });
  await AsyncStorage.removeItem(APP_CONFIG.storageKey);
}
