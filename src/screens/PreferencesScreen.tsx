import React from 'react';
import { Text, View } from 'react-native';
import { DemoSubscriptionCard } from '../features/subscription/ui/DemoSubscriptionCard';
import { PricingPreviewCard } from '../features/subscription/ui/PricingPreviewCard';
import { PreferenceSectionCard } from '../features/settings/ui/PreferenceSectionCard';
import { Button } from '../shared/ui/Button';
import { Screen } from '../shared/ui/Screen';
import { AnimatedEntrance } from '../shared/ui/AnimatedEntrance';
import { SurfaceCard } from '../shared/ui/SurfaceCard';
import { preferencesStyles } from './styles/preferences.styles';
import { usePreferencesScreenModel } from './models/usePreferencesScreenModel';

export default function PreferencesScreen() {
  const {
    theme,
    t,
    sections,
    flags,
    monthlyPrice,
    yearlyPrice,
    fxSnapshotDate,
    isSubscribed,
    toggleSubscribed,
    resetPreferences,
    backToMeditations,
  } = usePreferencesScreenModel();

  return (
    <Screen theme={theme}>
      {sections.map((section, index) => (
        <AnimatedEntrance key={section.key} delay={40 + index * 90}>
          <PreferenceSectionCard theme={theme} section={section} />
        </AnimatedEntrance>
      ))}

      {flags.showPricingPreview ? (
        <AnimatedEntrance delay={240}>
          <PricingPreviewCard
            theme={theme}
            t={t}
            monthlyPrice={monthlyPrice}
            yearlyPrice={yearlyPrice}
            fxSnapshotDate={fxSnapshotDate}
          />
        </AnimatedEntrance>
      ) : null}

      {flags.showDemoSubscriptionState ? (
        <AnimatedEntrance delay={320}>
          <DemoSubscriptionCard theme={theme} t={t} isSubscribed={isSubscribed} onToggle={toggleSubscribed} />
        </AnimatedEntrance>
      ) : null}

      <AnimatedEntrance delay={400}>
        <SurfaceCard theme={theme} style={preferencesStyles.card}>
          <Text style={[preferencesStyles.description, { color: theme.colors.textMuted }]}>{t.preferences.resetDescription}</Text>
          <Button title={t.common.restoreDefaults} onPress={resetPreferences} theme={theme} variant="secondary" />
        </SurfaceCard>
      </AnimatedEntrance>

      <AnimatedEntrance delay={480}>
        <View style={preferencesStyles.footerActions}>
          <Text style={[preferencesStyles.savedText, { color: theme.colors.textSubtle }]}>{t.common.saved}</Text>
          <Button title={t.nav.backToMeditations} onPress={backToMeditations} theme={theme} />
        </View>
      </AnimatedEntrance>
    </Screen>
  );
}
