import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useAppContext } from '../app/state/AppContext';
import { Button } from '../shared/ui/Button';
import { Screen } from '../shared/ui/Screen';

export default function PaywallScreen() {
  const {
    theme,
    t,
    selectedPlan,
    setSelectedPlan,
    setIsSubscribed,
    setScreen,
    regionCode,
    monthlyPrice,
    yearlyPrice,
    yearlySavings,
    detectedCurrencyCode,
  } = useAppContext();

  const handleTryFree = () => {
    setIsSubscribed(true);
    setScreen('meditations');
  };

  return (
    <Screen theme={theme}>
      <View style={styles.topChips}>
        <View style={[styles.chip, { backgroundColor: theme.colors.surfaceAlt, borderColor: theme.colors.border }]}>
          <Text style={[styles.chipText, { color: theme.colors.text }]}>{t.paywall.regionChip}</Text>
        </View>
        <View style={[styles.chip, { backgroundColor: theme.colors.surfaceAlt, borderColor: theme.colors.border }]}>
          <Text style={[styles.chipText, { color: theme.colors.text }]}>{t.regions[regionCode]} · {detectedCurrencyCode}</Text>
        </View>
      </View>

      <View style={[styles.heroCard, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}> 
        <Text style={[styles.eyebrow, { color: theme.colors.primary }]}>{t.paywall.eyebrow}</Text>
        <Text style={[styles.title, { color: theme.colors.text }]}>{t.paywall.title}</Text>
        <Text style={[styles.subtitle, { color: theme.colors.textMuted }]}>{t.paywall.subtitle}</Text>

        <View style={styles.metricsRow}>
          <View style={[styles.metricCard, { backgroundColor: theme.colors.surfaceAlt }]}> 
            <Text style={[styles.metricLabel, { color: theme.colors.textMuted }]}>{t.paywall.detectedRegion}</Text>
            <Text style={[styles.metricValue, { color: theme.colors.text }]}>{t.regions[regionCode]}</Text>
          </View>
          <View style={[styles.metricCard, { backgroundColor: theme.colors.surfaceAlt }]}> 
            <Text style={[styles.metricLabel, { color: theme.colors.textMuted }]}>{t.paywall.currency}</Text>
            <Text style={[styles.metricValue, { color: theme.colors.text }]}>{detectedCurrencyCode}</Text>
          </View>
        </View>

        <View style={styles.benefits}>
          {t.paywall.benefits.map((item) => (
            <View key={item} style={styles.benefitRow}>
              <Text style={[styles.benefitIcon, { color: theme.colors.accent }]}>✦</Text>
              <Text style={[styles.benefitText, { color: theme.colors.text }]}>{item}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.plans}>
        <Pressable
          onPress={() => setSelectedPlan('monthly')}
          style={[
            styles.plan,
            { backgroundColor: theme.colors.surfaceAlt, borderColor: theme.colors.border },
            selectedPlan === 'monthly' && { borderColor: theme.colors.primary, backgroundColor: theme.colors.surface },
          ]}
        >
          <Text style={[styles.planTitle, { color: theme.colors.text }]}>{t.paywall.plans.monthly.title}</Text>
          <Text style={[styles.planSubtitle, { color: theme.colors.textMuted }]}>{t.paywall.plans.monthly.subtitle}</Text>
          <Text style={[styles.planPrice, { color: theme.colors.text }]}>{monthlyPrice}</Text>
        </Pressable>

        <Pressable
          onPress={() => setSelectedPlan('yearly')}
          style={[
            styles.plan,
            { backgroundColor: theme.colors.surfaceAlt, borderColor: theme.colors.border },
            selectedPlan === 'yearly' && { borderColor: theme.colors.primary, backgroundColor: theme.colors.surface },
          ]}
        >
          <View style={styles.planHeaderRow}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.planTitle, { color: theme.colors.text }]}>{t.paywall.plans.yearly.title}</Text>
              <Text style={[styles.planSubtitle, { color: theme.colors.textMuted }]}>{t.paywall.plans.yearly.subtitle}</Text>
            </View>
            <Text style={[styles.badge, { backgroundColor: theme.colors.accent, color: theme.colors.primaryText }]}>
              {t.paywall.plans.yearly.badge}
            </Text>
          </View>
          <Text style={[styles.planPrice, { color: theme.colors.text }]}>{yearlyPrice}</Text>
          <Text style={[styles.savings, { color: theme.colors.success }]}>{t.paywall.yearlySavings}: {yearlySavings}</Text>
        </Pressable>
      </View>

      <Button title={t.paywall.tryFree} onPress={handleTryFree} theme={theme} leftIconName="star" />
      <Button title={t.paywall.continueFree} onPress={() => setScreen('meditations')} theme={theme} variant="secondary" />

      <Text style={[styles.footnote, { color: theme.colors.textSubtle }]}>{t.paywall.fxNote}</Text>
      <Text style={[styles.footnote, { color: theme.colors.textSubtle }]}>{t.paywall.legalMock}</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
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
  },
  eyebrow: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 10,
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
    marginTop: 18,
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
    marginTop: 20,
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
  plan: {
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
  },
  planHeaderRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  planTitle: {
    fontSize: 18,
    fontWeight: '800',
  },
  planSubtitle: {
    fontSize: 13,
    lineHeight: 18,
    marginTop: 4,
  },
  planPrice: {
    fontSize: 24,
    fontWeight: '900',
    marginTop: 14,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 999,
    fontSize: 12,
    fontWeight: '800',
    overflow: 'hidden',
  },
  savings: {
    fontSize: 13,
    fontWeight: '700',
    marginTop: 10,
  },
  footnote: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
  },
});
