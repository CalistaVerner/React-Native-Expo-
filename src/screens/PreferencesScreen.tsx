import React, { useMemo } from 'react';
import { Text, View } from 'react-native';
import { useAppContext } from '../app/state/AppContext';
import { buildLanguagePreferenceOptions, buildRegionPreferenceOptions, buildThemePreferenceOptions } from '../features/settings/lib/preferenceSelectOptions';
import { Button } from '../shared/ui/Button';
import { SelectBox } from '../shared/ui/SelectBox';
import { Screen } from '../shared/ui/Screen';
import { SectionTitle } from '../shared/ui/SectionTitle';
import { AnimatedEntrance } from '../shared/ui/AnimatedEntrance';
import { SurfaceCard } from '../shared/ui/SurfaceCard';
import { preferencesStyles } from './styles/preferences.styles';

export default function PreferencesScreen() {
  const {
    theme,
    t,
    language,
    languagePreference,
    setLanguagePreference,
    themePreference,
    setThemePreference,
    regionPreference,
    setRegionPreference,
    regionCode,
    monthlyPrice,
    yearlyPrice,
    fxSnapshotDate,
    isSubscribed,
    setIsSubscribed,
    setScreen,
    resetPreferences,
  } = useAppContext();

  const languageOptions = useMemo(() => buildLanguagePreferenceOptions(t, language), [t, language]);
  const themeOptions = useMemo(() => buildThemePreferenceOptions(t), [t]);
  const regionOptions = useMemo(() => buildRegionPreferenceOptions(t, regionCode), [t, regionCode]);

  return (
    <Screen theme={theme}>
      <AnimatedEntrance delay={40}>
        <SectionTitle title={t.preferences.title} caption={t.preferences.subtitle} theme={theme} />
      </AnimatedEntrance>

      <AnimatedEntrance delay={110}>
        <SurfaceCard theme={theme} style={preferencesStyles.card}>
          <SelectBox
            theme={theme}
            label={t.preferences.language}
            modalTitle={t.preferences.language}
            options={languageOptions}
            value={languagePreference}
            onChange={setLanguagePreference}
          />
        </SurfaceCard>
      </AnimatedEntrance>

      <AnimatedEntrance delay={180}>
        <SurfaceCard theme={theme} style={preferencesStyles.card}>
          <SelectBox
            theme={theme}
            label={t.preferences.theme}
            modalTitle={t.preferences.theme}
            options={themeOptions}
            value={themePreference}
            onChange={setThemePreference}
          />
        </SurfaceCard>
      </AnimatedEntrance>

      <AnimatedEntrance delay={250}>
        <SurfaceCard theme={theme} style={preferencesStyles.card}>
          <SelectBox
            theme={theme}
            label={t.preferences.region}
            modalTitle={t.preferences.region}
            options={regionOptions}
            value={regionPreference}
            onChange={setRegionPreference}
          />
          <Text style={[preferencesStyles.description, { color: theme.colors.textMuted }]}>{t.preferences.regionDescription}</Text>
        </SurfaceCard>
      </AnimatedEntrance>

      <AnimatedEntrance delay={320}>
        <SurfaceCard theme={theme} style={preferencesStyles.card}>
          <Text style={[preferencesStyles.label, { color: theme.colors.text }]}>{t.preferences.pricingPreview}</Text>
          <View style={preferencesStyles.previewRow}>
            <View style={[preferencesStyles.previewTile, { backgroundColor: theme.colors.surfaceSoft }]}> 
              <Text style={[preferencesStyles.previewCaption, { color: theme.colors.textMuted }]}>{t.paywall.plans.monthly.title}</Text>
              <Text style={[preferencesStyles.previewValue, { color: theme.colors.text }]}>{monthlyPrice}</Text>
            </View>
            <View style={[preferencesStyles.previewTile, { backgroundColor: theme.colors.surfaceSoft }]}> 
              <Text style={[preferencesStyles.previewCaption, { color: theme.colors.textMuted }]}>{t.paywall.plans.yearly.title}</Text>
              <Text style={[preferencesStyles.previewValue, { color: theme.colors.text }]}>{yearlyPrice}</Text>
            </View>
          </View>
          <Text style={[preferencesStyles.metaText, { color: theme.colors.textSubtle }]}> 
            {t.preferences.fxUpdated}: {fxSnapshotDate}
          </Text>
        </SurfaceCard>
      </AnimatedEntrance>

      <AnimatedEntrance delay={390}>
        <SurfaceCard theme={theme} style={preferencesStyles.card}>
          <Text style={[preferencesStyles.label, { color: theme.colors.text }]}>{t.preferences.subscriptionState}</Text>
          <Button
            title={isSubscribed ? t.preferences.subscriptionOn : t.preferences.subscriptionOff}
            onPress={() => setIsSubscribed(!isSubscribed)}
            theme={theme}
            variant="soft"
          />
        </SurfaceCard>
      </AnimatedEntrance>

      <AnimatedEntrance delay={460}>
        <SurfaceCard theme={theme} style={preferencesStyles.card}>
          <Text style={[preferencesStyles.description, { color: theme.colors.textMuted }]}>{t.preferences.resetDescription}</Text>
          <Button title={t.common.restoreDefaults} onPress={() => void resetPreferences()} theme={theme} variant="secondary" />
        </SurfaceCard>
      </AnimatedEntrance>

      <AnimatedEntrance delay={530}>
        <View style={preferencesStyles.footerActions}>
          <Text style={[preferencesStyles.savedText, { color: theme.colors.textSubtle }]}>{t.common.saved}</Text>
          <Button title={t.nav.backToMeditations} onPress={() => setScreen('meditations')} theme={theme} />
        </View>
      </AnimatedEntrance>
    </Screen>
  );
}
