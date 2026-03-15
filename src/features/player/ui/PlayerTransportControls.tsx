import React from 'react';
import { Pressable } from 'react-native';
import { AppIcon } from '../../../shared/ui/AppIcon';
import type { AppTheme } from '../../../shared/theme/themes';
import type { PlaybackState } from '../model/types';
import { playerTransportControlsStyles } from './styles/playerTransportControls.styles';

type Props = {
  theme: AppTheme;
  playbackState: PlaybackState;
  hasPrevious: boolean;
  hasNext: boolean;
  onPrevious: () => void;
  onSeekBackward: () => void;
  onTogglePlayback: () => void;
  onSeekForward: () => void;
  onNext: () => void;
};

function ControlButton({
  onPress,
  icon,
  theme,
  disabled = false,
  primary = false,
}: {
  onPress: () => void;
  icon: React.ComponentProps<typeof AppIcon>['name'];
  theme: AppTheme;
  disabled?: boolean;
  primary?: boolean;
}) {
  const isPrimary = primary;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      style={({ pressed }) => [
        playerTransportControlsStyles.control,
        isPrimary && playerTransportControlsStyles.primaryControl,
        {
          backgroundColor: isPrimary ? theme.colors.primary : theme.colors.surfaceSoft,
          borderColor: isPrimary ? theme.colors.primary : theme.colors.border,
          opacity: disabled ? 0.45 : 1,
        },
        pressed && !disabled && playerTransportControlsStyles.controlPressed,
      ]}
    >
      <AppIcon
        name={icon}
        size={isPrimary ? 24 : 18}
        color={isPrimary ? theme.colors.primaryText : theme.colors.text}
      />
    </Pressable>
  );
}

export function PlayerTransportControls({
  theme,
  playbackState,
  hasPrevious,
  hasNext,
  onPrevious,
  onSeekBackward,
  onTogglePlayback,
  onSeekForward,
  onNext,
}: Props) {
  const isPlaying = playbackState === 'playing';

  return (
    <>
      <ControlButton onPress={onPrevious} icon="backward-step" theme={theme} disabled={!hasPrevious} />
      <ControlButton onPress={onSeekBackward} icon="rotate-left" theme={theme} />
      <ControlButton
        onPress={onTogglePlayback}
        icon={isPlaying ? 'pause' : 'play'}
        theme={theme}
        primary
      />
      <ControlButton onPress={onSeekForward} icon="rotate-right" theme={theme} />
      <ControlButton onPress={onNext} icon="forward-step" theme={theme} disabled={!hasNext} />
    </>
  );
}
