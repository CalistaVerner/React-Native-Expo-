export type ThemeMode = 'dark' | 'light';
export type ThemePreference = 'system' | ThemeMode;

export type AppTheme = {
  mode: ThemeMode;
  statusBar: 'light-content' | 'dark-content';
  colors: {
    bg: string;
    surface: string;
    surfaceAlt: string;
    surfaceSoft: string;
    text: string;
    textMuted: string;
    textSubtle: string;
    primary: string;
    primaryText: string;
    accent: string;
    border: string;
    success: string;
    successText: string;
    warning: string;
    shadow: string;
    lockedOverlay: string;
  };
};

const darkTheme: AppTheme = {
  mode: 'dark',
  statusBar: 'light-content',
  colors: {
    bg: '#0A1020',
    surface: '#131B32',
    surfaceAlt: '#10182C',
    surfaceSoft: '#19233F',
    text: '#FFFFFF',
    textMuted: '#B3BDD6',
    textSubtle: '#8B96B2',
    primary: '#CDBAFF',
    primaryText: '#0A1020',
    accent: '#F4D694',
    border: 'rgba(255,255,255,0.08)',
    success: '#1E7F5D',
    successText: '#EEFFF8',
    warning: '#F7C66B',
    shadow: 'rgba(0,0,0,0.26)',
    lockedOverlay: 'rgba(6,10,18,0.48)'
  }
};

const lightTheme: AppTheme = {
  mode: 'light',
  statusBar: 'dark-content',
  colors: {
    bg: '#F3F6FB',
    surface: '#FFFFFF',
    surfaceAlt: '#EDF3FB',
    surfaceSoft: '#E8EFFA',
    text: '#152038',
    textMuted: '#5C6882',
    textSubtle: '#77829C',
    primary: '#7257E8',
    primaryText: '#FFFFFF',
    accent: '#E8BE64',
    border: 'rgba(21,32,56,0.09)',
    success: '#1E7F5D',
    successText: '#EEFFF8',
    warning: '#D6A13A',
    shadow: 'rgba(18,24,36,0.10)',
    lockedOverlay: 'rgba(21,32,56,0.18)'
  }
};

export function getTheme(mode: ThemeMode): AppTheme {
  return mode === 'light' ? lightTheme : darkTheme;
}

export function resolveThemeMode(preference: ThemePreference, systemScheme: string | null | undefined): ThemeMode {
  if (preference === 'dark' || preference === 'light') {
    return preference;
  }

  return systemScheme === 'light' ? 'light' : 'dark';
}
