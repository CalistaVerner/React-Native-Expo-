import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { AppTheme } from '../theme/themes';

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
      style={[
        styles.button,
        isPrimary
          ? { backgroundColor: theme.colors.primary, shadowColor: theme.colors.shadow }
          : isSoft
            ? { backgroundColor: theme.colors.surfaceAlt, borderWidth: 1, borderColor: theme.colors.border }
            : { borderWidth: 1, borderColor: theme.colors.border, backgroundColor: 'transparent' },
        disabled && styles.disabled,
      ]}
    >
      <View style={styles.inline}>
        {leftAdornment ? <Text style={[styles.adornment, { color: isPrimary ? theme.colors.primaryText : theme.colors.text }]}>{leftAdornment}</Text> : null}
        <Text style={[styles.text, { color: isPrimary ? theme.colors.primaryText : theme.colors.text }]}>{title}</Text>
      </View>
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
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 18,
    elevation: 2,
  },
  inline: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  text: {
    fontSize: 15,
    fontWeight: '800',
    textAlign: 'center',
  },
  adornment: {
    fontSize: 15,
  },
  disabled: {
    opacity: 0.55,
  },
});
