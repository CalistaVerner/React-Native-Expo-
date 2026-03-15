import React from 'react';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import type { AppTheme } from '../theme/themes';

export type AppIconName = React.ComponentProps<typeof FontAwesome6>['name'];
export type AppIconFamily = 'fa6';
export type AppIconVariant = 'solid' | 'regular' | 'brands';
export type AppIconTone = 'primary' | 'accent' | 'success' | 'muted' | 'warning' | 'default';

export type AppIconSpec = {
  family?: AppIconFamily;
  name: AppIconName;
  variant?: AppIconVariant;
  tone?: AppIconTone;
  badgeLabel?: string;
};

type Props = {
  name: AppIconName;
  size?: number;
  color: string;
  variant?: AppIconVariant;
};

export function resolveIconColor(theme: AppTheme, tone: AppIconTone = 'default') {
  switch (tone) {
    case 'primary':
      return theme.colors.primary;
    case 'accent':
      return theme.colors.accent;
    case 'success':
      return theme.colors.success;
    case 'muted':
      return theme.colors.textMuted;
    case 'warning':
      return theme.colors.warning;
    default:
      return theme.colors.text;
  }
}

export function AppIcon({ name, size = 16, color, variant = 'solid' }: Props) {
  return <FontAwesome6 name={name} size={size} color={color} iconStyle={variant} />;
}

export function AppIconView({
  icon,
  theme,
  size = 18,
  color,
}: {
  icon: AppIconSpec;
  theme: AppTheme;
  size?: number;
  color?: string;
}) {
  return (
    <AppIcon
      name={icon.name}
      size={size}
      color={color ?? resolveIconColor(theme, icon.tone)}
      variant={icon.variant}
    />
  );
}
