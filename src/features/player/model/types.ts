export type PlayerTrack = {
  id: string;
  title: string;
  subtitle: string;
  durationLabel: string;
  durationSeconds: number;
  artworkUri: string;
  category: string;
};

export type PlaybackState = 'idle' | 'playing' | 'paused';
