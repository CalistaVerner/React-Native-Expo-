import React from 'react';
import { Text, View } from 'react-native';
import type { AppTheme } from '../../../shared/theme/themes';
import { SelectableCard } from '../../../shared/ui/SelectableCard';
import { MOODS } from '../config/prompts';
import type { MoodId } from '../model/types';
import { moodPickerStyles } from './styles/moodPicker.styles';

type Props = {
  value: MoodId;
  onChange: (mood: MoodId) => void;
  labels: Record<MoodId, string>;
  selectedLabel: string;
  theme: AppTheme;
};

export function MoodPicker({ value, onChange, labels, selectedLabel, theme }: Props) {
  return (
    <View style={moodPickerStyles.row}>
      {MOODS.map((mood) => {
        const isSelected = mood.id === value;

        return (
          <SelectableCard
            key={mood.id}
            title={labels[mood.id]}
            theme={theme}
            onPress={() => onChange(mood.id)}
            isSelected={isSelected}
            statusText={isSelected ? selectedLabel : undefined}
            compact
          >
            <Text style={moodPickerStyles.emoji}>{mood.emoji}</Text>
          </SelectableCard>
        );
      })}
    </View>
  );
}
