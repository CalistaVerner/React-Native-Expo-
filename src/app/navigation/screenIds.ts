export const SCREEN_IDS = {
  paywall: 'paywall',
  meditations: 'meditations',
  preferences: 'preferences',
  player: 'player',
} as const;

export type ScreenId = (typeof SCREEN_IDS)[keyof typeof SCREEN_IDS];
export type NonPlayerScreenId = Exclude<ScreenId, typeof SCREEN_IDS.player>;
