import React from 'react';
import { Animated, View } from 'react-native';
import type { AppTheme } from '../../../shared/theme/themes';
import { AppIcon } from '../../../shared/ui/AppIcon';
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

function resolveMoodColor(theme: AppTheme, mood: MoodId, isSelected: boolean) {
  if (mood === 'calm') {
    return isSelected ? theme.colors.primary : theme.colors.textMuted;
  }

  if (mood === 'stressed') {
    return isSelected ? theme.colors.accent : theme.colors.textMuted;
  }

  return isSelected ? theme.colors.text : theme.colors.textMuted;
}

export function MoodPicker({ value, onChange, labels, selectedLabel, theme }: Props) {
  return (
    <View style={moodPickerStyles.row}>
      {MOODS.map((mood) => {
        const isSelected = mood.id === value;
        const iconColor = resolveMoodColor(theme, mood.id, isSelected);

        return (
          <View key={mood.id} style={moodPickerStyles.cell}>
            <SelectableCard
              title={labels[mood.id]}
              theme={theme}
              onPress={() => onChange(mood.id)}
              isSelected={isSelected}
              statusText={isSelected ? selectedLabel : undefined}
              compact
              layout="tile"
              selectionStyle="inline"
            >
              {({ selectionProgress }) => (
                <Animated.View
                  style={[
                    moodPickerStyles.iconWrap,
                    {
                      backgroundColor: isSelected ? theme.colors.surface : theme.colors.surfaceSoft,
                      borderColor: isSelected ? theme.colors.primary : theme.colors.border,
                      transform: [
                        {
                          scale: selectionProgress.interpolate({
                            inputRange: [0, 1],
                            outputRange: [1, 1.08],
                          }),
                        },
                        {
                          rotate: selectionProgress.interpolate({
                            inputRange: [0, 1],
                            outputRange: ['0deg', '-4deg'],
                          }),
                        },
                      ],
                    },
                  ]}
                >
                  <AppIcon name={mood.icon} size={20} color={iconColor} />
                </Animated.View>
              )}
            </SelectableCard>
          </View>
        );
      })}
    </View>
  );
}
