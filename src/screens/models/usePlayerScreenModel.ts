import { useAppContext } from '../../app/state/AppContext';
import { usePlayer } from '../../features/player/PlayerProvider';
import { formatPlaybackTime } from '../../features/player/lib/formatPlayback';

export function usePlayerScreenModel() {
  const { theme, t } = useAppContext();
  const player = usePlayer();

  return {
    theme,
    t,
    player,
    progressLabel: formatPlaybackTime(player.progressSeconds),
    remainingLabel: `-${formatPlaybackTime(Math.max(0, player.durationSeconds - player.progressSeconds))}`,
    isPlaying: player.playbackState === 'playing',
  };
}
