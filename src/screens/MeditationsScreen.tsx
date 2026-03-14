import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useAppContext } from '../app/state/AppContext';
import { generateAffirmation } from '../features/affirmation/lib/generateAffirmation';
import { AffirmationComposerCard } from '../features/affirmation/ui/AffirmationComposerCard';
import { SESSIONS } from '../features/meditations/config/sessions';
import { SessionCard } from '../features/meditations/ui/SessionCard';
import { resolvePremiumNavigation } from '../features/subscription/lib/subscriptionGuard';
import { Screen } from '../shared/ui/Screen';
import { SectionTitle } from '../shared/ui/SectionTitle';
import { AnimatedEntrance } from '../shared/ui/AnimatedEntrance';
import { meditationsStyles } from './styles/meditations.styles';
import { WelcomeSummaryCard } from '../features/meditations/ui/WelcomeSummaryCard';

export default function MeditationsScreen() {
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);

  const {
    theme,
    t,
    isSubscribed,
    setScreen,
    selectedMood,
    setSelectedMood,
    affirmationText,
    setAffirmationText,
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
      setAffirmationText(result.text);
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
        <WelcomeSummaryCard theme={theme} t={t} regionCode={regionCode} isSubscribed={isSubscribed} />
      </AnimatedEntrance>

      <AnimatedEntrance delay={180}>
        <AffirmationComposerCard
          theme={theme}
          t={t}
          selectedMood={selectedMood}
          onMoodChange={setSelectedMood}
          onGenerate={handleGenerate}
          isGenerating={isGenerating}
          affirmationText={affirmationText}
          promptText={lastPrompt}
        />
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
              }}
            />
          </AnimatedEntrance>
        );
      })}
    </Screen>
  );
}
