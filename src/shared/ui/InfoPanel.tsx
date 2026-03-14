import React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import type { AppTheme } from '../theme/themes';
import { AppIcon, type AppIconName } from './AppIcon';
import { infoPanelStyles } from './styles/infoPanel.styles';

type Props = React.PropsWithChildren<{
  theme: AppTheme;
  title: string;
  icon?: AppIconName;
  variant?: 'emphasis' | 'subtle';
  style?: StyleProp<ViewStyle>;
}>;

export function InfoPanel({ theme, title, icon, variant = 'emphasis', style, children }: Props) {
  const isSubtle = variant === 'subtle';
  const iconColor = isSubtle ? theme.colors.primary : theme.colors.accent;

  return (
    <View
      style={[
        infoPanelStyles.base,
        isSubtle ? infoPanelStyles.subtle : infoPanelStyles.emphasis,
        {
          backgroundColor: isSubtle ? theme.colors.surfaceAlt : theme.colors.surfaceSoft,
          borderColor: theme.colors.border,
          shadowColor: theme.colors.shadow,
        },
        style,
      ]}
    >
      <View style={infoPanelStyles.header}>
        {icon ? (
          <View
            style={[
              infoPanelStyles.iconWrap,
              {
                backgroundColor: isSubtle
                  ? theme.mode === 'dark'
                    ? 'rgba(205,186,255,0.12)'
                    : 'rgba(114,87,232,0.10)'
                  : theme.mode === 'dark'
                    ? 'rgba(244,214,148,0.14)'
                    : 'rgba(232,190,100,0.16)',
              },
            ]}
          >
            <AppIcon name={icon} size={13} color={iconColor} />
          </View>
        ) : null}
        <Text style={[infoPanelStyles.title, { color: isSubtle ? theme.colors.primary : theme.colors.text }]}>{title}</Text>
      </View>

      <View style={infoPanelStyles.body}>{children}</View>
    </View>
  );
}
