import { StyleSheet } from 'react-native';

export const surfaceCardStyles = StyleSheet.create({
  base: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 18,
    gap: 14,
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 3,
  },
  hero: {
    borderRadius: 30,
    padding: 22,
    shadowOpacity: 0.16,
    shadowRadius: 28,
    elevation: 5,
  },
  soft: {
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 2,
  },
});
