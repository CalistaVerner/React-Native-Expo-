import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useAppContext } from '../../app/state/AppContext';
import { createLogger } from '../../shared/lib/logger';
import type { PlaybackState, PlayerTrack } from './model/types';

const logger = createLogger('player:runtime');
const PLAYBACK_TICK_MS = 1000;
const PREVIOUS_RESTART_THRESHOLD_SECONDS = 4;

type OpenTrackOptions = {
  openScreen?: boolean;
};

type PlayerContextValue = {
  currentTrack: PlayerTrack | null;
  queue: PlayerTrack[];
  currentIndex: number;
  playbackState: PlaybackState;
  progressSeconds: number;
  durationSeconds: number;
  progressRatio: number;
  hasTrack: boolean;
  hasNext: boolean;
  hasPrevious: boolean;
  isMiniPlayerVisible: boolean;
  openTrack: (track: PlayerTrack, queue?: PlayerTrack[], options?: OpenTrackOptions) => void;
  openFullscreen: () => void;
  minimizePlayer: () => void;
  closePlayer: () => void;
  togglePlayback: () => void;
  play: () => void;
  pause: () => void;
  seekToRatio: (ratio: number) => void;
  seekBy: (deltaSeconds: number) => void;
  playNext: () => void;
  playPrevious: () => void;
};

const PlayerContext = createContext<PlayerContextValue | null>(null);

export function PlayerProvider({ children }: React.PropsWithChildren) {
  const { screen, setScreen } = useAppContext();
  const [queue, setQueue] = useState<PlayerTrack[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [playbackState, setPlaybackState] = useState<PlaybackState>('idle');
  const [progressSeconds, setProgressSeconds] = useState(0);
  const lastScreenRef = useRef<'paywall' | 'meditations' | 'preferences'>('meditations');

  useEffect(() => {
    if (screen !== 'player') {
      lastScreenRef.current = screen;
    }
  }, [screen]);

  const currentTrack = currentIndex >= 0 ? queue[currentIndex] ?? null : null;
  const durationSeconds = currentTrack?.durationSeconds ?? 0;
  const progressRatio = durationSeconds > 0 ? Math.min(1, progressSeconds / durationSeconds) : 0;
  const hasTrack = Boolean(currentTrack);
  const hasNext = currentIndex >= 0 && currentIndex < queue.length - 1;
  const hasPrevious = currentIndex > 0;
  const isMiniPlayerVisible = hasTrack && screen !== 'player';

  const playIndex = useCallback((index: number) => {
    setCurrentIndex((current) => {
      if (index < 0 || index >= queue.length) {
        return current;
      }

      const nextTrack = queue[index];
      logger.info('Switched queue track', {
        trackId: nextTrack.id,
        title: nextTrack.title,
        index,
      });
      return index;
    });
    setProgressSeconds(0);
    setPlaybackState('playing');
  }, [queue]);

  useEffect(() => {
    if (!currentTrack || playbackState !== 'playing') {
      return;
    }

    const interval = setInterval(() => {
      setProgressSeconds((current) => {
        const nextProgress = Math.min(current + 1, durationSeconds);

        if (nextProgress < durationSeconds) {
          return nextProgress;
        }

        if (currentIndex < queue.length - 1) {
          const nextTrack = queue[currentIndex + 1];
          logger.info('Track finished, advancing queue', {
            finishedTrackId: currentTrack.id,
            nextTrackId: nextTrack.id,
          });
          setCurrentIndex(currentIndex + 1);
          return 0;
        }

        logger.info('Reached end of queue', {
          trackId: currentTrack.id,
          title: currentTrack.title,
        });
        setPlaybackState('paused');
        return durationSeconds;
      });
    }, PLAYBACK_TICK_MS);

    return () => {
      clearInterval(interval);
    };
  }, [currentIndex, currentTrack, durationSeconds, playbackState, queue]);

  const openTrack = useCallback((track: PlayerTrack, nextQueue?: PlayerTrack[], options?: OpenTrackOptions) => {
    const normalizedQueue = nextQueue?.length ? nextQueue : [track];
    const resolvedIndex = Math.max(0, normalizedQueue.findIndex((item) => item.id === track.id));

    setQueue(normalizedQueue);
    setCurrentIndex(resolvedIndex);
    setProgressSeconds(0);
    setPlaybackState('playing');

    logger.info('Opened track', {
      trackId: track.id,
      title: track.title,
      queueSize: normalizedQueue.length,
      resolvedIndex,
    });

    if (options?.openScreen !== false) {
      setScreen('player');
    }
  }, [setScreen]);

  const openFullscreen = useCallback(() => {
    if (!currentTrack) {
      return;
    }

    logger.info('Opened fullscreen player', {
      trackId: currentTrack.id,
      title: currentTrack.title,
    });
    setScreen('player');
  }, [currentTrack, setScreen]);

  const minimizePlayer = useCallback(() => {
    logger.info('Minimized player', {
      currentTrackId: currentTrack?.id,
      title: currentTrack?.title,
      targetScreen: lastScreenRef.current,
    });
    setScreen(lastScreenRef.current);
  }, [currentTrack, setScreen]);

  const closePlayer = useCallback(() => {
    logger.info('Closed player', {
      currentTrackId: currentTrack?.id,
      title: currentTrack?.title,
    });
    setQueue([]);
    setCurrentIndex(-1);
    setProgressSeconds(0);
    setPlaybackState('idle');
    setScreen('meditations');
  }, [currentTrack, setScreen]);

  const play = useCallback(() => {
    if (!currentTrack) {
      return;
    }

    logger.info('Playback resumed', { trackId: currentTrack.id, title: currentTrack.title });
    if (progressSeconds >= durationSeconds && durationSeconds > 0) {
      setProgressSeconds(0);
    }
    setPlaybackState('playing');
  }, [currentTrack, durationSeconds, progressSeconds]);

  const pause = useCallback(() => {
    if (!currentTrack) {
      return;
    }

    logger.info('Playback paused', { trackId: currentTrack.id, title: currentTrack.title });
    setPlaybackState('paused');
  }, [currentTrack]);

  const togglePlayback = useCallback(() => {
    if (!currentTrack) {
      return;
    }

    if (playbackState === 'playing') {
      pause();
      return;
    }

    play();
  }, [currentTrack, pause, play, playbackState]);

  const seekToRatio = useCallback((ratio: number) => {
    if (!currentTrack || durationSeconds <= 0) {
      return;
    }

    const normalizedRatio = Math.max(0, Math.min(1, ratio));
    const nextProgress = Math.round(durationSeconds * normalizedRatio);
    logger.info('Seeked playback by ratio', {
      trackId: currentTrack.id,
      title: currentTrack.title,
      ratio: normalizedRatio,
      nextProgress,
    });
    setProgressSeconds(nextProgress);
  }, [currentTrack, durationSeconds]);

  const seekBy = useCallback((deltaSeconds: number) => {
    if (!currentTrack || durationSeconds <= 0) {
      return;
    }

    setProgressSeconds((current) => {
      const nextProgress = Math.max(0, Math.min(durationSeconds, current + deltaSeconds));
      logger.info('Seeked playback by delta', {
        trackId: currentTrack.id,
        title: currentTrack.title,
        deltaSeconds,
        nextProgress,
      });
      return nextProgress;
    });
  }, [currentTrack, durationSeconds]);

  const playNext = useCallback(() => {
    if (!hasNext) {
      return;
    }

    playIndex(currentIndex + 1);
  }, [currentIndex, hasNext, playIndex]);

  const playPrevious = useCallback(() => {
    if (!currentTrack) {
      return;
    }

    if (progressSeconds > PREVIOUS_RESTART_THRESHOLD_SECONDS) {
      logger.info('Restarted current track from previous control', {
        trackId: currentTrack.id,
        title: currentTrack.title,
      });
      setProgressSeconds(0);
      return;
    }

    if (!hasPrevious) {
      setProgressSeconds(0);
      return;
    }

    playIndex(currentIndex - 1);
  }, [currentIndex, currentTrack, hasPrevious, playIndex, progressSeconds]);

  const value = useMemo<PlayerContextValue>(() => ({
    currentTrack,
    queue,
    currentIndex,
    playbackState,
    progressSeconds,
    durationSeconds,
    progressRatio,
    hasTrack,
    hasNext,
    hasPrevious,
    isMiniPlayerVisible,
    openTrack,
    openFullscreen,
    minimizePlayer,
    closePlayer,
    togglePlayback,
    play,
    pause,
    seekToRatio,
    seekBy,
    playNext,
    playPrevious,
  }), [
    closePlayer,
    currentIndex,
    currentTrack,
    durationSeconds,
    hasNext,
    hasPrevious,
    hasTrack,
    isMiniPlayerVisible,
    minimizePlayer,
    openFullscreen,
    openTrack,
    pause,
    play,
    playNext,
    playPrevious,
    playbackState,
    progressRatio,
    progressSeconds,
    queue,
    seekBy,
    seekToRatio,
    togglePlayback,
  ]);

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
}

export function usePlayer() {
  const context = useContext(PlayerContext);

  if (!context) {
    throw new Error('usePlayer must be used inside PlayerProvider');
  }

  return context;
}
