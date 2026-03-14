import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppNavigator } from './navigation/AppNavigator';
import { AppProviders } from './providers/AppProviders';
import { useAppContext } from './state/AppContext';

function RootContent() {
  const { theme } = useAppContext();

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
