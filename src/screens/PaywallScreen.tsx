import React from 'react';
import { Text, View } from 'react-native';
import { useAppContext } from '../app/state/AppContext';
import { paywallStyles } from './styles/paywall.styles';
import { Button } from '../shared/ui/Button';
import { Screen } from '../shared/ui/Screen';
import { SelectableCard } from '../shared/ui/SelectableCard';

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
      <View style={paywallStyles.topChips}>
        <View style={[paywallStyles.chip, { backgroundColor: theme.colors.surfaceAlt, borderColor: theme.colors.border }]}> 
          <Text style={[paywallStyles.chipText, { color: theme.colors.text }]}>{t.paywall.regionChip}</Text>
        </View>
        <View style={[paywallStyles.chip, { backgroundColor: theme.colors.surfaceAlt, borderColor: theme.colors.border }]}> 
          <Text style={[paywallStyles.chipText, { color: theme.colors.text }]}>
            {t.regions[regionCode]} · {detectedCurrencyCode}
          </Text>
        </View>
      </View>

      <View style={[paywallStyles.heroCard, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}> 
        <Text style={[paywallStyles.eyebrow, { color: theme.colors.primary }]}>{t.paywall.eyebrow}</Text>
        <View>
          <Text style={[paywallStyles.title, { color: theme.colors.text }]}>{t.paywall.title}</Text>
          <Text style={[paywallStyles.subtitle, { color: theme.colors.textMuted }]}>{t.paywall.subtitle}</Text>
        </View>

        <View style={paywallStyles.metricsRow}>
          <View style={[paywallStyles.metricCard, { backgroundColor: theme.colors.surfaceAlt }]}> 
            <Text style={[paywallStyles.metricLabel, { color: theme.colors.textMuted }]}>{t.paywall.detectedRegion}</Text>
            <Text style={[paywallStyles.metricValue, { color: theme.colors.text }]}>{t.regions[regionCode]}</Text>
          </View>
          <View style={[paywallStyles.metricCard, { backgroundColor: theme.colors.surfaceAlt }]}> 
            <Text style={[paywallStyles.metricLabel, { color: theme.colors.textMuted }]}>{t.paywall.currency}</Text>
            <Text style={[paywallStyles.metricValue, { color: theme.colors.text }]}>{detectedCurrencyCode}</Text>
          </View>
        </View>

        <View style={paywallStyles.benefits}>
          {t.paywall.benefits.map((item) => (
            <View key={item} style={paywallStyles.benefitRow}>
              <Text style={[paywallStyles.benefitIcon, { color: theme.colors.accent }]}>✦</Text>
              <Text style={[paywallStyles.benefitText, { color: theme.colors.text }]}>{item}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={paywallStyles.plans}>
        <SelectableCard
          title={t.paywall.plans.monthly.title}
          description={t.paywall.plans.monthly.subtitle}
          theme={theme}
          onPress={() => setSelectedPlan('monthly')}
          isSelected={selectedPlan === 'monthly'}
          statusText={selectedPlan === 'monthly' ? t.common.selected : undefined}
          accessoryText={monthlyPrice}
        >
          <View style={paywallStyles.planPriceWrap}>
            <Text style={[paywallStyles.planPrice, { color: theme.colors.text }]}>{monthlyPrice}</Text>
          </View>
        </SelectableCard>

        <SelectableCard
          title={t.paywall.plans.yearly.title}
          description={t.paywall.plans.yearly.subtitle}
          theme={theme}
          onPress={() => setSelectedPlan('yearly')}
          isSelected={selectedPlan === 'yearly'}
          statusText={selectedPlan === 'yearly' ? t.common.selected : undefined}
          badgeText={t.paywall.plans.yearly.badge}
          accessoryText={yearlyPrice}
        >
          <View style={paywallStyles.planPriceWrap}>
            <Text style={[paywallStyles.planPrice, { color: theme.colors.text }]}>{yearlyPrice}</Text>
            <Text style={[paywallStyles.savings, { color: theme.colors.success }]}>{yearlySavings}</Text>
          </View>
        </SelectableCard>
      </View>

      <Button title={t.paywall.tryFree} onPress={handleTryFree} theme={theme} leftAdornment="✨" />
      <Button title={t.paywall.continueFree} onPress={() => setScreen('meditations')} theme={theme} variant="secondary" />

      <Text style={[paywallStyles.footnote, { color: theme.colors.textSubtle }]}>{t.paywall.fxNote}</Text>
      <Text style={[paywallStyles.footnote, { color: theme.colors.textSubtle }]}>{t.paywall.legalMock}</Text>
    </Screen>
  );
}
