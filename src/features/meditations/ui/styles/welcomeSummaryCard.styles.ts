import { StyleSheet } from 'react-native';

export const welcomeSummaryCardStyles = StyleSheet.create({
  card: {
    gap: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  accent: {
    width: 12,
    height: 42,
    borderRadius: 999,
  },
  title: {
    flex: 1,
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '900',
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
  },
  pills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
});
