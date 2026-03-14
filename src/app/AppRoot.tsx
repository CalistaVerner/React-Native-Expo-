import React from 'react';
import { ActivityIndicator, StatusBar, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppNavigator } from './navigation/AppNavigator';
import { AppProviders } from './providers/AppProviders';
import { useAppContext } from './state/AppContext';
import { appRootStyles } from './styles/appRoot.styles';

function RootContent() {
  const { theme, isHydrated, t } = useAppContext();

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
