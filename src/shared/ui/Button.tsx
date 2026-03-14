import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import type { AppTheme } from '../theme/themes';

type Props = {
  title: string;
  onPress: () => void;
  theme: AppTheme;
  variant?: 'primary' | 'secondary' | 'soft';
  disabled?: boolean;
  leftAdornment?: string;
  leftIconName?: React.ComponentProps<typeof FontAwesome5>['name'];
};

export function Button({
  title,
  onPress,
  theme,
  variant = 'primary',
  disabled = false,
  leftAdornment,
  leftIconName,
}: Props) {
  const isPrimary = variant === 'primary';
  const isSoft = variant === 'soft';
  const foregroundColor = isPrimary ? theme.colors.primaryText : theme.colors.text;

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
        {leftIconName ? (
          <FontAwesome5 name={leftIconName} size={15} color={foregroundColor} solid style={styles.icon} />
        ) : leftAdornment ? (
          <Text style={[styles.adornment, { color: foregroundColor }]}>{leftAdornment}</Text>
        ) : null}
        <Text style={[styles.text, { color: foregroundColor }]}>{title}</Text>
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
  icon: {
    width: 18,
    textAlign: 'center',
  },
  disabled: {
    opacity: 0.55,
  },
});
