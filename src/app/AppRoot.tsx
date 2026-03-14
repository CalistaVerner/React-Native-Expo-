import React from 'react';
import { ActivityIndicator, StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppNavigator } from './navigation/AppNavigator';
import { AppProviders } from './providers/AppProviders';
import { useAppContext } from './state/AppContext';

function RootContent() {
  const { theme, isHydrated, t } = useAppContext();

  if (!isHydrated) {
    return (
      <View style={[styles.loading, { backgroundColor: theme.colors.bg }]}> 
        <StatusBar barStyle={theme.statusBar} />
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={[styles.loadingText, { color: theme.colors.text }]}>{t.common.loading}</Text>
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

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    paddingHorizontal: 24,
  },
  loadingText: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
});
