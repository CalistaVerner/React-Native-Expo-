import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Modal, Pressable, Text, View } from 'react-native';
import type { AppTheme } from '../../theme/themes';
import { Button } from '../Button';
import { AppIconView, type AppIconSpec } from '../AppIcon';
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

const OPEN_SPRING = {
  toValue: 1,
  useNativeDriver: true,
  speed: 18,
  bounciness: 6,
} as const;

const CLOSE_TIMING = {
  toValue: 0,
  duration: 180,
  useNativeDriver: true,
} as const;

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

  useEffect(() => {
    if (visible) {
      setIsMounted(true);
      progress.setValue(0);
      Animated.spring(progress, OPEN_SPRING).start();
      return;
    }

    Animated.timing(progress, CLOSE_TIMING).start(({ finished }) => {
      if (finished) {
        setIsMounted(false);
      }
    });
  }, [visible, progress]);

  const overlayOpacity = useMemo(
    () =>
      progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
      }),
    [progress],
  );

  const panelTranslateY = useMemo(
    () =>
      progress.interpolate({
        inputRange: [0, 1],
        outputRange: [28, 0],
      }),
    [progress],
  );

  const panelScale = useMemo(
    () =>
      progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0.96, 1],
      }),
    [progress],
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
          style={[
            appModalStyles.panel,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
              shadowColor: theme.colors.shadow,
              transform: [{ translateY: panelTranslateY }, { scale: panelScale }],
            },
          ]}
        >
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
