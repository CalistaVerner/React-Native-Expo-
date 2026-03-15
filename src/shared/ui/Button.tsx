import React from 'react';
import { Pressable, Text, View } from 'react-native';
import type { AppTheme } from '../theme/themes';
import { AppIcon, type AppIconName } from './AppIcon';
import { buttonStyles } from './styles/button.styles';

type Props = {
  title: string;
  onPress: () => void;
  theme: AppTheme;
  variant?: 'primary' | 'secondary' | 'soft';
  disabled?: boolean;
  leftAdornment?: string;
  leftIcon?: AppIconName;
};

export function Button({
  title,
  onPress,
  theme,
  variant = 'primary',
  disabled = false,
  leftAdornment,
  leftIcon,
}: Props) {
  const isPrimary = variant === 'primary';
  const isSoft = variant === 'soft';
  const textColor = isPrimary ? theme.colors.primaryText : theme.colors.text;

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
        {leftIcon ? <AppIcon name={leftIcon} size={15} color={textColor} /> : null}
        {leftAdornment ? <Text style={[buttonStyles.adornment, { color: textColor }]}>{leftAdornment}</Text> : null}
        <Text style={[buttonStyles.text, { color: textColor }]}>{title}</Text>
      </View>
    </Pressable>
  );
}
