import { StyleSheet } from 'react-native';

export const appRootStyles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    paddingHorizontal: 24,
  },
  loadingText: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
});
