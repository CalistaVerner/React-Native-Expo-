import React from 'react';
import { Text, View } from 'react-native';
import { paywallStyles } from './styles/paywall.styles';
import { Button } from '../shared/ui/Button';
import { Screen } from '../shared/ui/Screen';
import { SelectableCard } from '../shared/ui/SelectableCard';
import { AnimatedEntrance } from '../shared/ui/AnimatedEntrance';
import { SurfaceCard } from '../shared/ui/SurfaceCard';
import { AppIcon } from '../shared/ui/AppIcon';
import { usePaywallScreenModel } from './models/usePaywallScreenModel';

export default function PaywallScreen() {
  const {
    theme,
    t,
    regionCode,
    detectedCurrencyCode,
    plans,
    flags,
    setSelectedPlan,
    onTryFree,
    onContinueFree,
  } = usePaywallScreenModel();

  return (
    <Screen theme={theme}>
      {flags.showTopChips ? (
        <AnimatedEntrance delay={40}>
          <View style={paywallStyles.topChips}>
            <View style={[paywallStyles.chip, { backgroundColor: theme.colors.surfaceSoft, borderColor: theme.colors.border }]}> 
              <Text style={[paywallStyles.chipText, { color: theme.colors.text }]}>{t.paywall.regionChip}</Text>
            </View>
            <View style={[paywallStyles.chip, { backgroundColor: theme.colors.surfaceSoft, borderColor: theme.colors.border }]}> 
              <Text style={[paywallStyles.chipText, { color: theme.colors.text }]}> 
                {t.regions[regionCode]} · {detectedCurrencyCode}
              </Text>
            </View>
          </View>
        </AnimatedEntrance>
      ) : null}

      <AnimatedEntrance delay={110}>
        <SurfaceCard theme={theme} variant="hero" style={paywallStyles.heroCard}>
          <View style={paywallStyles.heroGlowRow}>
            <View style={[paywallStyles.heroGlow, { backgroundColor: theme.mode === 'dark' ? 'rgba(205,186,255,0.16)' : 'rgba(114,87,232,0.10)' }]} />
            <Text style={[paywallStyles.eyebrow, { color: theme.colors.primary }]}>{t.paywall.eyebrow}</Text>
          </View>

          <View style={paywallStyles.heroTextWrap}>
            <Text style={[paywallStyles.title, { color: theme.colors.text }]}>{t.paywall.title}</Text>
            <Text style={[paywallStyles.subtitle, { color: theme.colors.textMuted }]}>{t.paywall.subtitle}</Text>
          </View>

          {flags.showRegionalMetrics ? (
            <View style={paywallStyles.metricsRow}>
              <View style={[paywallStyles.metricCard, { backgroundColor: theme.colors.surfaceSoft }]}> 
                <Text style={[paywallStyles.metricLabel, { color: theme.colors.textMuted }]}>{t.paywall.detectedRegion}</Text>
                <Text style={[paywallStyles.metricValue, { color: theme.colors.text }]}>{t.regions[regionCode]}</Text>
              </View>
              <View style={[paywallStyles.metricCard, { backgroundColor: theme.colors.surfaceSoft }]}> 
                <Text style={[paywallStyles.metricLabel, { color: theme.colors.textMuted }]}>{t.paywall.currency}</Text>
                <Text style={[paywallStyles.metricValue, { color: theme.colors.text }]}>{detectedCurrencyCode}</Text>
              </View>
            </View>
          ) : null}

          <View style={paywallStyles.benefits}>
            {t.paywall.benefits.map((item) => (
              <View key={item} style={paywallStyles.benefitRow}>
                <View style={[paywallStyles.benefitIconWrap, { backgroundColor: theme.colors.surfaceSoft }]}> 
                  <AppIcon name="check" size={12} color={theme.colors.accent} />
                </View>
                <Text style={[paywallStyles.benefitText, { color: theme.colors.text }]}>{item}</Text>
              </View>
            ))}
          </View>
        </SurfaceCard>
      </AnimatedEntrance>

      <AnimatedEntrance delay={180}>
        <View style={paywallStyles.plans}>
          {plans.map((plan) => (
            <SelectableCard
              key={plan.id}
              title={plan.title}
              description={plan.description}
              theme={theme}
              onPress={() => setSelectedPlan(plan.id)}
              isSelected={plan.isSelected}
              statusText={plan.statusText}
              badgeText={plan.badgeText}
              accessoryText={plan.priceText}
              selectionStyle="inline"
            >
              <View style={paywallStyles.planPriceWrap}>
                <Text style={[paywallStyles.planPrice, { color: theme.colors.text }]}>{plan.priceText}</Text>
                {plan.savingsText ? (
                  <Text style={[paywallStyles.savings, { color: theme.colors.success }]}>{plan.savingsText}</Text>
                ) : null}
              </View>
            </SelectableCard>
          ))}
        </View>
      </AnimatedEntrance>

      <AnimatedEntrance delay={250}>
        <View style={paywallStyles.actionsWrap}>
          <Button title={t.paywall.tryFree} onPress={onTryFree} theme={theme} leftIcon="star" />
          <Button title={t.paywall.continueFree} onPress={onContinueFree} theme={theme} variant="secondary" />
        </View>
      </AnimatedEntrance>

      {flags.showLegalNotes ? (
        <AnimatedEntrance delay={320}>
          <View style={paywallStyles.footnotesWrap}>
            <Text style={[paywallStyles.footnote, { color: theme.colors.textSubtle }]}>{t.paywall.fxNote}</Text>
            <Text style={[paywallStyles.footnote, { color: theme.colors.textSubtle }]}>{t.paywall.legalMock}</Text>
          </View>
        </AnimatedEntrance>
      ) : null}
    </Screen>
  );
}
