import React from 'react';
import { Text } from 'react-native';
import type { MoodId } from '../model/types';
import type { AppTheme } from '../../../shared/theme/themes';
import type { Dictionary } from '../../../shared/i18n';
import { SurfaceCard } from '../../../shared/ui/SurfaceCard';
import { SectionTitle } from '../../../shared/ui/SectionTitle';
import { MoodPicker } from './MoodPicker';
import { Button } from '../../../shared/ui/Button';
import { InfoPanel } from '../../../shared/ui/InfoPanel';
import { affirmationComposerCardStyles } from './styles/affirmationComposerCard.styles';

type Props = {
  theme: AppTheme;
  t: Dictionary;
  selectedMood: MoodId;
  onMoodChange: (mood: MoodId) => void;
  onGenerate: () => void;
  isGenerating: boolean;
  affirmationText: string;
  promptText: string;
};

export function AffirmationComposerCard({
  theme,
  t,
  selectedMood,
  onMoodChange,
  onGenerate,
  isGenerating,
  affirmationText,
  promptText,
}: Props) {
  return (
    <SurfaceCard theme={theme} style={affirmationComposerCardStyles.card}>
      <SectionTitle title={t.meditations.aiEyebrow} caption={t.meditations.aiTitle} theme={theme} />

      <MoodPicker
        value={selectedMood}
        onChange={onMoodChange}
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
        onPress={onGenerate}
        theme={theme}
        variant="soft"
        disabled={isGenerating}
        leftIcon="spa"
      />

      <InfoPanel theme={theme} title={t.meditations.aiResultEyebrow} icon={{ name: 'star', tone: 'accent' }}>
        <Text style={[affirmationComposerCardStyles.resultText, { color: theme.colors.text }]}> 
          {affirmationText || t.meditations.aiPlaceholder}
        </Text>
      </InfoPanel>

      {!!promptText && (
        <InfoPanel theme={theme} title={t.common.mockPrompt} icon={{ name: 'terminal', tone: 'muted' }} variant="subtle">
          <Text style={[affirmationComposerCardStyles.promptText, { color: theme.colors.textMuted }]}>{promptText}</Text>
        </InfoPanel>
      )}
    </SurfaceCard>
  );
}
