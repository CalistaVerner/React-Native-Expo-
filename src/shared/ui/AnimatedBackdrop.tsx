import React, { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';
import { SHOULD_USE_NATIVE_DRIVER } from '../lib/animation';
import type { AppTheme } from '../theme/themes';
import { animatedBackdropStyles } from './styles/animatedBackdrop.styles';

type Props = {
  theme: AppTheme;
};

function useLoopingProgress(duration: number) {
  const value = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(value, { toValue: 1, duration, useNativeDriver: SHOULD_USE_NATIVE_DRIVER }),
        Animated.timing(value, { toValue: 0, duration, useNativeDriver: SHOULD_USE_NATIVE_DRIVER }),
      ])
    );

    loop.start();

    return () => {
      loop.stop();
    };
  }, [duration, value]);

  return value;
}

export function AnimatedBackdrop({ theme }: Props) {
  const slowFloat = useLoopingProgress(5200);
  const fastFloat = useLoopingProgress(4200);

  return (
    <View style={[animatedBackdropStyles.container, { pointerEvents: 'none' as const }]}>
      <Animated.View
        style={[
          animatedBackdropStyles.orb,
          animatedBackdropStyles.topOrb,
          {
            backgroundColor: theme.mode === 'dark' ? 'rgba(205,186,255,0.16)' : 'rgba(114,87,232,0.11)',
            transform: [
              {
                translateY: slowFloat.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -18],
                }),
              },
              {
                translateX: slowFloat.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 12],
                }),
              },
              {
                scale: slowFloat.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 1.08],
                }),
              },
            ],
          },
        ]}
      />

      <Animated.View
        style={[
          animatedBackdropStyles.orb,
          animatedBackdropStyles.bottomOrb,
          {
            backgroundColor: theme.mode === 'dark' ? 'rgba(244,214,148,0.12)' : 'rgba(232,190,100,0.12)',
            transform: [
              {
                translateY: fastFloat.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 14],
                }),
              },
              {
                translateX: fastFloat.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -10],
                }),
              },
              {
                scale: fastFloat.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 1.12],
                }),
              },
            ],
          },
        ]}
      />
    </View>
  );
}
