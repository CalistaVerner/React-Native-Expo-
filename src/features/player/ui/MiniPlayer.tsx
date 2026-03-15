import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { boxShadow } from '../../../shared/ui/styles/effects';
import { AppIcon } from '../../../shared/ui/AppIcon';
import type { AppTheme } from '../../../shared/theme/themes';
import { usePlayer } from '../PlayerProvider';
import { formatPlaybackTime } from '../lib/formatPlayback';
import { PlayerProgressBar } from './PlayerProgressBar';
import { miniPlayerStyles } from './styles/miniPlayer.styles';

type Props = {
  theme: AppTheme;
  openLabel: string;
  nowPlayingLabel: string;
};

export function MiniPlayer({ theme, openLabel, nowPlayingLabel }: Props) {
  const insets = useSafeAreaInsets();
  const {
    currentTrack,
    playbackState,
    progressRatio,
    progressSeconds,
    durationSeconds,
    isMiniPlayerVisible,
    openFullscreen,
    togglePlayback,
    seekToRatio,
  } = usePlayer();

  if (!isMiniPlayerVisible || !currentTrack) {
    return null;
  }

  return (
    <View style={[miniPlayerStyles.root, { bottom: Math.max(insets.bottom, 14) + 8, pointerEvents: "box-none" as const }]}>
      <Pressable
        onPress={openFullscreen}
        style={[
          miniPlayerStyles.card,
          {
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.border,
            boxShadow: boxShadow(0, 16, 28, theme.colors.shadow),
          },
        ]}
      >
        <View style={miniPlayerStyles.row}>
          <Image source={{ uri: currentTrack.artworkUri }} style={miniPlayerStyles.artwork} resizeMode="cover" />

          <View style={miniPlayerStyles.textWrap}>
            <Text style={[miniPlayerStyles.eyebrow, { color: theme.colors.primary }]}>{nowPlayingLabel}</Text>
            <Text style={[miniPlayerStyles.title, { color: theme.colors.text }]} numberOfLines={1}>
              {currentTrack.title}
            </Text>
            <Text style={[miniPlayerStyles.subtitle, { color: theme.colors.textMuted }]} numberOfLines={1}>
              {openLabel} · {currentTrack.subtitle}
            </Text>
          </View>

          <View style={miniPlayerStyles.actionRow}>
            <Pressable
              onPress={(event) => {
                event.stopPropagation();
                togglePlayback();
              }}
              style={({ pressed }) => [
                miniPlayerStyles.action,
                {
                  backgroundColor: theme.colors.surfaceSoft,
                  borderColor: theme.colors.border,
                },
                pressed && miniPlayerStyles.actionPressed,
              ]}
            >
              <AppIcon
                name={playbackState === 'playing' ? 'pause' : 'play'}
                size={18}
                color={theme.colors.text}
              />
            </Pressable>
          </View>
        </View>

        <PlayerProgressBar
          theme={theme}
          progressRatio={progressRatio}
          elapsedLabel={formatPlaybackTime(progressSeconds)}
          remainingLabel={`-${formatPlaybackTime(Math.max(0, durationSeconds - progressSeconds))}`}
          onSeek={(ratio) => seekToRatio(ratio)}
        />
      </Pressable>
    </View>
  );
}
