import React, { useState } from 'react';
import { Animated, Pressable, Text, View, type GestureResponderEvent, type LayoutChangeEvent } from 'react-native';
import type { AppTheme } from '../../../shared/theme/themes';
import { playerProgressBarStyles } from './styles/playerProgressBar.styles';

type Props = {
  theme: AppTheme;
  progressRatio: number;
  elapsedLabel: string;
  remainingLabel: string;
  onSeek: (ratio: number) => void;
};

export function PlayerProgressBar({
  theme,
  progressRatio,
  elapsedLabel,
  remainingLabel,
  onSeek,
}: Props) {
  const [trackWidth, setTrackWidth] = useState(0);
  const clampedRatio = Math.max(0, Math.min(1, progressRatio));

  const handleLayout = (event: LayoutChangeEvent) => {
    setTrackWidth(event.nativeEvent.layout.width);
  };

  const handlePress = (event: GestureResponderEvent) => {
    if (trackWidth <= 0) {
      return;
    }

    const ratio = event.nativeEvent.locationX / trackWidth;
    onSeek(ratio);
  };

  return (
    <View style={playerProgressBarStyles.root}>
      <Pressable onPress={handlePress} onLayout={handleLayout}>
        <View style={[playerProgressBarStyles.bar, { backgroundColor: theme.colors.surfaceSoft }]}> 
          <Animated.View
            style={[
              playerProgressBarStyles.fill,
              {
                width: `${clampedRatio * 100}%`,
                backgroundColor: theme.colors.primary,
              },
            ]}
          />
          <View
            style={[
              playerProgressBarStyles.thumb,
              {
                left: `${clampedRatio * 100}%`,
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.primary,
              },
            ]}
          />
        </View>
      </Pressable>

      <View style={playerProgressBarStyles.labels}>
        <Text style={[playerProgressBarStyles.label, { color: theme.colors.textMuted }]}>{elapsedLabel}</Text>
        <Text style={[playerProgressBarStyles.label, { color: theme.colors.textMuted }]}>{remainingLabel}</Text>
      </View>
    </View>
  );
}
