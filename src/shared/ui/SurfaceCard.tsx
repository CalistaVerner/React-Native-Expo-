import React from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import type { AppTheme } from '../theme/themes';
import { surfaceCardStyles } from './styles/surfaceCard.styles';

type Props = React.PropsWithChildren<{
  theme: AppTheme;
  variant?: 'default' | 'soft' | 'hero';
  style?: StyleProp<ViewStyle>;
}>;

export function SurfaceCard({ theme, variant = 'default', style, children }: Props) {
  const isHero = variant === 'hero';
  const isSoft = variant === 'soft';

  return (
    <View
      style={[
        surfaceCardStyles.base,
        isHero && surfaceCardStyles.hero,
        isSoft && surfaceCardStyles.soft,
        {
          backgroundColor: isSoft ? theme.colors.surfaceSoft : theme.colors.surface,
          borderColor: theme.colors.border,
          shadowColor: theme.colors.shadow,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}
