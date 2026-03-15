import React from 'react';
import { Animated, View } from 'react-native';
import type { AppTheme } from '../../../shared/theme/themes';
import { SelectableCard } from '../../../shared/ui/SelectableCard';
import { AppIconView } from '../../../shared/ui/AppIcon';
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
                    moodPickerStyles.emoji,
                    {
                      transform: [
                        {
                          scale: selectionProgress.interpolate({
                            inputRange: [0, 1],
                            outputRange: [1, 1.12],
                          }),
                        },
                        {
                          rotate: selectionProgress.interpolate({
                            inputRange: [0, 1],
                            outputRange: ['0deg', '-6deg'],
                          }),
                        },
                      ],
                    },
                  ]}
                >
                  <AppIconView icon={mood.icon} theme={theme} size={28} />
                </Animated.View>
              )}
            </SelectableCard>
          </View>
        );
      })}
    </View>
  );
}
