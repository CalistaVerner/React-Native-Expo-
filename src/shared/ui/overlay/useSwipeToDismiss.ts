import { useCallback, useMemo, useRef } from 'react';
import {
  Animated,
  PanResponder,
  type GestureResponderEvent,
  type PanResponderGestureState,
} from 'react-native';
import { SHOULD_USE_NATIVE_DRIVER } from '../../lib/animation';

type SwipeAxis = 'horizontal' | 'vertical';
type SwipeDirection = 'positive' | 'both';

type UseSwipeToDismissParams = {
  enabled?: boolean;
  axis?: SwipeAxis;
  direction?: SwipeDirection;
  dismissThreshold?: number;
  velocityThreshold?: number;
  onDismiss: () => void;
  onGestureStart?: () => void;
  onGestureCancel?: () => void;
};

export function useSwipeToDismiss({
  enabled = true,
  axis = 'vertical',
  direction = 'positive',
  dismissThreshold = 92,
  velocityThreshold = 1.1,
  onDismiss,
  onGestureStart,
  onGestureCancel,
}: UseSwipeToDismissParams) {
  const translate = useRef(new Animated.Value(0)).current;
  const dismissRequestedRef = useRef(false);

  const reset = useCallback(() => {
    dismissRequestedRef.current = false;
    translate.stopAnimation();
    translate.setValue(0);
  }, [translate]);

  const springBack = useCallback(() => {
    Animated.spring(translate, {
      toValue: 0,
      useNativeDriver: SHOULD_USE_NATIVE_DRIVER,
      speed: 26,
      bounciness: 5,
    }).start();
  }, [translate]);

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

          const primaryDistance = axis === 'horizontal' ? gestureState.dx : gestureState.dy;
          const crossDistance = axis === 'horizontal' ? gestureState.dy : gestureState.dx;
          const hasPrimaryIntent = Math.abs(primaryDistance) > Math.abs(crossDistance);

          if (!hasPrimaryIntent) {
            return false;
          }

          if (direction === 'both') {
            return Math.abs(primaryDistance) > 8;
          }

          return primaryDistance > 8;
        },
        onPanResponderGrant: () => {
          translate.stopAnimation();
          onGestureStart?.();
        },
        onPanResponderMove: (_: GestureResponderEvent, gestureState: PanResponderGestureState) => {
          const nextValue = axis === 'horizontal' ? gestureState.dx : gestureState.dy;
          translate.setValue(direction === 'both' ? nextValue : Math.max(0, nextValue));
        },
        onPanResponderRelease: (_: GestureResponderEvent, gestureState: PanResponderGestureState) => {
          const distance = axis === 'horizontal' ? gestureState.dx : gestureState.dy;
          const velocity = axis === 'horizontal' ? gestureState.vx : gestureState.vy;
          const measuredDistance = direction === 'both' ? Math.abs(distance) : distance;
          const measuredVelocity = direction === 'both' ? Math.abs(velocity) : velocity;
          const shouldDismiss =
            measuredDistance >= dismissThreshold || measuredVelocity >= velocityThreshold;

          if (shouldDismiss) {
            requestDismiss();
            return;
          }

          onGestureCancel?.();
          springBack();
        },
        onPanResponderTerminate: () => {
          onGestureCancel?.();
          springBack();
        },
        onPanResponderTerminationRequest: () => false,
      }),
    [
      axis,
      direction,
      dismissThreshold,
      enabled,
      onGestureCancel,
      onGestureStart,
      requestDismiss,
      springBack,
      translate,
      velocityThreshold,
    ],
  );

  const dismissProgress = useMemo(
    () =>
      translate.interpolate({
        inputRange:
          direction === 'both'
            ? [-dismissThreshold, 0, dismissThreshold]
            : [0, dismissThreshold],
        outputRange: direction === 'both' ? [1, 0, 1] : [0, 1],
        extrapolate: 'clamp',
      }),
    [direction, dismissThreshold, translate],
  );

  const translateX = axis === 'horizontal' ? translate : new Animated.Value(0);
  const translateY = axis === 'vertical' ? translate : new Animated.Value(0);

  return {
    translate,
    translateX,
    translateY,
    dismissProgress,
    panHandlers: panResponder.panHandlers,
    reset,
  };
}
