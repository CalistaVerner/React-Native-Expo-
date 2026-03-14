import React from 'react';
import { Pressable, Text, View } from 'react-native';
import type { AppTheme } from '../theme/themes';
import { buttonStyles } from './styles/button.styles';

type Props = {
  title: string;
  onPress: () => void;
  theme: AppTheme;
  variant?: 'primary' | 'secondary' | 'soft';
  disabled?: boolean;
  leftAdornment?: string;
};

export function Button({ title, onPress, theme, variant = 'primary', disabled = false, leftAdornment }: Props) {
  const isPrimary = variant === 'primary';
  const isSoft = variant === 'soft';

  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      style={({ pressed }) => [
        buttonStyles.button,
        isPrimary
          ? { backgroundColor: theme.colors.primary, shadowColor: theme.colors.shadow }
          : isSoft
            ? { backgroundColor: theme.colors.surfaceAlt, borderWidth: 1, borderColor: theme.colors.border }
            : { borderWidth: 1, borderColor: theme.colors.border, backgroundColor: 'transparent' },
        disabled && buttonStyles.disabled,
        pressed && !disabled && buttonStyles.pressed,
      ]}
    >
      <View style={buttonStyles.inline}>
        {leftAdornment ? (
          <Text style={[buttonStyles.adornment, { color: isPrimary ? theme.colors.primaryText : theme.colors.text }]}>
            {leftAdornment}
          </Text>
        ) : null}
        <Text style={[buttonStyles.text, { color: isPrimary ? theme.colors.primaryText : theme.colors.text }]}>{title}</Text>
      </View>
    </Pressable>
  );
}
