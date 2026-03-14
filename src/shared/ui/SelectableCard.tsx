import React from 'react';
import { Animated, Text, View } from 'react-native';
import type { AppTheme } from '../theme/themes';
import { AnimatedSelectableSurface } from './AnimatedSelectableSurface';
import { selectableCardStyles } from './styles/selectableCard.styles';

type AnimatedChildrenRenderState = {
  selectionProgress: Animated.Value;
  pressProgress: Animated.Value;
};

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
  showSelectionIndicator?: boolean;
  children?: React.ReactNode | ((state: AnimatedChildrenRenderState) => React.ReactNode);
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
  showSelectionIndicator = false,
  children,
}: Props) {
  return (
    <AnimatedSelectableSurface
      theme={theme}
      onPress={onPress}
      isSelected={isSelected}
      borderRadius={compact ? 18 : 20}
      showSelectionIndicator={showSelectionIndicator}
      style={[
        selectableCardStyles.pressableBase,
        compact && selectableCardStyles.pressableCompact,
        {
          borderColor: isSelected ? theme.colors.primary : theme.colors.border,
          backgroundColor: isSelected ? theme.colors.surfaceSoft : theme.colors.surfaceAlt,
        },
      ]}
      selectedTintOpacity={theme.mode === 'dark' ? 0.1 : 0.08}
      selectedStyle={isSelected ? selectableCardStyles.pressableSelected : undefined}
    >
      {({ selectionProgress, pressProgress }) => (
        <View style={selectableCardStyles.content}>
          <View style={selectableCardStyles.header}>
            <View style={selectableCardStyles.titleWrap}>
              <Text style={[selectableCardStyles.title, { color: theme.colors.text }]}>{title}</Text>
              {description ? (
                <Text style={[selectableCardStyles.description, { color: theme.colors.textMuted }]}>{description}</Text>
              ) : null}
            </View>

            {badgeText ? (
              <Animated.View
                style={[
                  selectableCardStyles.badgeWrap,
                  {
                    transform: [
                      {
                        scale: selectionProgress.interpolate({
                          inputRange: [0, 1],
                          outputRange: [1, 1.04],
                        }),
                      },
                    ],
                  },
                ]}
              >
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
              </Animated.View>
            ) : null}
          </View>

          {children ? (
            <Animated.View
              style={{
                transform: [
                  {
                    scale: selectionProgress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 1.02],
                    }),
                  },
                ],
              }}
            >
              {typeof children === 'function' ? children({ selectionProgress, pressProgress }) : children}
            </Animated.View>
          ) : null}

          {(statusText || accessoryText) ? (
            <View style={selectableCardStyles.footer}>
              {statusText ? (
                <View style={selectableCardStyles.statusWrap}>
                  <Animated.View
                    style={[
                      selectableCardStyles.statusDot,
                      {
                        backgroundColor: isSelected ? theme.colors.primary : theme.colors.textSubtle,
                        transform: [
                          {
                            scale: selectionProgress.interpolate({
                              inputRange: [0, 1],
                              outputRange: [1, 1.18],
                            }),
                          },
                        ],
                      },
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
      )}
    </AnimatedSelectableSurface>
  );
}
