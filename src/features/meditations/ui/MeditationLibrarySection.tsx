import React from 'react';
import { Text, View } from 'react-native';
import { AnimatedEntrance } from '../../../shared/ui/AnimatedEntrance';
import { SectionHeader } from '../../../shared/ui/SectionHeader';
import { SurfaceCard } from '../../../shared/ui/SurfaceCard';
import type { Dictionary } from '../../../shared/i18n';
import type { AppTheme } from '../../../shared/theme/themes';
import type { Session } from '../config/sessions';
import { SessionCard } from './SessionCard';
import { meditationLibraryStyles } from './styles/meditationLibrarySection.styles';

type Props = {
  theme: AppTheme;
  t: Dictionary;
  sessions: Session[];
  selectedSessionId: string | null;
  isSubscribed: boolean;
  onSessionPress: (session: Session) => void;
  onLockedSessionPress: () => void;
  showSelectionSummary?: boolean;
};

export function MeditationLibrarySection({
  theme,
  t,
  sessions,
  selectedSessionId,
  isSubscribed,
  onSessionPress,
  onLockedSessionPress,
  showSelectionSummary = true,
}: Props) {
  const selectedSession = sessions.find((session) => session.id === selectedSessionId) ?? null;

  return (
    <View style={meditationLibraryStyles.root}>
      <SectionHeader
        theme={theme}
        eyebrow={t.meditations.libraryEyebrow}
        title={t.meditations.featured}
        caption={t.meditations.featuredCaption}
      />

      {showSelectionSummary ? (
        <SurfaceCard theme={theme} variant="soft" style={meditationLibraryStyles.summaryCard}>
          <Text style={[meditationLibraryStyles.summaryEyebrow, { color: theme.colors.primary }]}> 
            {selectedSession ? t.meditations.selectionReadyEyebrow : t.meditations.selectionIdleEyebrow}
          </Text>
          <Text style={[meditationLibraryStyles.summaryTitle, { color: theme.colors.text }]}> 
            {selectedSession ? selectedSession.title : t.meditations.selectionIdleTitle}
          </Text>
          <Text style={[meditationLibraryStyles.summaryText, { color: theme.colors.textMuted }]}> 
            {selectedSession
              ? `${selectedSession.duration} · ${selectedSession.category} · ${t.common.sessionOpenedSuffix}`
              : t.meditations.selectionIdleText}
          </Text>
        </SurfaceCard>
      ) : null}

      <View style={meditationLibraryStyles.list}>
        {sessions.map((item, index) => {
          const locked = item.premium && !isSubscribed;

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
                  if (locked) {
                    onLockedSessionPress();
                    return;
                  }
                  onSessionPress(item);
                }}
              />
            </AnimatedEntrance>
          );
        })}
      </View>
    </View>
  );
}
