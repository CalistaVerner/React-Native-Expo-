import AsyncStorage from '@react-native-async-storage/async-storage';
import { APP_CONFIG } from '../config/app.config';
import type { PersistedAppState } from '../../features/settings/model/types';

export async function loadPersistedState(): Promise<PersistedAppState | null> {
  const raw = await AsyncStorage.getItem(APP_CONFIG.storageKey);

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as PersistedAppState;
  } catch {
    return null;
  }
}

export async function savePersistedState(value: PersistedAppState) {
  await AsyncStorage.setItem(APP_CONFIG.storageKey, JSON.stringify(value));
}

export async function clearPersistedState() {
  await AsyncStorage.removeItem(APP_CONFIG.storageKey);
}
