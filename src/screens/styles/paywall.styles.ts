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
    gap: 18,
  },
  heroGlowRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  heroGlow: {
    width: 12,
    height: 40,
    borderRadius: 999,
  },
  heroTextWrap: {
    gap: 12,
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
    alignItems: 'flex-start',
    gap: 12,
  },
  benefitIconWrap: {
    width: 26,
    height: 26,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  benefitIcon: {
    fontSize: 13,
    fontWeight: '900',
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
  actionsWrap: {
    gap: 12,
  },
  footnotesWrap: {
    gap: 6,
  },
  footnote: {
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
  },
});
