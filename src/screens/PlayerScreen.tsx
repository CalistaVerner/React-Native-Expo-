import React from 'react';
import { Image, Text, View } from 'react-native';
import { usePlayerScreenModel } from './models/usePlayerScreenModel';
import { AnimatedEntrance } from '../shared/ui/AnimatedEntrance';
import { Button } from '../shared/ui/Button';
import { Screen } from '../shared/ui/Screen';
import { SurfaceCard } from '../shared/ui/SurfaceCard';
import { PlayerProgressBar } from '../features/player/ui/PlayerProgressBar';
import { PlayerTransportControls } from '../features/player/ui/PlayerTransportControls';
import { playerStyles } from './styles/player.styles';

export default function PlayerScreen() {
  const { theme, t, player, progressLabel, remainingLabel } = usePlayerScreenModel();

  if (!player.currentTrack) {
    return (
      <Screen theme={theme}>
        <AnimatedEntrance delay={40}>
          <SurfaceCard theme={theme} style={playerStyles.emptyCard}>
            <Text style={[playerStyles.emptyTitle, { color: theme.colors.text }]}>{t.player.emptyTitle}</Text>
            <Text style={[playerStyles.emptyText, { color: theme.colors.textMuted }]}>{t.player.emptyText}</Text>
            <Button title={t.nav.backToMeditations} onPress={player.minimizePlayer} theme={theme} leftIcon="arrow-left" />
          </SurfaceCard>
        </AnimatedEntrance>
      </Screen>
    );
  }

  const currentTrack = player.currentTrack;
  const nextTrack = player.hasNext ? player.queue[player.currentIndex + 1] ?? null : null;

  return (
    <Screen theme={theme}>
      <AnimatedEntrance delay={40}>
        <View style={playerStyles.topActions}>
          <Button
            title={t.nav.backToMeditations}
            onPress={player.minimizePlayer}
            theme={theme}
            variant="secondary"
            leftIcon="arrow-left"
          />
          <Button
            title={t.player.close}
            onPress={player.closePlayer}
            theme={theme}
            variant="soft"
            leftIcon="xmark"
          />
        </View>
      </AnimatedEntrance>

      <AnimatedEntrance delay={100}>
        <SurfaceCard theme={theme} variant="hero" style={playerStyles.heroCard}>
          <Image source={{ uri: currentTrack.artworkUri }} style={playerStyles.artwork} resizeMode="cover" />

          <View style={playerStyles.statusChipRow}>
            <View style={[playerStyles.statusChip, { backgroundColor: theme.colors.surfaceSoft, borderColor: theme.colors.border }]}>
              <Text style={[playerStyles.statusChipText, { color: theme.colors.primary }]}>{t.player.nowPlayingEyebrow}</Text>
            </View>
            <View style={[playerStyles.statusChip, { backgroundColor: theme.colors.surfaceSoft, borderColor: theme.colors.border }]}>
              <Text style={[playerStyles.statusChipText, { color: theme.colors.textMuted }]}>{currentTrack.category}</Text>
            </View>
            <View style={[playerStyles.statusChip, { backgroundColor: theme.colors.surfaceSoft, borderColor: theme.colors.border }]}>
              <Text style={[playerStyles.statusChipText, { color: theme.colors.textMuted }]}>{currentTrack.durationLabel}</Text>
            </View>
          </View>

          <View style={playerStyles.root}>
            <Text style={[playerStyles.eyebrow, { color: theme.colors.primary }]}>{t.player.continueListening}</Text>
            <Text style={[playerStyles.title, { color: theme.colors.text }]}>{currentTrack.title}</Text>
            <Text style={[playerStyles.subtitle, { color: theme.colors.textMuted }]}>{currentTrack.subtitle}</Text>
          </View>
        </SurfaceCard>
      </AnimatedEntrance>

      <AnimatedEntrance delay={160}>
        <SurfaceCard theme={theme} style={playerStyles.transportCard}>
          <PlayerProgressBar
            theme={theme}
            progressRatio={player.progressRatio}
            elapsedLabel={progressLabel}
            remainingLabel={remainingLabel}
            onSeek={player.seekToRatio}
          />

          <View style={playerStyles.transportRow}>
            <PlayerTransportControls
              theme={theme}
              playbackState={player.playbackState}
              hasPrevious={player.hasPrevious}
              hasNext={player.hasNext}
              onPrevious={player.playPrevious}
              onSeekBackward={() => player.seekBy(-15)}
              onTogglePlayback={player.togglePlayback}
              onSeekForward={() => player.seekBy(15)}
              onNext={player.playNext}
            />
          </View>

          <Text style={[playerStyles.demoNote, { color: theme.colors.textSubtle }]}>{t.player.demoStatus}</Text>
        </SurfaceCard>
      </AnimatedEntrance>

      {nextTrack ? (
        <AnimatedEntrance delay={220}>
          <SurfaceCard theme={theme} variant="soft" style={playerStyles.queueCard}>
            <Text style={[playerStyles.queueEyebrow, { color: theme.colors.primary }]}>{t.player.upNext}</Text>
            <View style={playerStyles.queueItem}>
              <View style={playerStyles.queueTextWrap}>
                <Text style={[playerStyles.queueTitle, { color: theme.colors.text }]}>{nextTrack.title}</Text>
                <Text style={[playerStyles.queueSubtitle, { color: theme.colors.textMuted }]}>{nextTrack.subtitle}</Text>
              </View>
              <Button title={t.player.next} onPress={player.playNext} theme={theme} variant="secondary" leftIcon="forward-step" />
            </View>
          </SurfaceCard>
        </AnimatedEntrance>
      ) : null}
    </Screen>
  );
}
