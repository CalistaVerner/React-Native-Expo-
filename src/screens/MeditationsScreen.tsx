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
  } = useAppContext();

  const handleGenerate = async () => {
    if (isGenerating) {
      return;
    }

    setIsGenerating(true);

    try {
      const result = await generateAffirmation(selectedMood);
      setGeneratedText(result.text);
      setLastPrompt(result.prompt);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Screen theme={theme}>
      <View style={styles.topBar}>
        <View style={styles.topTextBlock}>
          <Text style={[styles.title, { color: theme.colors.text }]}>{t.meditations.title}</Text>
          <Text style={[styles.subtitle, { color: theme.colors.textMuted }]}>
            {isSubscribed ? t.meditations.premiumUnlocked : t.meditations.freeMode}
          </Text>
        </View>

        <View style={styles.rightActions}>
          {!isSubscribed ? (
            <Pressable onPress={() => setScreen('paywall')} style={[styles.upgradePill, { backgroundColor: theme.colors.primary }]}>
              <Text style={[styles.upgradePillText, { color: theme.colors.primaryText }]}>{t.meditations.upgrade}</Text>
            </Pressable>
          ) : (
            <View style={[styles.upgradePill, { backgroundColor: theme.colors.success }]}>
              <Text style={[styles.upgradePillText, { color: theme.colors.successText }]}>{t.meditations.premium}</Text>
            </View>
          )}

          <Pressable onPress={() => setScreen('preferences')} style={[styles.settingsButton, { borderColor: theme.colors.border }]}>
            <Text style={[styles.settingsText, { color: theme.colors.text }]}>{t.nav.openSettings}</Text>
          </Pressable>
        </View>
      </View>

      <View style={[styles.aiCard, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
        <Text style={[styles.aiEyebrow, { color: theme.colors.primary }]}>{t.meditations.aiEyebrow}</Text>
        <SectionTitle title={t.meditations.aiTitle} theme={theme} />

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
          disabled={isGenerating}
        />

        <View style={[styles.outputCard, { backgroundColor: theme.colors.surfaceAlt }]}>
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
    marginTop: 8,
    gap: 12,
  },
  topTextBlock: {
    maxWidth: '82%',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
  },
  subtitle: {
    fontSize: 14,
    marginTop: 6,
    lineHeight: 20,
  },
  rightActions: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
  },
  upgradePill: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    alignSelf: 'flex-start',
  },
  upgradePillText: {
    fontSize: 13,
    fontWeight: '800',
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
  aiCard: {
    borderRadius: 26,
    padding: 18,
    borderWidth: 1,
  },
  aiEyebrow: {
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  outputCard: {
    borderRadius: 18,
    padding: 16,
    marginTop: 14,
  },
  outputText: {
    fontSize: 15,
    lineHeight: 23,
  },
  promptBox: {
    marginTop: 12,
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
