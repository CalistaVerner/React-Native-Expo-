import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Animated,
  Pressable,
  Text,
  View,
  type PressableStateCallbackType,
} from 'react-native';
import { useAppContext } from '../../../app/state/AppContext';
import { SHOULD_USE_NATIVE_DRIVER } from '../../lib/animation';
import { createLogger } from '../../lib/logger';
import { AppIconView, type AppIconSpec, resolveIconColor } from '../AppIcon';
import { useSwipeToDismiss } from '../overlay/useSwipeToDismiss';
import { boxShadow } from '../styles/effects';
import { toastStyles } from './styles/toast.styles';

const logger = createLogger('ui:toast');

export type ToastVariant = 'info' | 'success' | 'warning';

export type ToastPayload = {
  title: string;
  message?: string;
  variant?: ToastVariant;
  icon?: AppIconSpec;
  durationMs?: number;
};

type ToastRecord = ToastPayload & {
  id: number;
};

type ToastContextValue = {
  showToast: (payload: ToastPayload) => void;
  dismissToast: (id?: number) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

function resolveToastIcon(payload: ToastRecord): AppIconSpec {
  if (payload.icon) {
    return payload.icon;
  }

  switch (payload.variant) {
    case 'success':
      return { name: 'circle-check', tone: 'success' };
    case 'warning':
      return { name: 'triangle-exclamation', tone: 'warning' };
    default:
      return { name: 'circle-info', tone: 'primary' };
  }
}

function resolveAccentColor(
  theme: ReturnType<typeof useAppContext>['theme'],
  variant: ToastVariant,
) {
  switch (variant) {
    case 'success':
      return theme.colors.success;
    case 'warning':
      return theme.colors.warning;
    default:
      return theme.colors.primary;
  }
}

function ToastCard({
  toast,
  progress,
  onDismiss,
  onPauseTimer,
  onResumeTimer,
}: {
  toast: ToastRecord;
  progress: Animated.Value;
  onDismiss: (id: number) => void;
  onPauseTimer: (id: number) => void;
  onResumeTimer: (id: number) => void;
}) {
  const { theme } = useAppContext();
  const icon = resolveToastIcon(toast);
  const variant = toast.variant ?? 'info';
  const accentColor = resolveAccentColor(theme, variant);
  const swipe = useSwipeToDismiss({
    axis: 'horizontal',
    direction: 'both',
    dismissThreshold: 88,
    velocityThreshold: 0.85,
    onGestureStart: () => {
      logger.info('Paused toast dispose timer', { id: toast.id, title: toast.title });
      onPauseTimer(toast.id);
    },
    onGestureCancel: () => {
      logger.info('Resumed toast dispose timer', { id: toast.id, title: toast.title });
      onResumeTimer(toast.id);
    },
    onDismiss: () => {
      logger.info('Dismissed toast by swipe', { id: toast.id, title: toast.title });
      onDismiss(toast.id);
    },
  });

  const opacity = useMemo(
    () =>
      Animated.multiply(
        progress,
        swipe.translateX.interpolate({
          inputRange: [-180, 0, 180],
          outputRange: [0.18, 1, 0.18],
          extrapolate: 'clamp',
        }),
      ),
    [progress, swipe.translateX],
  );

  const translateX = useMemo(
    () =>
      Animated.add(
        progress.interpolate({
          inputRange: [0, 1],
          outputRange: [10, 0],
        }),
        swipe.translateX,
      ),
    [progress, swipe.translateX],
  );

  const scale = useMemo(
    () =>
      progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0.96, 1],
      }),
    [progress],
  );

  return (
    <Animated.View
      {...swipe.panHandlers}
      style={[
        toastStyles.card,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
          boxShadow: boxShadow(0, 14, 24, theme.colors.shadow),
          opacity,
          transform: [{ translateX }, { scale }],
        },
      ]}
    >
      <View style={[toastStyles.accent, { backgroundColor: accentColor }]} />
      <View style={toastStyles.content}>
        <View
          style={[
            toastStyles.iconWrap,
            {
              backgroundColor: theme.colors.surfaceSoft,
              borderColor: theme.colors.border,
            },
          ]}
        >
          <AppIconView
            icon={icon}
            theme={theme}
            size={18}
            color={resolveIconColor(theme, icon.tone)}
          />
        </View>
        <View style={toastStyles.textWrap}>
          <Text style={[toastStyles.title, { color: theme.colors.text }]}>{toast.title}</Text>
          {toast.message ? (
            <Text style={[toastStyles.message, { color: theme.colors.textMuted }]}>
              {toast.message}
            </Text>
          ) : null}
        </View>
        <Pressable
          onPress={() => onDismiss(toast.id)}
          style={({ pressed }: PressableStateCallbackType) => [
            toastStyles.closeButton,
            pressed && toastStyles.closeButtonPressed,
          ]}
        >
          <AppIconView icon={{ name: 'xmark', tone: 'muted' }} theme={theme} size={14} />
        </Pressable>
      </View>
    </Animated.View>
  );
}

export function ToastProvider({ children }: React.PropsWithChildren) {
  const [toasts, setToasts] = useState<ToastRecord[]>([]);
  const nextIdRef = useRef(1);
  const timersRef = useRef<Record<number, ReturnType<typeof setTimeout>>>({});
  const progressMapRef = useRef<Record<number, Animated.Value>>({});
  const remainingMsRef = useRef<Record<number, number>>({});
  const startedAtRef = useRef<Record<number, number>>({});

  const clearTimer = useCallback((id: number) => {
    const timer = timersRef.current[id];
    if (timer) {
      clearTimeout(timer);
      delete timersRef.current[id];
    }
    delete startedAtRef.current[id];
  }, []);

  const dismissToast = useCallback((id?: number) => {
    setToasts((current) => {
      const targetId = id ?? current[0]?.id;
      if (!targetId) {
        return current;
      }

      clearTimer(targetId);
      delete remainingMsRef.current[targetId];

      const progress = progressMapRef.current[targetId];
      if (!progress) {
        delete progressMapRef.current[targetId];
        return current.filter((toast) => toast.id !== targetId);
      }

      Animated.timing(progress, {
        toValue: 0,
        duration: 170,
        useNativeDriver: SHOULD_USE_NATIVE_DRIVER,
      }).start(({ finished }: { finished: boolean }) => {
        if (finished) {
          delete progressMapRef.current[targetId];
          setToasts((latest) => latest.filter((toast) => toast.id !== targetId));
        }
      });

      return current;
    });
  }, [clearTimer]);

  const startTimer = useCallback((id: number, durationMs: number) => {
    clearTimer(id);
    remainingMsRef.current[id] = durationMs;
    startedAtRef.current[id] = Date.now();
    timersRef.current[id] = setTimeout(() => {
      dismissToast(id);
    }, durationMs);
  }, [clearTimer, dismissToast]);

  const pauseToastTimer = useCallback((id: number) => {
    const timer = timersRef.current[id];
    if (!timer) {
      return;
    }

    clearTimeout(timer);
    delete timersRef.current[id];

    const startedAt = startedAtRef.current[id] ?? Date.now();
    const elapsed = Date.now() - startedAt;
    const currentRemaining = remainingMsRef.current[id] ?? 0;
    remainingMsRef.current[id] = Math.max(0, currentRemaining - elapsed);
    delete startedAtRef.current[id];
  }, []);

  const resumeToastTimer = useCallback((id: number) => {
    if (timersRef.current[id]) {
      return;
    }

    const remainingMs = remainingMsRef.current[id] ?? 0;
    if (remainingMs <= 0) {
      dismissToast(id);
      return;
    }

    startedAtRef.current[id] = Date.now();
    timersRef.current[id] = setTimeout(() => {
      dismissToast(id);
    }, remainingMs);
  }, [dismissToast]);

  const showToast = useCallback(
    (payload: ToastPayload) => {
      const id = nextIdRef.current++;
      const toast: ToastRecord = {
        id,
        durationMs: 2600,
        variant: 'info',
        ...payload,
      };

      logger.info('Showing toast', { id, title: toast.title, variant: toast.variant });

      const progress = new Animated.Value(0);
      progressMapRef.current[id] = progress;
      remainingMsRef.current[id] = toast.durationMs ?? 2600;

      setToasts((current) => {
        const next = [toast, ...current].slice(0, 3);
        const removed = current.filter((existing) => !next.some((item) => item.id === existing.id));
        for (const stale of removed) {
          clearTimer(stale.id);
          delete progressMapRef.current[stale.id];
          delete remainingMsRef.current[stale.id];
        }
        return next;
      });

      Animated.spring(progress, {
        toValue: 1,
        useNativeDriver: SHOULD_USE_NATIVE_DRIVER,
        speed: 20,
        bounciness: 6,
      }).start();

      startTimer(id, toast.durationMs ?? 2600);
    },
    [clearTimer, startTimer],
  );

  const value = useMemo<ToastContextValue>(
    () => ({ showToast, dismissToast }),
    [showToast, dismissToast],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <View style={[toastStyles.viewport, { pointerEvents: 'box-none' as const }]}>
        {toasts.map((toast) => (
          <ToastCard
            key={toast.id}
            toast={toast}
            progress={progressMapRef.current[toast.id] ?? new Animated.Value(1)}
            onDismiss={dismissToast}
            onPauseTimer={pauseToastTimer}
            onResumeTimer={resumeToastTimer}
          />
        ))}
      </View>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used inside ToastProvider');
  }

  return context;
}
