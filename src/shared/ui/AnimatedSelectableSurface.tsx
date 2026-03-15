import React, { useEffect, useMemo, useRef } from 'react';
import {
  Animated,
  Pressable,
  type AccessibilityRole,
  type AccessibilityState,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { SHOULD_USE_NATIVE_DRIVER } from '../lib/animation';
import type { AppTheme } from '../theme/themes';
import { animatedSelectableSurfaceStyles } from './styles/animatedSelectableSurface.styles';
import { boxShadow } from './styles/effects';

type RenderState = {
  selectionProgress: Animated.Value;
  pressProgress: Animated.Value;
};

type ChildrenProp = React.ReactNode | ((state: RenderState) => React.ReactNode);

type Props = {
  theme: AppTheme;
  isSelected: boolean;
  onPress: () => void;
  children: ChildrenProp;
  style?: StyleProp<ViewStyle>;
  selectedStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
  accessibilityRole?: AccessibilityRole;
  accessibilityState?: AccessibilityState;
  showSelectionIndicator?: boolean;
  indicatorText?: string;
  selectedTintColor?: string;
  selectedTintOpacity?: number;
  pressedScale?: number;
  liftDistance?: number;
  borderRadius?: number;
};

export function AnimatedSelectableSurface({
  theme,
  isSelected,
  onPress,
  children,
  style,
  selectedStyle,
  disabled = false,
  accessibilityRole = 'button',
  accessibilityState,
  showSelectionIndicator = false,
  indicatorText = '✓',
  selectedTintColor,
  selectedTintOpacity = 0.16,
  pressedScale = 0.987,
  liftDistance = 3,
  borderRadius = 20,
}: Props) {
  const selectionProgress = useRef(new Animated.Value(isSelected ? 1 : 0)).current;
  const pressProgress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.spring(selectionProgress, {
      toValue: isSelected ? 1 : 0,
      friction: 8,
      tension: 110,
      useNativeDriver: SHOULD_USE_NATIVE_DRIVER,
    });

    animation.start();

    return () => {
      animation.stop();
    };
  }, [isSelected, selectionProgress]);

  const handlePressIn = () => {
    Animated.spring(pressProgress, {
      toValue: 1,
      friction: 10,
      tension: 220,
      useNativeDriver: SHOULD_USE_NATIVE_DRIVER,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(pressProgress, {
      toValue: 0,
      friction: 10,
      tension: 220,
      useNativeDriver: SHOULD_USE_NATIVE_DRIVER,
    }).start();
  };

  const renderState = useMemo(
    () => ({ selectionProgress, pressProgress }),
    [pressProgress, selectionProgress],
  );

  const content = typeof children === 'function' ? children(renderState) : children;

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      accessibilityRole={accessibilityRole}
      accessibilityState={{ disabled, selected: isSelected, ...accessibilityState }}
    >
      <Animated.View
        style={[
          style,
          {
            boxShadow: boxShadow(0, isSelected ? 14 : 8, isSelected ? 24 : 16, theme.colors.shadow),
            elevation: isSelected ? 6 : 2,
            transform: [
              {
                translateY: Animated.add(
                  selectionProgress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -liftDistance],
                  }),
                  pressProgress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1.2],
                  }),
                ),
              },
              {
                scale: pressProgress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, pressedScale],
                }),
              },
            ],
          },
          selectedStyle,
        ]}
      >
        <Animated.View
          style={[
            animatedSelectableSurfaceStyles.tintLayer,
            { pointerEvents: 'none' as const },
            {
              borderRadius,
              backgroundColor: selectedTintColor ?? theme.colors.primary,
              opacity: selectionProgress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, selectedTintOpacity],
              }),
              transform: [
                {
                  scale: selectionProgress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.94, 1],
                  }),
                },
              ],
            },
          ]}
        />

        <Animated.View
          style={[
            animatedSelectableSurfaceStyles.ring,
            { pointerEvents: 'none' as const },
            {
              borderRadius,
              borderColor: theme.colors.primary,
              opacity: selectionProgress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.95],
              }),
              transform: [
                {
                  scale: selectionProgress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.96, 1],
                  }),
                },
              ],
            },
          ]}
        />

        {showSelectionIndicator ? (
          <Animated.View
            style={[
              animatedSelectableSurfaceStyles.indicator,
              { pointerEvents: 'none' as const },
              {
                backgroundColor: theme.colors.primary,
                opacity: selectionProgress,
                transform: [
                  {
                    scale: selectionProgress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.72, 1],
                    }),
                  },
                ],
              },
            ]}
          >
            <Animated.Text
              style={[
                animatedSelectableSurfaceStyles.indicatorText,
                {
                  color: theme.colors.primaryText,
                  opacity: selectionProgress.interpolate({
                    inputRange: [0, 0.6, 1],
                    outputRange: [0, 0.4, 1],
                  }),
                },
              ]}
            >
              {indicatorText}
            </Animated.Text>
          </Animated.View>
        ) : null}

        {content}
      </Animated.View>
    </Pressable>
  );
}
