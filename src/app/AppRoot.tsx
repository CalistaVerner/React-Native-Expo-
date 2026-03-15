import React from 'react';
import { ActivityIndicator, StatusBar, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppNavigator } from './navigation/AppNavigator';
import { AppProviders } from './providers/AppProviders';
import { useAppContext } from './state/AppContext';
import { usePlayer } from '../features/player/PlayerProvider';
import { MiniPlayer } from '../features/player/ui/MiniPlayer';
import { appRootStyles } from './styles/appRoot.styles';

function RootContent() {
  const { theme, isHydrated, t } = useAppContext();
  const player = usePlayer();

  if (!isHydrated) {
    return (
      <View style={[appRootStyles.loading, { backgroundColor: theme.colors.bg }]}> 
        <StatusBar barStyle={theme.statusBar} />
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={[appRootStyles.loadingText, { color: theme.colors.text }]}>{t.common.loading}</Text>
      </View>
    );
  }

  return (
    <>
      <StatusBar barStyle={theme.statusBar} />
      <AppNavigator />
      {player.hasTrack ? (
        <MiniPlayer
          theme={theme}
          openLabel={t.player.open}
          nowPlayingLabel={t.player.nowPlayingEyebrow}
        />
      ) : null}
    </>
  );
}

export default function AppRoot() {
  return (
    <SafeAreaProvider>
      <AppProviders>
        <RootContent />
      </AppProviders>
    </SafeAreaProvider>
  );
}
