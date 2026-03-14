import React from 'react';
import { Pressable, Text, View } from 'react-native';
import type { AppTheme } from '../theme/themes';
import { selectableCardStyles } from './styles/selectableCard.styles';

type Props = {
  title: string;
  theme: AppTheme;
  onPress: () => void;
  isSelected: boolean;
  description?: string;
  statusText?: string;
  badgeText?: string;
  accessoryText?: string;
  compact?: boolean;
  children?: React.ReactNode;
};

export function SelectableCard({
  title,
  theme,
  onPress,
  isSelected,
  description,
  statusText,
  badgeText,
  accessoryText,
  compact = false,
  children,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected: isSelected }}
      style={({ pressed }) => [
        selectableCardStyles.pressableBase,
        compact && selectableCardStyles.pressableCompact,
        {
          borderColor: isSelected ? theme.colors.primary : theme.colors.border,
          backgroundColor: isSelected ? theme.colors.surfaceSoft : theme.colors.surfaceAlt,
          shadowColor: isSelected ? theme.colors.primary : theme.colors.shadow,
        },
        isSelected && selectableCardStyles.pressableSelected,
        pressed && selectableCardStyles.pressablePressed,
      ]}
    >
      <View style={selectableCardStyles.content}>
        <View style={selectableCardStyles.header}>
          <View style={selectableCardStyles.titleWrap}>
            <Text style={[selectableCardStyles.title, { color: theme.colors.text }]}>{title}</Text>
            {description ? (
              <Text style={[selectableCardStyles.description, { color: theme.colors.textMuted }]}>{description}</Text>
            ) : null}
          </View>

          {badgeText ? (
            <Text
              style={[
                selectableCardStyles.badge,
                {
                  color: isSelected ? theme.colors.primaryText : theme.colors.text,
                  backgroundColor: isSelected ? theme.colors.primary : theme.colors.surface,
                },
              ]}
            >
              {badgeText}
            </Text>
          ) : null}
        </View>

        {children}

        {(statusText || accessoryText) ? (
          <View style={selectableCardStyles.footer}>
            {statusText ? (
              <View style={selectableCardStyles.statusWrap}>
                <View
                  style={[
                    selectableCardStyles.statusDot,
                    { backgroundColor: isSelected ? theme.colors.primary : theme.colors.textSubtle },
                  ]}
                />
                <Text
                  style={[
                    selectableCardStyles.statusText,
                    { color: isSelected ? theme.colors.primary : theme.colors.textSubtle },
                  ]}
                >
                  {statusText}
                </Text>
              </View>
            ) : (
              <View />
            )}

            {accessoryText ? (
              <Text style={[selectableCardStyles.accessory, { color: theme.colors.textMuted }]}>{accessoryText}</Text>
            ) : null}
          </View>
        ) : null}
      </View>
    </Pressable>
  );
}
