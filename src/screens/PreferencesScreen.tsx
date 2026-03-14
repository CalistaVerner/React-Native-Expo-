import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useAppContext } from '../app/state/AppContext';
import { SUPPORTED_LANGUAGES, SUPPORTED_THEME_MODES } from '../features/settings/config/settings.config';
import { Screen } from '../shared/ui/Screen';
import { SectionTitle } from '../shared/ui/SectionTitle';

export default function PreferencesScreen() {
  const { theme, t, language, setLanguage, themeMode, setThemeMode, setScreen } = useAppContext();

  return (
    <Screen theme={theme}>
      <SectionTitle title={t.preferences.title} theme={theme} />

      <View style={[styles.card, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
        <Text style={[styles.label, { color: theme.colors.text }]}>{t.preferences.language}</Text>

        <View style={styles.row}>
          {SUPPORTED_LANGUAGES.map((item) => {
            const active = item === language;

            return (
              <Pressable
                key={item}
                onPress={() => setLanguage(item)}
                style={[
                  styles.option,
                  { borderColor: theme.colors.border, backgroundColor: theme.colors.surfaceAlt },
                  active && { borderColor: theme.colors.primary, backgroundColor: theme.colors.surface },
                ]}
              >
                <Text style={[styles.optionText, { color: theme.colors.text }]}>{item.toUpperCase()}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <View style={[styles.card, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
        <Text style={[styles.label, { color: theme.colors.text }]}>{t.preferences.theme}</Text>

        <View style={styles.row}>
          {SUPPORTED_THEME_MODES.map((item) => {
            const active = item === themeMode;

            return (
              <Pressable
                key={item}
                onPress={() => setThemeMode(item)}
                style={[
                  styles.option,
                  { borderColor: theme.colors.border, backgroundColor: theme.colors.surfaceAlt },
                  active && { borderColor: theme.colors.primary, backgroundColor: theme.colors.surface },
                ]}
              >
                <Text style={[styles.optionText, { color: theme.colors.text }]}>
                  {item === 'dark' ? t.preferences.dark : t.preferences.light}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <Pressable onPress={() => setScreen('meditations')} style={[styles.backButton, { borderColor: theme.colors.border }]}>
        <Text style={[styles.backText, { color: theme.colors.text }]}>{t.nav.backToMeditations}</Text>
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 14,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  option: {
    flex: 1,
    minHeight: 54,
    borderWidth: 1,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  optionText: {
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
  },
  backButton: {
    minHeight: 54,
    borderWidth: 1,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
  },
  backText: {
    fontSize: 15,
    fontWeight: '800',
    textAlign: 'center',
  },
});
