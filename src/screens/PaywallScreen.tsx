import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useAppContext } from '../app/state/AppContext';
import { PLANS } from '../features/subscription/config/plans';
import { Button } from '../shared/ui/Button';
import { Screen } from '../shared/ui/Screen';

export default function PaywallScreen() {
  const { theme, t, selectedPlan, setSelectedPlan, setIsSubscribed, setScreen } = useAppContext();

  const handleSubscribe = () => {
    setIsSubscribed(true);
    setScreen('meditations');
  };

  return (
    <Screen theme={theme}>
      <View style={[styles.heroCard, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
        <Text style={[styles.eyebrow, { color: theme.colors.primary }]}>{t.paywall.eyebrow}</Text>
        <Text style={[styles.title, { color: theme.colors.text }]}>{t.paywall.title}</Text>
        <Text style={[styles.subtitle, { color: theme.colors.textMuted }]}>{t.paywall.subtitle}</Text>

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
        {PLANS.map((plan) => {
          const selected = plan.id === selectedPlan;
          const texts = t.paywall.plans[plan.id];

          return (
            <Pressable
              key={plan.id}
              onPress={() => setSelectedPlan(plan.id)}
              style={[
                styles.planCard,
                { backgroundColor: theme.colors.surfaceAlt, borderColor: theme.colors.border },
                selected && { borderColor: theme.colors.primary, backgroundColor: theme.colors.surface },
              ]}
            >
              <View style={styles.planHeader}>
                <View style={styles.planTextWrap}>
                  <Text style={[styles.planTitle, { color: theme.colors.text }]}>{texts.title}</Text>
                  <Text style={[styles.planSubtitle, { color: theme.colors.textMuted }]}>{texts.subtitle}</Text>
                </View>

                {plan.isRecommended && texts.badge ? (
                  <Text style={[styles.badge, { backgroundColor: theme.colors.accent, color: theme.colors.primaryText }]}>
                    {texts.badge}
                  </Text>
                ) : null}
              </View>

              <Text style={[styles.price, { color: theme.colors.text }]}>{plan.price}</Text>
            </Pressable>
          );
        })}
      </View>

      <Button title={t.paywall.tryFree} onPress={handleSubscribe} theme={theme} />
      <Button title={t.paywall.continueFree} onPress={() => setScreen('meditations')} theme={theme} variant="secondary" />

      <Text style={[styles.legal, { color: theme.colors.textMuted }]}>{t.paywall.legalMock}</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  heroCard: {
    borderRadius: 28,
    padding: 22,
    marginTop: 8,
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
    fontSize: 30,
    lineHeight: 36,
    fontWeight: '800',
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    marginTop: 12,
  },
  benefits: {
    marginTop: 18,
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
  planCard: {
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  planTextWrap: {
    flex: 1,
  },
  planTitle: {
    fontSize: 17,
    fontWeight: '700',
  },
  planSubtitle: {
    fontSize: 13,
    marginTop: 4,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    fontSize: 12,
    fontWeight: '800',
  },
  price: {
    fontSize: 20,
    fontWeight: '800',
    marginTop: 14,
  },
  legal: {
    fontSize: 12,
    textAlign: 'center',
  },
});
