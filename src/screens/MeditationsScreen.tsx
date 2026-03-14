import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useAppContext } from '../app/state/AppContext';
import { generateAffirmation } from '../features/affirmation/lib/generateAffirmation';
import { MoodPicker } from '../features/affirmation/ui/MoodPicker';
import { SESSIONS } from '../features/meditations/config/sessions';
import { SessionCard } from '../features/meditations/ui/SessionCard';
import { resolvePremiumNavigation } from '../features/subscription/lib/subscriptionGuard';
import { Button } from '../shared/ui/Button';
import { Screen } from '../shared/ui/Screen';
import { SectionTitle } from '../shared/ui/SectionTitle';
import { AnimatedEntrance } from '../shared/ui/AnimatedEntrance';
import { SurfaceCard } from '../shared/ui/SurfaceCard';
import { meditationsStyles } from './styles/meditations.styles';

export default function MeditationsScreen() {
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);

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
      <AnimatedEntrance delay={40}>
        <View style={meditationsStyles.topBar}>
          <View style={meditationsStyles.topBarTextWrap}>
            <Text style={[meditationsStyles.title, { color: theme.colors.text }]}>{t.meditations.title}</Text>
            <Text style={[meditationsStyles.subtitle, { color: theme.colors.textMuted }]}>
              {isSubscribed ? t.meditations.premiumUnlocked : t.meditations.freeMode}
            </Text>
          </View>

          <Pressable
            onPress={() => setScreen('preferences')}
            style={({ pressed }) => [
              meditationsStyles.settingsButton,
              { borderColor: theme.colors.border, backgroundColor: theme.colors.surfaceSoft },
              pressed && { transform: [{ scale: 0.985 }] },
            ]}
          >
            <Text style={[meditationsStyles.settingsText, { color: theme.colors.text }]}>{t.nav.openSettings}</Text>
          </Pressable>
        </View>
      </AnimatedEntrance>

      <AnimatedEntrance delay={110}>
        <SurfaceCard theme={theme} variant="hero" style={meditationsStyles.welcomeCard}>
          <View style={meditationsStyles.welcomeAccentRow}>
            <View style={[meditationsStyles.welcomeAccent, { backgroundColor: theme.mode === 'dark' ? 'rgba(244,214,148,0.16)' : 'rgba(232,190,100,0.14)' }]} />
            <Text style={[meditationsStyles.welcomeTitle, { color: theme.colors.text }]}>{t.meditations.welcome}</Text>
          </View>
          <Text style={[meditationsStyles.welcomeText, { color: theme.colors.textMuted }]}>{t.meditations.settingsHint}</Text>
          <View style={meditationsStyles.quickMeta}>
            <View style={[meditationsStyles.metaPill, { backgroundColor: theme.colors.surfaceSoft }]}> 
              <Text style={[meditationsStyles.metaPillText, { color: theme.colors.text }]}>{t.regions[regionCode]}</Text>
            </View>
            <View style={[meditationsStyles.metaPill, { backgroundColor: isSubscribed ? theme.colors.success : theme.colors.surfaceSoft }]}> 
              <Text style={[meditationsStyles.metaPillText, { color: isSubscribed ? theme.colors.successText : theme.colors.text }]}> 
                {isSubscribed ? t.meditations.premium : t.meditations.upgrade}
              </Text>
            </View>
          </View>
        </SurfaceCard>
      </AnimatedEntrance>

      <AnimatedEntrance delay={180}>
        <SurfaceCard theme={theme} style={meditationsStyles.aiCard}>
          <SectionTitle title={t.meditations.aiEyebrow} caption={t.meditations.aiTitle} theme={theme} />

          <MoodPicker
            value={selectedMood}
            onChange={setSelectedMood}
            theme={theme}
            selectedLabel={t.common.selected}
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
            leftAdornment="🪷"
          />

          <View style={[meditationsStyles.output, { backgroundColor: theme.colors.surfaceSoft }]}> 
            <Text style={[meditationsStyles.outputText, { color: theme.colors.text }]}>{generatedText || t.meditations.aiPlaceholder}</Text>
          </View>

          {!!lastPrompt && (
            <View style={[meditationsStyles.promptBox, { backgroundColor: theme.colors.surfaceSoft }]}> 
              <Text style={[meditationsStyles.promptLabel, { color: theme.colors.primary }]}>{t.common.mockPrompt}</Text>
              <Text style={[meditationsStyles.promptText, { color: theme.colors.textMuted }]}>{lastPrompt}</Text>
            </View>
          )}
        </SurfaceCard>
      </AnimatedEntrance>

      <AnimatedEntrance delay={240}>
        <SectionTitle title={t.meditations.featured} caption={t.meditations.featuredCaption} theme={theme} />
      </AnimatedEntrance>

      {SESSIONS.map((item, index) => {
        const target = resolvePremiumNavigation(isSubscribed, item.premium);
        const locked = target === 'paywall';

        return (
          <AnimatedEntrance key={item.id} delay={300 + index * 55}>
            <SessionCard
              item={item}
              theme={theme}
              locked={locked}
              lockedLabel={t.meditations.lockedSession}
              openLabel={t.meditations.openSession}
              selectedLabel={t.common.selected}
              isSelected={!locked && selectedSessionId === item.id}
              onPress={() => {
                if (target === 'paywall') {
                  setScreen('paywall');
                  return;
                }
                setSelectedSessionId(item.id);
                setGeneratedText(`${t.common.sessionOpenedPrefix}: ${item.title}. ${t.common.sessionOpenedSuffix}`);
              }}
            />
          </AnimatedEntrance>
        );
      })}
    </Screen>
  );
}
