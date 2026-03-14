import React, { useState } from 'react';
import { useAppContext } from '../app/state/AppContext';
import { generateAffirmation } from '../features/affirmation/lib/generateAffirmation';
import { AffirmationSection } from '../features/affirmation/ui/AffirmationSection';
import { SESSIONS, type Session } from '../features/meditations/config/sessions';
import { MeditationLibrarySection } from '../features/meditations/ui/MeditationLibrarySection';
import { MeditationsIntroSection } from '../features/meditations/ui/MeditationsIntroSection';
import { AnimatedEntrance } from '../shared/ui/AnimatedEntrance';
import { Screen } from '../shared/ui/Screen';
import { SectionDivider } from '../shared/ui/SectionDivider';

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

  const handleSessionPress = (session: Session) => {
    setSelectedSessionId(session.id);
  };

  return (
    <Screen theme={theme}>
      <AnimatedEntrance delay={40}>
        <MeditationsIntroSection
          theme={theme}
          t={t}
          isSubscribed={isSubscribed}
          regionCode={regionCode}
          onOpenSettings={() => setScreen('preferences')}
        />
      </AnimatedEntrance>

      <AnimatedEntrance delay={115}>
        <SectionDivider theme={theme} label={t.meditations.aiDividerLabel} />
      </AnimatedEntrance>

      <AnimatedEntrance delay={165}>
        <AffirmationSection
          theme={theme}
          t={t}
          selectedMood={selectedMood}
          onChangeMood={setSelectedMood}
          onGenerate={handleGenerate}
          isGenerating={isGenerating}
          affirmationText={generatedText}
          lastPrompt={lastPrompt}
        />
      </AnimatedEntrance>

      <AnimatedEntrance delay={235}>
        <SectionDivider theme={theme} label={t.meditations.libraryDividerLabel} />
      </AnimatedEntrance>

      <MeditationLibrarySection
        theme={theme}
        t={t}
        sessions={SESSIONS}
        selectedSessionId={selectedSessionId}
        isSubscribed={isSubscribed}
        onSessionPress={handleSessionPress}
        onLockedSessionPress={() => setScreen('paywall')}
      />
    </Screen>
  );
}
