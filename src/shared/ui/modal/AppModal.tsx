import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Modal, Pressable, Text, View } from 'react-native';
import { SHOULD_USE_NATIVE_DRIVER } from '../../lib/animation';
import { createLogger } from '../../lib/logger';
import type { AppTheme } from '../../theme/themes';
import { AppIconView, type AppIconSpec } from '../AppIcon';
import { Button } from '../Button';
import { useSwipeToDismiss } from '../overlay/useSwipeToDismiss';
import { boxShadow } from '../styles/effects';
import { appModalStyles } from './styles/appModal.styles';

export type AppModalAction = {
  key: string;
  label: string;
  variant?: 'primary' | 'secondary' | 'soft';
  icon?: AppIconSpec;
  onPress: () => void;
};

type Props = {
  visible: boolean;
  theme: AppTheme;
  title: string;
  description?: string;
  icon?: AppIconSpec;
  dismissible?: boolean;
  onClose: () => void;
  actions?: AppModalAction[];
};

const logger = createLogger('ui:modal');

export function AppModal({
  visible,
  theme,
  title,
  description,
  icon,
  dismissible = true,
  onClose,
  actions = [],
}: Props) {
  const [isMounted, setIsMounted] = useState(visible);
  const progress = useRef(new Animated.Value(visible ? 1 : 0)).current;
  const { panHandlers, reset, translateY } = useSwipeToDismiss({
    enabled: dismissible && visible,
    axis: 'vertical',
    direction: 'positive',
    dismissThreshold: 96,
    velocityThreshold: 1,
    onDismiss: () => {
      logger.info('Dismissed modal by swipe', { title });
      onClose();
    },
  });

  useEffect(() => {
    if (visible) {
      setIsMounted(true);
      progress.setValue(0);
      reset();
      Animated.spring(progress, {
        toValue: 1,
        useNativeDriver: SHOULD_USE_NATIVE_DRIVER,
        speed: 18,
        bounciness: 6,
      }).start();
      return;
    }

    Animated.timing(progress, {
      toValue: 0,
      duration: 180,
      useNativeDriver: SHOULD_USE_NATIVE_DRIVER,
    }).start(({ finished }: { finished: boolean }) => {
      if (finished) {
        reset();
        setIsMounted(false);
      }
    });
  }, [visible, progress, reset]);

  const overlayOpacity = useMemo(
    () =>
      Animated.multiply(
        progress,
        translateY.interpolate({
          inputRange: [0, 160],
          outputRange: [1, 0.72],
          extrapolate: 'clamp',
        }),
      ),
    [progress, translateY],
  );

  const panelTranslateY = useMemo(
    () =>
      Animated.add(
        progress.interpolate({
          inputRange: [0, 1],
          outputRange: [28, 0],
        }),
        translateY,
      ),
    [progress, translateY],
  );

  const panelScale = useMemo(
    () =>
      progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0.96, 1],
      }),
    [progress],
  );

  const dragScale = useMemo(
    () =>
      translateY.interpolate({
        inputRange: [0, 160],
        outputRange: [1, 0.985],
        extrapolate: 'clamp',
      }),
    [translateY],
  );

  if (!isMounted) {
    return null;
  }

  return (
    <Modal visible transparent animationType="none" onRequestClose={onClose}>
      <View style={appModalStyles.root}>
        <Animated.View style={[appModalStyles.overlay, { opacity: overlayOpacity }]}> 
          <Pressable
            style={appModalStyles.overlayPressable}
            onPress={dismissible ? onClose : undefined}
          />
        </Animated.View>

        <Animated.View
          {...(dismissible ? panHandlers : {})}
          style={[
            appModalStyles.panel,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
              boxShadow: boxShadow(0, 18, 28, theme.colors.shadow),
              transform: [{ translateY: panelTranslateY }, { scale: panelScale }, { scale: dragScale }],
            },
          ]}
        >
          {dismissible ? (
            <View style={appModalStyles.dragHandleWrap}>
              <View style={[appModalStyles.dragHandle, { backgroundColor: theme.colors.border }]} />
            </View>
          ) : null}

          <View style={appModalStyles.header}>
            {icon ? (
              <View
                style={[
                  appModalStyles.iconWrap,
                  {
                    backgroundColor: theme.colors.surfaceSoft,
                    borderColor: theme.colors.border,
                  },
                ]}
              >
                <AppIconView icon={icon} theme={theme} size={20} />
              </View>
            ) : null}

            <View style={appModalStyles.textWrap}>
              <Text style={[appModalStyles.title, { color: theme.colors.text }]}>{title}</Text>
              {description ? (
                <Text style={[appModalStyles.description, { color: theme.colors.textMuted }]}>
                  {description}
                </Text>
              ) : null}
            </View>
          </View>

          {actions.length ? (
            <View style={appModalStyles.actions}>
              {actions.map((action) => (
                <Button
                  key={action.key}
                  title={action.label}
                  onPress={action.onPress}
                  theme={theme}
                  variant={action.variant ?? 'primary'}
                  leftIcon={action.icon?.name}
                />
              ))}
            </View>
          ) : null}
        </Animated.View>
      </View>
    </Modal>
  );
}
