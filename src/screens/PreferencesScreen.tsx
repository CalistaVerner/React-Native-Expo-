import React from 'react';
import { Text, View } from 'react-native';
import { useAppContext } from '../app/state/AppContext';
import {
  SUPPORTED_LANGUAGE_PREFERENCES,
  SUPPORTED_REGIONS,
  SUPPORTED_THEME_PREFERENCES,
} from '../features/settings/config/settings.config';
import type { RegionCode } from '../features/settings/model/types';
import { Button } from '../shared/ui/Button';
import { Screen } from '../shared/ui/Screen';
import { SectionTitle } from '../shared/ui/SectionTitle';
import { SelectableCard } from '../shared/ui/SelectableCard';
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

  return (
    <Screen theme={theme}>
      <AnimatedEntrance delay={40}>
        <SectionTitle title={t.preferences.title} caption={t.preferences.subtitle} theme={theme} />
      </AnimatedEntrance>

      <AnimatedEntrance delay={110}>
        <SurfaceCard theme={theme} style={preferencesStyles.card}>
          <Text style={[preferencesStyles.label, { color: theme.colors.text }]}>{t.preferences.language}</Text>
          <View style={preferencesStyles.grid}>
            {SUPPORTED_LANGUAGE_PREFERENCES.map((item) => {
              const isSelected = item === languagePreference;
              const title = item === 'system' ? t.common.system : t.languageNames[item];
              const description = item === 'system' ? `${t.common.current}: ${t.languageNames[language]}` : undefined;

              return (
                <View key={item} style={preferencesStyles.optionCell}>
                  <SelectableCard
                    title={title}
                    description={description}
                    theme={theme}
                    onPress={() => setLanguagePreference(item)}
                    isSelected={isSelected}
                    statusText={isSelected ? t.common.selected : undefined}
                    compact
                  />
                </View>
              );
            })}
          </View>
        </SurfaceCard>
      </AnimatedEntrance>

      <AnimatedEntrance delay={180}>
        <SurfaceCard theme={theme} style={preferencesStyles.card}>
          <Text style={[preferencesStyles.label, { color: theme.colors.text }]}>{t.preferences.theme}</Text>
          <View style={preferencesStyles.grid}>
            {SUPPORTED_THEME_PREFERENCES.map((item) => {
              const isSelected = item === themePreference;
              const title = item === 'system' ? t.preferences.themeSystem : item === 'dark' ? t.preferences.dark : t.preferences.light;

              return (
                <View key={item} style={preferencesStyles.optionCell}>
                  <SelectableCard
                    title={title}
                    theme={theme}
                    onPress={() => setThemePreference(item)}
                    isSelected={isSelected}
                    statusText={isSelected ? t.common.selected : undefined}
                    compact
                  />
                </View>
              );
            })}
          </View>
        </SurfaceCard>
      </AnimatedEntrance>

      <AnimatedEntrance delay={250}>
        <SurfaceCard theme={theme} style={preferencesStyles.card}>
          <Text style={[preferencesStyles.label, { color: theme.colors.text }]}>{t.preferences.region}</Text>
          <Text style={[preferencesStyles.description, { color: theme.colors.textMuted }]}>{t.preferences.regionDescription}</Text>
          <View style={preferencesStyles.grid}>
            <View style={preferencesStyles.optionCell}>
              <SelectableCard
                title={t.common.system}
                description={`${t.common.current}: ${t.regions[regionCode]}`}
                theme={theme}
                onPress={() => setRegionPreference('system')}
                isSelected={regionPreference === 'system'}
                statusText={regionPreference === 'system' ? t.common.selected : undefined}
                compact
              />
            </View>

            {SUPPORTED_REGIONS.map((item) => {
              const isSelected = item === regionPreference;
              return (
                <View key={item} style={preferencesStyles.optionCell}>
                  <SelectableCard
                    title={t.regions[item as RegionCode]}
                    theme={theme}
                    onPress={() => setRegionPreference(item)}
                    isSelected={isSelected}
                    statusText={isSelected ? t.common.selected : undefined}
                    compact
                  />
                </View>
              );
            })}
          </View>
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
