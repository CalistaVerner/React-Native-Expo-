import appRuntimeJson from '../../../assets/config/app-runtime.json';

export type AppRuntimeConfig = {
  appName: string;
  storageKey: string;
  defaultScreen: 'paywall' | 'meditations' | 'preferences' | 'player';
  moodGenerationDelayMs: number;
  player: {
    playbackTickMs: number;
    previousRestartThresholdSeconds: number;
  };
};

export const APP_CONFIG: AppRuntimeConfig = Object.freeze({
  appName: appRuntimeJson.appName,
  storageKey: appRuntimeJson.storageKey,
  defaultScreen: appRuntimeJson.defaultScreen as AppRuntimeConfig['defaultScreen'],
  moodGenerationDelayMs: appRuntimeJson.moodGenerationDelayMs,
  player: {
    playbackTickMs: appRuntimeJson.player.playbackTickMs,
    previousRestartThresholdSeconds: appRuntimeJson.player.previousRestartThresholdSeconds,
  },
});
