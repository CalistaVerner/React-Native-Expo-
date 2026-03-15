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
import { createLogger } from '../../lib/logger';
import { AppIconView, type AppIconSpec, resolveIconColor } from '../AppIcon';
import { useSwipeToDismiss } from '../overlay/useSwipeToDismiss';
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
}: {
  toast: ToastRecord;
  progress: Animated.Value;
  onDismiss: (id: number) => void;
}) {
  const { theme } = useAppContext();
  const icon = resolveToastIcon(toast);
  const variant = toast.variant ?? 'info';
  const accentColor = resolveAccentColor(theme, variant);
  const swipe = useSwipeToDismiss({
    dismissThreshold: 72,
    velocityThreshold: 0.9,
    onDismiss: () => {
      logger.info('Dismissed toast by swipe', { id: toast.id, title: toast.title });
      onDismiss(toast.id);
    },
  });

  const opacity = useMemo(
    () =>
      Animated.multiply(
        progress,
        swipe.translateY.interpolate({
          inputRange: [0, 120],
          outputRange: [1, 0.72],
          extrapolate: 'clamp',
        }),
      ),
    [progress, swipe.translateY],
  );

  const translateY = useMemo(
    () =>
      Animated.add(
        progress.interpolate({
          inputRange: [0, 1],
          outputRange: [-16, 0],
        }),
        swipe.translateY,
      ),
    [progress, swipe.translateY],
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
          shadowColor: theme.colors.shadow,
          opacity,
          transform: [{ translateY }, { scale }],
        },
      ]}
    >
      <View style={[toastStyles.accent, { backgroundColor: accentColor }]} />
      <View style={toastStyles.dragHandleWrap}>
        <View style={[toastStyles.dragHandle, { backgroundColor: theme.colors.border }]} />
      </View>
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

  const dismissToast = useCallback((id?: number) => {
    setToasts((current) => {
      const targetId = id ?? current[0]?.id;
      if (!targetId) {
        return current;
      }

      const progress = progressMapRef.current[targetId];
      const timer = timersRef.current[targetId];
      if (timer) {
        clearTimeout(timer);
        delete timersRef.current[targetId];
      }

      if (!progress) {
        return current.filter((toast) => toast.id !== targetId);
      }

      Animated.timing(progress, {
        toValue: 0,
        duration: 170,
        useNativeDriver: true,
      }).start(({ finished }: { finished: boolean }) => {
        if (finished) {
          delete progressMapRef.current[targetId];
          setToasts((latest) => latest.filter((toast) => toast.id !== targetId));
        }
      });

      return current;
    });
  }, []);

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

      setToasts((current) => [toast, ...current].slice(0, 3));
      Animated.spring(progress, {
        toValue: 1,
        useNativeDriver: true,
        speed: 20,
        bounciness: 6,
      }).start();

      timersRef.current[id] = setTimeout(() => {
        dismissToast(id);
      }, toast.durationMs);
    },
    [dismissToast],
  );

  const value = useMemo<ToastContextValue>(
    () => ({ showToast, dismissToast }),
    [showToast, dismissToast],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <View pointerEvents="box-none" style={toastStyles.viewport}>
        {toasts.map((toast) => (
          <ToastCard
            key={toast.id}
            toast={toast}
            progress={progressMapRef.current[toast.id] ?? new Animated.Value(1)}
            onDismiss={dismissToast}
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
