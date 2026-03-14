import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { AppTheme } from '../theme/themes';

export function Screen({ theme, children }: React.PropsWithChildren<{ theme: AppTheme }>) {
  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.bg }]} edges={['top', 'left', 'right', 'bottom']}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <View style={styles.topSpacer} />
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 32,
    gap: 18,
  },
  topSpacer: {
    height: 4,
  },
});
