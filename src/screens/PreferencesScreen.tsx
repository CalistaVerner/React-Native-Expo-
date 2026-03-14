import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
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
      <SectionTitle title={t.preferences.title} caption={t.preferences.subtitle} theme={theme} />

      <View style={[styles.card, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}> 
        <Text style={[styles.label, { color: theme.colors.text }]}>{t.preferences.language}</Text>
        <View style={styles.grid}>
          {SUPPORTED_LANGUAGE_PREFERENCES.map((item) => {
            const active = item === languagePreference;
            const label = item === 'system' ? `${t.common.system} · ${t.languageNames[language]}` : t.languageNames[item];
            return (
              <Pressable
                key={item}
                onPress={() => setLanguagePreference(item)}
                style={[
                  styles.option,
                  { borderColor: theme.colors.border, backgroundColor: theme.colors.surfaceAlt },
                  active && { borderColor: theme.colors.primary, backgroundColor: theme.colors.surfaceSoft },
                ]}
              >
                <Text style={[styles.optionText, { color: theme.colors.text }]}>{label}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <View style={[styles.card, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}> 
        <Text style={[styles.label, { color: theme.colors.text }]}>{t.preferences.theme}</Text>
        <View style={styles.grid}>
          {SUPPORTED_THEME_PREFERENCES.map((item) => {
            const active = item === themePreference;
            const label = item === 'system' ? t.preferences.themeSystem : item === 'dark' ? t.preferences.dark : t.preferences.light;
            return (
              <Pressable
                key={item}
                onPress={() => setThemePreference(item)}
                style={[
                  styles.option,
                  { borderColor: theme.colors.border, backgroundColor: theme.colors.surfaceAlt },
                  active && { borderColor: theme.colors.primary, backgroundColor: theme.colors.surfaceSoft },
                ]}
              >
                <Text style={[styles.optionText, { color: theme.colors.text }]}>{label}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <View style={[styles.card, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}> 
        <Text style={[styles.label, { color: theme.colors.text }]}>{t.preferences.region}</Text>
        <Text style={[styles.description, { color: theme.colors.textMuted }]}>{t.preferences.regionDescription}</Text>
        <View style={styles.grid}>
          <Pressable
            onPress={() => setRegionPreference('system')}
            style={[
              styles.option,
              { borderColor: theme.colors.border, backgroundColor: theme.colors.surfaceAlt },
              regionPreference === 'system' && { borderColor: theme.colors.primary, backgroundColor: theme.colors.surfaceSoft },
            ]}
          >
            <Text style={[styles.optionText, { color: theme.colors.text }]}>{t.common.system} · {t.regions[regionCode]}</Text>
          </Pressable>
          {SUPPORTED_REGIONS.map((item) => {
            const active = item === regionPreference;
            return (
              <Pressable
                key={item}
                onPress={() => setRegionPreference(item)}
                style={[
                  styles.option,
                  { borderColor: theme.colors.border, backgroundColor: theme.colors.surfaceAlt },
                  active && { borderColor: theme.colors.primary, backgroundColor: theme.colors.surfaceSoft },
                ]}
              >
                <Text style={[styles.optionText, { color: theme.colors.text }]}>{t.regions[item as RegionCode]}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <View style={[styles.card, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}> 
        <Text style={[styles.label, { color: theme.colors.text }]}>{t.preferences.pricingPreview}</Text>
        <View style={styles.previewRow}>
          <View style={[styles.previewTile, { backgroundColor: theme.colors.surfaceAlt }]}> 
            <Text style={[styles.previewCaption, { color: theme.colors.textMuted }]}>{t.paywall.plans.monthly.title}</Text>
            <Text style={[styles.previewValue, { color: theme.colors.text }]}>{monthlyPrice}</Text>
          </View>
          <View style={[styles.previewTile, { backgroundColor: theme.colors.surfaceAlt }]}> 
            <Text style={[styles.previewCaption, { color: theme.colors.textMuted }]}>{t.paywall.plans.yearly.title}</Text>
            <Text style={[styles.previewValue, { color: theme.colors.text }]}>{yearlyPrice}</Text>
          </View>
        </View>
        <Text style={[styles.metaText, { color: theme.colors.textSubtle }]}>{t.preferences.fxUpdated}: {fxSnapshotDate}</Text>
      </View>

      <View style={[styles.card, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}> 
        <Text style={[styles.label, { color: theme.colors.text }]}>{t.preferences.subscriptionState}</Text>
        <Button
          title={isSubscribed ? t.preferences.subscriptionOn : t.preferences.subscriptionOff}
          onPress={() => setIsSubscribed(!isSubscribed)}
          theme={theme}
          variant="soft"
        />
      </View>

      <View style={[styles.card, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}> 
        <Text style={[styles.description, { color: theme.colors.textMuted }]}>{t.preferences.resetDescription}</Text>
        <Button title={t.common.restoreDefaults} onPress={() => void resetPreferences()} theme={theme} variant="secondary" />
      </View>

      <View style={styles.footerActions}>
        <Text style={[styles.savedText, { color: theme.colors.textSubtle }]}>{t.common.saved}</Text>
        <Button title={t.nav.backToMeditations} onPress={() => setScreen('meditations')} theme={theme} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    gap: 14,
  },
  label: {
    fontSize: 16,
    fontWeight: '800',
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  option: {
    minHeight: 52,
    minWidth: '48%',
    flexGrow: 1,
    borderWidth: 1,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  optionText: {
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
  },
  previewRow: {
    flexDirection: 'row',
    gap: 10,
  },
  previewTile: {
    flex: 1,
    borderRadius: 18,
    padding: 14,
  },
  previewCaption: {
    fontSize: 12,
    fontWeight: '700',
  },
  previewValue: {
    fontSize: 19,
    lineHeight: 24,
    fontWeight: '900',
    marginTop: 8,
  },
  metaText: {
    fontSize: 12,
    lineHeight: 18,
  },
  footerActions: {
    gap: 12,
  },
  savedText: {
    fontSize: 12,
    textAlign: 'center',
  },
});
