import { StyleSheet } from 'react-native';

export const paywallStyles = StyleSheet.create({
  topChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  chip: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  chipText: {
    fontSize: 12,
    fontWeight: '700',
  },
  heroCard: {
    borderRadius: 28,
    padding: 22,
    borderWidth: 1,
    gap: 18,
  },
  eyebrow: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 31,
    lineHeight: 38,
    fontWeight: '900',
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    marginTop: 12,
  },
  metricsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  metricCard: {
    flex: 1,
    borderRadius: 20,
    padding: 14,
  },
  metricLabel: {
    fontSize: 12,
    fontWeight: '700',
  },
  metricValue: {
    fontSize: 16,
    fontWeight: '800',
    marginTop: 6,
  },
  benefits: {
    gap: 12,
  },
  benefitRow: {
    flexDirection: 'row',
    gap: 10,
  },
  benefitIcon: {
    fontSize: 16,
    marginTop: 1,
  },
  benefitText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 21,
  },
  plans: {
    gap: 12,
  },
  planPriceWrap: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: 10,
  },
  planPrice: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '900',
  },
  savings: {
    fontSize: 13,
    fontWeight: '700',
  },
  footnote: {
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
  },
});
