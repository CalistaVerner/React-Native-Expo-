import React from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { AppTheme } from '../theme/themes';
import { screenStyles } from './styles/screen.styles';

export function Screen({ theme, children }: React.PropsWithChildren<{ theme: AppTheme }>) {
  return (
    <SafeAreaView style={[screenStyles.safeArea, { backgroundColor: theme.colors.bg }]} edges={['top', 'left', 'right', 'bottom']}>
      <ScrollView contentContainerStyle={screenStyles.content} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <View style={screenStyles.topSpacer} />
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}
