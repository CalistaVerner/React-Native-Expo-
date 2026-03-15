import React from 'react';
import { AnimatedEntrance } from '../shared/ui/AnimatedEntrance';
import { Screen } from '../shared/ui/Screen';
import { SectionDivider } from '../shared/ui/SectionDivider';
import { AffirmationSection } from '../features/affirmation/ui/AffirmationSection';
import { MeditationLibrarySection } from '../features/meditations/ui/MeditationLibrarySection';
import { MeditationsIntroSection } from '../features/meditations/ui/MeditationsIntroSection';
import { useMeditationsScreenModel } from './models/useMeditationsScreenModel';

export default function MeditationsScreen() {
  const {
    theme,
    t,
    isSubscribed,
    regionCode,
    flags,
    librarySessions,
    affirmation,
    selection,
    openSettings,
    openPaywall,
  } = useMeditationsScreenModel();

  return (
    <Screen theme={theme}>
      <AnimatedEntrance delay={40}>
        <MeditationsIntroSection
          theme={theme}
          t={t}
          isSubscribed={isSubscribed}
          regionCode={regionCode}
          onOpenSettings={openSettings}
        />
      </AnimatedEntrance>

      <AnimatedEntrance delay={115}>
        <SectionDivider theme={theme} label={t.meditations.aiDividerLabel} />
      </AnimatedEntrance>

      <AnimatedEntrance delay={165}>
        <AffirmationSection
          theme={theme}
          t={t}
          selectedMood={affirmation.selectedMood}
          onChangeMood={affirmation.setSelectedMood}
          onGenerate={affirmation.handleGenerate}
          isGenerating={affirmation.isGenerating}
          affirmationText={affirmation.affirmationText}
          lastPrompt={affirmation.lastPrompt}
          showPromptPreview={flags.showPromptPreview}
        />
      </AnimatedEntrance>

      <AnimatedEntrance delay={235}>
        <SectionDivider theme={theme} label={t.meditations.libraryDividerLabel} />
      </AnimatedEntrance>

      <MeditationLibrarySection
        theme={theme}
        t={t}
        sessions={librarySessions}
        selectedSessionId={selection.selectedSessionId}
        isSubscribed={isSubscribed}
        onSessionPress={selection.selectSession}
        onLockedSessionPress={openPaywall}
        showSelectionSummary={flags.showLibrarySelectionSummary}
      />
    </Screen>
  );
}
