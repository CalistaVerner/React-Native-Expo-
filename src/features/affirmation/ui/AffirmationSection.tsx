import React from 'react';
import { Text, View } from 'react-native';
import type { MoodId } from '../model/types';
import type { AppTheme } from '../../../shared/theme/themes';
import type { Dictionary } from '../../../shared/i18n';
import { SurfaceCard } from '../../../shared/ui/SurfaceCard';
import { Button } from '../../../shared/ui/Button';
import { MoodPicker } from './MoodPicker';
import { SectionHeader } from '../../../shared/ui/SectionHeader';
import { affirmationSectionStyles } from './styles/affirmationSection.styles';

type Props = {
  theme: AppTheme;
  t: Dictionary;
  selectedMood: MoodId;
  onChangeMood: (mood: MoodId) => void;
  onGenerate: () => void;
  isGenerating: boolean;
  affirmationText: string;
  lastPrompt: string;
  showPromptPreview?: boolean;
};

export function AffirmationSection({
  theme,
  t,
  selectedMood,
  onChangeMood,
  onGenerate,
  isGenerating,
  affirmationText,
  lastPrompt,
  showPromptPreview = true,
}: Props) {
  return (
    <SurfaceCard theme={theme} style={affirmationSectionStyles.card}>
      <SectionHeader
        theme={theme}
        eyebrow={t.meditations.aiEyebrow}
        title={t.meditations.aiTitle}
        caption={t.meditations.aiDescription}
      />

      <MoodPicker
        value={selectedMood}
        onChange={onChangeMood}
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
        leftIcon="star"
      />

      <View style={affirmationSectionStyles.panelStack}>
        <View style={[affirmationSectionStyles.resultPanel, { backgroundColor: theme.colors.surfaceSoft }]}> 
          <Text style={[affirmationSectionStyles.resultEyebrow, { color: theme.colors.primary }]}>{t.meditations.aiResultEyebrow}</Text>
          <Text style={[affirmationSectionStyles.resultText, { color: theme.colors.text }]}> 
            {affirmationText || t.meditations.aiPlaceholder}
          </Text>
        </View>

        {showPromptPreview && !!lastPrompt ? (
          <View style={[affirmationSectionStyles.promptPanel, { backgroundColor: theme.colors.surfaceAlt, borderColor: theme.colors.border }]}> 
            <Text style={[affirmationSectionStyles.promptEyebrow, { color: theme.colors.textSubtle }]}>{t.common.mockPrompt}</Text>
            <Text style={[affirmationSectionStyles.promptText, { color: theme.colors.textMuted }]}>{lastPrompt}</Text>
          </View>
        ) : null}
      </View>
    </SurfaceCard>
  );
}
