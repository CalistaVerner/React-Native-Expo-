import React from 'react';
import { Text, View } from 'react-native';
import type { AppTheme } from '../theme/themes';
import { pillStyles } from './styles/pill.styles';

type Props = {
  theme: AppTheme;
  title: string;
  tone?: 'default' | 'success';
};

export function Pill({ theme, title, tone = 'default' }: Props) {
  const isSuccess = tone === 'success';

  return (
    <View
      style={[
        pillStyles.base,
        {
          backgroundColor: isSuccess ? theme.colors.success : theme.colors.surfaceSoft,
          borderColor: isSuccess ? 'transparent' : theme.colors.border,
        },
      ]}
    >
      <Text style={[pillStyles.text, { color: isSuccess ? theme.colors.successText : theme.colors.text }]}>{title}</Text>
    </View>
  );
}
