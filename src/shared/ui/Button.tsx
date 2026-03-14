import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import type { AppTheme } from '../theme/themes';

type Props = {
  title: string;
  onPress: () => void;
  theme: AppTheme;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
};

export function Button({ title, onPress, theme, variant = 'primary', disabled = false }: Props) {
  const primary = variant === 'primary';

  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      style={[
        styles.button,
        primary
          ? { backgroundColor: theme.colors.primary }
          : { borderWidth: 1, borderColor: theme.colors.border, backgroundColor: 'transparent' },
        disabled && styles.disabled,
      ]}
    >
      <Text style={[styles.text, { color: primary ? theme.colors.primaryText : theme.colors.text }]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 56,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
  },
  text: {
    fontSize: 15,
    fontWeight: '800',
    textAlign: 'center',
  },
  disabled: {
    opacity: 0.55,
  },
});
