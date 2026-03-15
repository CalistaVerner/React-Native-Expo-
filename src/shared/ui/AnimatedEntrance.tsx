import React, { useEffect, useRef } from 'react';
import { Animated, type StyleProp, type ViewStyle } from 'react-native';
import { SHOULD_USE_NATIVE_DRIVER } from '../lib/animation';

type Props = React.PropsWithChildren<{
  delay?: number;
  duration?: number;
  offset?: number;
  style?: StyleProp<ViewStyle>;
}>;

export function AnimatedEntrance({
  children,
  delay = 0,
  duration = 460,
  offset = 18,
  style,
}: Props) {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.timing(progress, {
      toValue: 1,
      duration,
      delay,
      useNativeDriver: SHOULD_USE_NATIVE_DRIVER,
    });

    animation.start();

    return () => {
      animation.stop();
    };
  }, [delay, duration, progress]);

  return (
    <Animated.View
      style={[
        style,
        {
          opacity: progress,
          transform: [
            {
              translateY: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [offset, 0],
              }),
            },
            {
              scale: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0.985, 1],
              }),
            },
          ],
        },
      ]}
    >
      {children}
    </Animated.View>
  );
}
