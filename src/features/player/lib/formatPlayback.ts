export function parseDurationLabelToSeconds(label: string) {
  const normalized = label.trim().toLowerCase();
  const match = normalized.match(/(\d+)\s*(min|m|sec|s)/);

  if (!match) {
    return 0;
  }

  const value = Number(match[1]);
  const unit = match[2];

  if (unit === 'sec' || unit === 's') {
    return value;
  }

  return value * 60;
}

export function formatPlaybackTime(totalSeconds: number) {
  const clamped = Math.max(0, Math.floor(totalSeconds));
  const minutes = Math.floor(clamped / 60);
  const seconds = clamped % 60;

  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}
