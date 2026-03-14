export type ThemeMode = 'dark' | 'light';

export type AppTheme = {
  mode: ThemeMode;
  statusBar: 'light-content' | 'dark-content';
  colors: {
    bg: string;
    surface: string;
    surfaceAlt: string;
    text: string;
    textMuted: string;
    primary: string;
    primaryText: string;
    accent: string;
    border: string;
    success: string;
    successText: string;
    lockedOverlay: string;
  };
};

const darkTheme: AppTheme = {
  mode: 'dark',
  statusBar: 'light-content',
  colors: {
    bg: '#0B1020',
    surface: '#141B34',
    surfaceAlt: '#0F152B',
    text: '#FFFFFF',
    textMuted: '#B2BAD0',
    primary: '#CBB8FF',
    primaryText: '#0B1020',
    accent: '#F3D69B',
    border: 'rgba(255,255,255,0.08)',
    success: '#1D7D58',
    successText: '#ECFFF5',
    lockedOverlay: 'rgba(5,10,20,0.42)',
  },
};

const lightTheme: AppTheme = {
  mode: 'light',
  statusBar: 'dark-content',
  colors: {
    bg: '#F4F7FB',
    surface: '#FFFFFF',
    surfaceAlt: '#EDF2F7',
    text: '#131A2C',
    textMuted: '#5B6478',
    primary: '#6E56CF',
    primaryText: '#FFFFFF',
    accent: '#E2B85B',
    border: 'rgba(19,26,44,0.10)',
    success: '#1D7D58',
    successText: '#ECFFF5',
    lockedOverlay: 'rgba(19,26,44,0.20)',
  },
};

export function getTheme(mode: ThemeMode): AppTheme {
  return mode === 'light' ? lightTheme : darkTheme;
}
