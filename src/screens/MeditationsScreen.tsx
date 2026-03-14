import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useAppContext } from '../app/state/AppContext';
import { generateAffirmation } from '../features/affirmation/lib/generateAffirmation';
import { MoodPicker } from '../features/affirmation/ui/MoodPicker';
import { SESSIONS } from '../features/meditations/config/sessions';
import { SessionCard } from '../features/meditations/ui/SessionCard';
import { resolvePremiumNavigation } from '../features/subscription/lib/subscriptionGuard';
import { Button } from '../shared/ui/Button';
import { Screen } from '../shared/ui/Screen';
import { SectionTitle } from '../shared/ui/SectionTitle';

export default function MeditationsScreen() {
  const {
    theme,
    t,
    isSubscribed,
    setScreen,
    selectedMood,
    setSelectedMood,
    generatedText,
    setGeneratedText,
    lastPrompt,
    setLastPrompt,
    isGenerating,
    setIsGenerating,
    regionCode,
    language,
  } = useAppContext();

  const handleGenerate = async () => {
    if (isGenerating) return;

    setIsGenerating(true);
    try {
      const result = await generateAffirmation(language, selectedMood);
      setGeneratedText(result.text);
      setLastPrompt(result.prompt);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Screen theme={theme}>
      <View style={styles.topBar}>
        <View style={{ flex: 1 }}>
          <Text style={[styles.title, { color: theme.colors.text }]}>{t.meditations.title}</Text>
          <Text style={[styles.subtitle, { color: theme.colors.textMuted }]}>
            {isSubscribed ? t.meditations.premiumUnlocked : t.meditations.freeMode}
          </Text>
        </View>

        <Pressable onPress={() => setScreen('preferences')} style={[styles.settingsButton, { borderColor: theme.colors.border, backgroundColor: theme.colors.surfaceAlt }]}> 
          <Text style={[styles.settingsText, { color: theme.colors.text }]}>{t.nav.openSettings}</Text>
        </Pressable>
      </View>

      <View style={[styles.welcomeCard, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}> 
        <Text style={[styles.welcomeTitle, { color: theme.colors.text }]}>{t.meditations.welcome}</Text>
        <Text style={[styles.welcomeText, { color: theme.colors.textMuted }]}>{t.meditations.settingsHint}</Text>
        <View style={styles.quickMeta}>
          <View style={[styles.metaPill, { backgroundColor: theme.colors.surfaceAlt }]}> 
            <Text style={[styles.metaPillText, { color: theme.colors.text }]}>{t.regions[regionCode]}</Text>
          </View>
          <View style={[styles.metaPill, { backgroundColor: isSubscribed ? theme.colors.success : theme.colors.surfaceAlt }]}> 
            <Text style={[styles.metaPillText, { color: isSubscribed ? theme.colors.successText : theme.colors.text }]}>
              {isSubscribed ? t.meditations.premium : t.meditations.upgrade}
            </Text>
          </View>
        </View>
      </View>

      <View style={[styles.aiCard, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}> 
        <SectionTitle title={t.meditations.aiEyebrow} caption={t.meditations.aiTitle} theme={theme} />

        <MoodPicker
          value={selectedMood}
          onChange={setSelectedMood}
          theme={theme}
          labels={{
            calm: t.moods.calm,
            neutral: t.moods.neutral,
            stressed: t.moods.stressed,
          }}
        />

        <Button
          title={isGenerating ? t.common.generating : t.meditations.aiButton}
          onPress={handleGenerate}
          theme={theme}
          variant="soft"
          disabled={isGenerating}
          leftIconName="magic"
        />

        <View style={[styles.output, { backgroundColor: theme.colors.surfaceAlt }]}> 
          <Text style={[styles.outputText, { color: theme.colors.text }]}>
            {generatedText || t.meditations.aiPlaceholder}
          </Text>
        </View>

        {!!lastPrompt && (
          <View style={[styles.promptBox, { backgroundColor: theme.colors.surfaceAlt }]}> 
            <Text style={[styles.promptLabel, { color: theme.colors.primary }]}>{t.common.mockPrompt}</Text>
            <Text style={[styles.promptText, { color: theme.colors.textMuted }]}>{lastPrompt}</Text>
          </View>
        )}
      </View>

      <SectionTitle title={t.meditations.featured} caption={t.meditations.featuredCaption} theme={theme} />

      {SESSIONS.map((item) => {
        const target = resolvePremiumNavigation(isSubscribed, item.premium);
        const locked = target === 'paywall';

        return (
          <SessionCard
            key={item.id}
            item={item}
            theme={theme}
            locked={locked}
            lockedLabel={t.meditations.lockedSession}
            openLabel={t.meditations.openSession}
            onPress={() => {
              if (target === 'paywall') {
                setScreen('paywall');
                return;
              }
              setGeneratedText(`${t.common.sessionOpenedPrefix}: ${item.title}. ${t.common.sessionOpenedSuffix}`);
            }}
          />
        );
      })}
    </Screen>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
  },
  subtitle: {
    fontSize: 14,
    marginTop: 6,
    lineHeight: 20,
  },
  settingsButton: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 10,
    alignSelf: 'flex-start',
  },
  settingsText: {
    fontSize: 13,
    fontWeight: '800',
  },
  welcomeCard: {
    borderRadius: 28,
    padding: 20,
    borderWidth: 1,
  },
  welcomeTitle: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '900',
  },
  welcomeText: {
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
  },
  quickMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 16,
  },
  metaPill: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  metaPillText: {
    fontSize: 12,
    fontWeight: '800',
  },
  aiCard: {
    borderRadius: 26,
    padding: 18,
    borderWidth: 1,
    gap: 16,
  },
  output: {
    borderRadius: 18,
    padding: 16,
  },
  outputText: {
    fontSize: 15,
    lineHeight: 23,
  },
  promptBox: {
    padding: 14,
    borderRadius: 16,
  },
  promptLabel: {
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 8,
  },
  promptText: {
    fontSize: 12,
    lineHeight: 18,
  },
});
