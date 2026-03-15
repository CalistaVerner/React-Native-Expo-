import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  Modal,
  Pressable,
  ScrollView,
  Text,
  View,
  type PressableStateCallbackType,
} from 'react-native';
import { SHOULD_USE_NATIVE_DRIVER } from '../lib/animation';
import { createLogger } from '../lib/logger';
import type { AppTheme } from '../theme/themes';
import { AppIconView, type AppIconSpec, type AppIconTone } from './AppIcon';
import { useSwipeToDismiss } from './overlay/useSwipeToDismiss';
import { boxShadow } from './styles/effects';
import { selectBoxStyles } from './styles/selectBox.styles';

export type SelectBoxIconSpec = AppIconSpec;

export type SelectBoxOption<T extends string> = {
  value: T;
  title: string;
  description?: string;
  icon?: SelectBoxIconSpec;
  badgeText?: string;
  metaText?: string;
  disabled?: boolean;
};

type Props<T extends string> = {
  options: SelectBoxOption<T>[];
  value: T;
  onChange: (value: T) => void;
  theme: AppTheme;
  label?: string;
  placeholder?: string;
  modalTitle?: string;
};

const logger = createLogger('ui:select-box');

type BadgeTone = Exclude<AppIconTone, 'default'>;

function resolveBadgeColors(theme: AppTheme, isSelected: boolean, tone: BadgeTone = 'primary') {
  switch (tone) {
    case 'accent':
      return {
        backgroundColor: isSelected ? theme.colors.accent : theme.colors.surfaceSoft,
        textColor: isSelected ? theme.colors.primaryText : theme.colors.text,
      };
    case 'success':
      return {
        backgroundColor: isSelected ? theme.colors.success : theme.colors.surfaceSoft,
        textColor: isSelected ? theme.colors.successText : theme.colors.text,
      };
    case 'muted':
      return {
        backgroundColor: isSelected ? theme.colors.primary : theme.colors.surfaceSoft,
        textColor: isSelected ? theme.colors.primaryText : theme.colors.textMuted,
      };
    case 'warning':
      return {
        backgroundColor: isSelected ? theme.colors.warning : theme.colors.surfaceSoft,
        textColor: theme.colors.text,
      };
    default:
      return {
        backgroundColor: isSelected ? theme.colors.primary : theme.colors.surfaceSoft,
        textColor: isSelected ? theme.colors.primaryText : theme.colors.text,
      };
  }
}

function SelectBoxIcon({
  icon,
  theme,
  isSelected,
  size,
}: {
  icon: SelectBoxIconSpec;
  theme: AppTheme;
  isSelected: boolean;
  size: 'trigger' | 'option';
}) {
  const badgeTone: BadgeTone = icon.tone === 'default' || icon.tone === undefined ? 'primary' : icon.tone;
  const badgeColors = resolveBadgeColors(theme, isSelected, badgeTone);

  return (
    <>
      <AppIconView icon={icon} theme={theme} size={size === 'trigger' ? 20 : 18} />
      {icon.badgeLabel ? (
        <View
          style={[
            size === 'trigger' ? selectBoxStyles.iconBadge : selectBoxStyles.optionIconBadge,
            {
              backgroundColor: badgeColors.backgroundColor,
              borderColor: theme.colors.surface,
            },
          ]}
        >
          <Text style={[selectBoxStyles.iconBadgeText, { color: badgeColors.textColor }]}> 
            {icon.badgeLabel}
          </Text>
        </View>
      ) : null}
    </>
  );
}

export function SelectBox<T extends string>({
  options,
  value,
  onChange,
  theme,
  label,
  placeholder,
  modalTitle,
}: Props<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const progress = useRef(new Animated.Value(0)).current;
  const { panHandlers, reset, translateY } = useSwipeToDismiss({
    enabled: isMounted,
    axis: 'vertical',
    direction: 'positive',
    dismissThreshold: 94,
    velocityThreshold: 1,
    onDismiss: () => {
      logger.info('Dismissed select sheet by swipe', { label, modalTitle });
      close();
    },
  });

  const selectedOption = useMemo(
    () => options.find((option) => option.value === value) ?? null,
    [options, value],
  );

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setIsMounted(true);
    progress.setValue(0);
    reset();
    Animated.spring(progress, {
      toValue: 1,
      useNativeDriver: SHOULD_USE_NATIVE_DRIVER,
      speed: 18,
      bounciness: 7,
    }).start();
  }, [isOpen, progress, reset]);

  function close() {
    Animated.timing(progress, {
      toValue: 0,
      duration: 180,
      useNativeDriver: SHOULD_USE_NATIVE_DRIVER,
    }).start(({ finished }: { finished: boolean }) => {
      if (finished) {
        reset();
        setIsMounted(false);
        setIsOpen(false);
      }
    });
  }

  const open = () => {
    setIsOpen(true);
  };

  const handleSelect = (nextValue: T) => {
    onChange(nextValue);
    close();
  };

  const triggerIcon = selectedOption?.icon;
  const triggerTitle = selectedOption?.title ?? placeholder ?? label ?? '';
  const triggerDescription = selectedOption?.description;
  const triggerMeta = selectedOption?.metaText;

  const overlayOpacity = useMemo(
    () =>
      Animated.multiply(
        progress,
        translateY.interpolate({
          inputRange: [0, 180],
          outputRange: [1, 0.66],
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
          outputRange: [42, 0],
        }),
        translateY,
      ),
    [progress, translateY],
  );

  const panelScale = useMemo(
    () =>
      progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0.98, 1],
      }),
    [progress],
  );

  const dragScale = useMemo(
    () =>
      translateY.interpolate({
        inputRange: [0, 180],
        outputRange: [1, 0.988],
        extrapolate: 'clamp',
      }),
    [translateY],
  );

  const chevronRotate = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <>
      <Pressable
        onPress={open}
        accessibilityRole="button"
        style={({ pressed }: PressableStateCallbackType) => [
          selectBoxStyles.trigger,
          {
            backgroundColor: theme.colors.surfaceAlt,
            borderColor: theme.colors.border,
            boxShadow: boxShadow(0, 10, 20, theme.colors.shadow),
          },
          pressed && selectBoxStyles.triggerPressed,
        ]}
      >
        <View style={selectBoxStyles.triggerContent}>
          {triggerIcon ? (
            <View
              style={[
                selectBoxStyles.iconWrap,
                {
                  backgroundColor: theme.colors.surface,
                  borderColor: theme.colors.border,
                },
              ]}
            >
              <SelectBoxIcon icon={triggerIcon} theme={theme} isSelected size="trigger" />
            </View>
          ) : null}

          <View style={selectBoxStyles.textBlock}>
            {label ? (
              <Text style={[selectBoxStyles.eyebrow, { color: theme.colors.textSubtle }]}>{label}</Text>
            ) : null}
            <Text style={[selectBoxStyles.title, { color: theme.colors.text }]} numberOfLines={1}>
              {triggerTitle}
            </Text>
            {triggerDescription || triggerMeta ? (
              <View style={selectBoxStyles.triggerMetaRow}>
                {triggerDescription ? (
                  <Text
                    style={[selectBoxStyles.description, { color: theme.colors.textMuted }]}
                    numberOfLines={1}
                  >
                    {triggerDescription}
                  </Text>
                ) : null}
                {triggerMeta ? (
                  <Text
                    style={[
                      selectBoxStyles.triggerBadge,
                      {
                        color: theme.colors.primary,
                        backgroundColor:
                          theme.mode === 'dark' ? theme.colors.surfaceSoft : theme.colors.surface,
                      },
                    ]}
                  >
                    {triggerMeta}
                  </Text>
                ) : null}
              </View>
            ) : null}
          </View>

          <Animated.View
            style={[
              selectBoxStyles.chevronWrap,
              {
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border,
                transform: [{ rotate: chevronRotate }],
              },
            ]}
          >
            <AppIconView icon={{ name: 'chevron-down', tone: 'muted' }} theme={theme} size={14} />
          </Animated.View>
        </View>
      </Pressable>

      <Modal visible={isMounted} transparent animationType="none" onRequestClose={close}>
        <View style={selectBoxStyles.modalRoot}>
          <Animated.View style={[selectBoxStyles.overlay, { opacity: overlayOpacity }]}> 
            <Pressable style={selectBoxStyles.overlayPressable} onPress={close} />
          </Animated.View>

          <Animated.View
            style={[
              selectBoxStyles.sheet,
              {
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border,
                boxShadow: boxShadow(0, -10, 26, theme.colors.shadow),
                transform: [{ translateY: panelTranslateY }, { scale: panelScale }, { scale: dragScale }],
              },
            ]}
          >
            <View {...panHandlers} style={selectBoxStyles.sheetHandleWrap}>
              <View style={[selectBoxStyles.sheetHandle, { backgroundColor: theme.colors.border }]} />
            </View>

            <View {...panHandlers} style={selectBoxStyles.sheetHeader}>
              <View style={selectBoxStyles.sheetHeaderTextWrap}>
                {label ? (
                  <Text style={[selectBoxStyles.sheetEyebrow, { color: theme.colors.primary }]}>{label}</Text>
                ) : null}
                <Text style={[selectBoxStyles.sheetTitle, { color: theme.colors.text }]}> 
                  {modalTitle ?? label ?? triggerTitle}
                </Text>
              </View>

              <Pressable
                onPress={close}
                style={({ pressed }: PressableStateCallbackType) => [
                  selectBoxStyles.closeButton,
                  {
                    backgroundColor: theme.colors.surfaceAlt,
                    borderColor: theme.colors.border,
                  },
                  pressed && selectBoxStyles.closeButtonPressed,
                ]}
                accessibilityRole="button"
              >
                <AppIconView icon={{ name: 'xmark', tone: 'default' }} theme={theme} size={15} />
              </Pressable>
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={selectBoxStyles.optionList}
              keyboardShouldPersistTaps="handled"
            >
              {options.map((option) => {
                const isSelected = option.value === value;

                return (
                  <Pressable
                    key={option.value}
                    disabled={option.disabled}
                    onPress={() => handleSelect(option.value)}
                    accessibilityRole="button"
                    accessibilityState={{ selected: isSelected, disabled: option.disabled }}
                    style={({ pressed }: PressableStateCallbackType) => [
                      selectBoxStyles.optionRow,
                      {
                        backgroundColor: isSelected ? theme.colors.surfaceSoft : theme.colors.surfaceAlt,
                        borderColor: isSelected ? theme.colors.primary : theme.colors.border,
                      },
                      pressed && !option.disabled && selectBoxStyles.optionRowPressed,
                      option.disabled && selectBoxStyles.optionRowDisabled,
                    ]}
                  >
                    {option.icon ? (
                      <View
                        style={[
                          selectBoxStyles.optionIconWrap,
                          {
                            backgroundColor: theme.colors.surface,
                            borderColor: isSelected ? theme.colors.primary : theme.colors.border,
                          },
                        ]}
                      >
                        <SelectBoxIcon icon={option.icon} theme={theme} isSelected={isSelected} size="option" />
                      </View>
                    ) : null}

                    <View style={selectBoxStyles.optionTextWrap}>
                      <View style={selectBoxStyles.optionTitleRow}>
                        <Text style={[selectBoxStyles.optionTitle, { color: theme.colors.text }]}>
                          {option.title}
                        </Text>
                        {option.badgeText ? (
                          <Text
                            style={[
                              selectBoxStyles.optionBadge,
                              {
                                backgroundColor: isSelected ? theme.colors.primary : theme.colors.surface,
                                color: isSelected ? theme.colors.primaryText : theme.colors.textMuted,
                              },
                            ]}
                          >
                            {option.badgeText}
                          </Text>
                        ) : null}
                      </View>

                      {option.description ? (
                        <Text style={[selectBoxStyles.optionDescription, { color: theme.colors.textMuted }]}>
                          {option.description}
                        </Text>
                      ) : null}
                    </View>

                    <View style={selectBoxStyles.optionTrailing}>
                      {option.metaText ? (
                        <Text style={[selectBoxStyles.optionMeta, { color: theme.colors.textSubtle }]}> 
                          {option.metaText}
                        </Text>
                      ) : null}
                      <View
                        style={[
                          selectBoxStyles.selectionMark,
                          {
                            borderColor: isSelected ? theme.colors.primary : theme.colors.border,
                            backgroundColor: isSelected ? theme.colors.primary : theme.colors.surface,
                          },
                        ]}
                      >
                        {isSelected ? (
                          <AppIconView
                            icon={{ name: 'check', tone: 'default' }}
                            theme={theme}
                            size={11}
                            color={theme.colors.primaryText}
                          />
                        ) : null}
                      </View>
                    </View>
                  </Pressable>
                );
              })}
            </ScrollView>
          </Animated.View>
        </View>
      </Modal>
    </>
  );
}
