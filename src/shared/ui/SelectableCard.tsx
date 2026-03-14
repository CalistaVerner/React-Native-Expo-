import React from 'react';
import { Animated, Text, View } from 'react-native';
import type { AppTheme } from '../theme/themes';
import { AnimatedSelectableSurface } from './AnimatedSelectableSurface';
import { selectableCardStyles } from './styles/selectableCard.styles';

type AnimatedChildrenRenderState = {
  selectionProgress: Animated.Value;
  pressProgress: Animated.Value;
};

type SelectionStyle = 'inline' | 'corner' | 'both';
type SelectableCardLayout = 'default' | 'tile';

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
  selectionStyle?: SelectionStyle;
  layout?: SelectableCardLayout;
  children?: React.ReactNode | ((state: AnimatedChildrenRenderState) => React.ReactNode);
};

function resolveSelectionIndicator(selectionStyle: SelectionStyle | undefined, fallback: boolean) {
  if (selectionStyle === 'inline') return false;
  if (selectionStyle === 'corner' || selectionStyle === 'both') return true;
  return fallback;
}

function resolveStatusVisibility(selectionStyle: SelectionStyle | undefined, hasStatus: boolean) {
  if (!hasStatus) return false;
  return selectionStyle !== 'corner';
}

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
  selectionStyle,
  layout = 'default',
  children,
}: Props) {
  const isTile = layout === 'tile';
  const resolvedShowSelectionIndicator = resolveSelectionIndicator(selectionStyle, showSelectionIndicator);
  const resolvedShowStatus = resolveStatusVisibility(selectionStyle, Boolean(statusText || accessoryText));

  return (
    <AnimatedSelectableSurface
      theme={theme}
      onPress={onPress}
      isSelected={isSelected}
      borderRadius={compact ? 18 : 20}
      showSelectionIndicator={resolvedShowSelectionIndicator}
      style={[
        selectableCardStyles.pressableBase,
        compact && selectableCardStyles.pressableCompact,
        isTile && selectableCardStyles.pressableTile,
        {
          borderColor: isSelected ? theme.colors.primary : theme.colors.border,
          backgroundColor: isSelected ? theme.colors.surfaceSoft : theme.colors.surfaceAlt,
        },
      ]}
      selectedTintOpacity={theme.mode === 'dark' ? 0.1 : 0.08}
      selectedStyle={isSelected ? selectableCardStyles.pressableSelected : undefined}
    >
      {({ selectionProgress, pressProgress }) => (
        <View style={[selectableCardStyles.content, isTile && selectableCardStyles.contentTile]}>
          <View style={[selectableCardStyles.header, isTile && selectableCardStyles.headerTile]}>
            <View style={[
              selectableCardStyles.titleWrap,
              isTile && selectableCardStyles.titleWrapTile,
              resolvedShowSelectionIndicator && selectableCardStyles.titleWrapWithIndicator,
            ]}>
              <Text
                numberOfLines={isTile ? 2 : 3}
                style={[
                  selectableCardStyles.title,
                  isTile && selectableCardStyles.titleTile,
                  { color: theme.colors.text },
                ]}
              >
                {title}
              </Text>
              {description ? (
                <Text
                  numberOfLines={isTile ? 2 : 3}
                  style={[
                    selectableCardStyles.description,
                    isTile && selectableCardStyles.descriptionTile,
                    { color: theme.colors.textMuted },
                  ]}
                >
                  {description}
                </Text>
              ) : null}
            </View>

            {badgeText ? (
              <Animated.View
                style={[
                  selectableCardStyles.badgeWrap,
                  isTile && selectableCardStyles.badgeWrapTile,
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
              style={[
                selectableCardStyles.childrenWrap,
                isTile && selectableCardStyles.childrenWrapTile,
                {
                  transform: [
                    {
                      scale: selectionProgress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 1.02],
                      }),
                    },
                    {
                      translateY: pressProgress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 1],
                      }),
                    },
                  ],
                },
              ]}
            >
              {typeof children === 'function' ? children({ selectionProgress, pressProgress }) : children}
            </Animated.View>
          ) : null}

          {resolvedShowStatus ? (
            <View style={[selectableCardStyles.footer, isTile && selectableCardStyles.footerTile]}>
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
