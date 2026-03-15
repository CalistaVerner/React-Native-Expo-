import { useCallback, useMemo, useRef } from 'react';
import {
  Animated,
  PanResponder,
  type GestureResponderEvent,
  type PanResponderGestureState,
} from 'react-native';

type UseSwipeToDismissParams = {
  enabled?: boolean;
  dismissThreshold?: number;
  velocityThreshold?: number;
  onDismiss: () => void;
};

const SPRING_BACK = {
  toValue: 0,
  useNativeDriver: true,
  speed: 26,
  bounciness: 5,
} as const;

export function useSwipeToDismiss({
  enabled = true,
  dismissThreshold = 92,
  velocityThreshold = 1.1,
  onDismiss,
}: UseSwipeToDismissParams) {
  const translateY = useRef(new Animated.Value(0)).current;
  const dismissRequestedRef = useRef(false);

  const reset = useCallback(() => {
    dismissRequestedRef.current = false;
    translateY.stopAnimation();
    translateY.setValue(0);
  }, [translateY]);

  const springBack = useCallback(() => {
    Animated.spring(translateY, SPRING_BACK).start();
  }, [translateY]);

  const requestDismiss = useCallback(() => {
    if (dismissRequestedRef.current) {
      return;
    }

    dismissRequestedRef.current = true;
    onDismiss();
  }, [onDismiss]);

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (_: GestureResponderEvent, gestureState: PanResponderGestureState) => {
          if (!enabled) {
            return false;
          }

          const isVerticalIntent = Math.abs(gestureState.dy) > Math.abs(gestureState.dx);
          return isVerticalIntent && gestureState.dy > 8;
        },
        onPanResponderGrant: () => {
          translateY.stopAnimation();
        },
        onPanResponderMove: (_: GestureResponderEvent, gestureState: PanResponderGestureState) => {
          translateY.setValue(Math.max(0, gestureState.dy));
        },
        onPanResponderRelease: (_: GestureResponderEvent, gestureState: PanResponderGestureState) => {
          const shouldDismiss =
            gestureState.dy >= dismissThreshold || gestureState.vy >= velocityThreshold;

          if (shouldDismiss) {
            requestDismiss();
            return;
          }

          springBack();
        },
        onPanResponderTerminate: springBack,
        onPanResponderTerminationRequest: () => false,
      }),
    [dismissThreshold, enabled, requestDismiss, springBack, translateY, velocityThreshold],
  );

  const dismissProgress = useMemo(
    () =>
      translateY.interpolate({
        inputRange: [0, dismissThreshold],
        outputRange: [0, 1],
        extrapolate: 'clamp',
      }),
    [dismissThreshold, translateY],
  );

  return {
    translateY,
    dismissProgress,
    panHandlers: panResponder.panHandlers,
    reset,
  };
}
