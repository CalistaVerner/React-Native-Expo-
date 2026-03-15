import { Platform } from 'react-native';

export const SHOULD_USE_NATIVE_DRIVER = Platform.OS !== 'web';
