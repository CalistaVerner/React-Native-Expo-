import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  Modal,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import type { AppTheme } from '../theme/themes';
import { selectBoxStyles } from './styles/selectBox.styles';

type FontAwesomeName = React.ComponentProps<typeof FontAwesome6>['name'];

type IconTone = 'primary' | 'accent' | 'success' | 'muted';

export type SelectBoxIconSpec = {
  family?: 'fa6';
  name: FontAwesomeName;
  tone?: IconTone;
  badgeLabel?: string;
};

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

const OPEN_SPRING = {
  toValue: 1,
  useNativeDriver: true,
  speed: 18,
  bounciness: 7,
} as const;

const CLOSE_TIMING = {
  toValue: 0,
  duration: 180,
  useNativeDriver: true,
} as const;

function resolveToneColors(theme: AppTheme, tone: IconTone = 'primary', isSelected = false) {
  if (tone === 'accent') {
    return {
      icon: theme.colors.accent,
      badgeBg: isSelected ? theme.colors.accent : theme.colors.surfaceSoft,
      badgeText: isSelected ? theme.colors.primaryText : theme.colors.text,
    };
  }

  if (tone === 'success') {
    return {
      icon: theme.colors.success,
      badgeBg: isSelected ? theme.colors.success : theme.colors.surfaceSoft,
      badgeText: isSelected ? theme.colors.successText : theme.colors.text,
    };
  }

  if (tone === 'muted') {
    return {
      icon: theme.colors.textMuted,
      badgeBg: isSelected ? theme.colors.primary : theme.colors.surfaceSoft,
      badgeText: isSelected ? theme.colors.primaryText : theme.colors.textMuted,
    };
  }

  return {
    icon: theme.colors.primary,
    badgeBg: isSelected ? theme.colors.primary : theme.colors.surfaceSoft,
    badgeText: isSelected ? theme.colors.primaryText : theme.colors.text,
  };
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
  const tone = resolveToneColors(theme, icon.tone, isSelected);

  return (
    <>
      <FontAwesome6
        name={icon.name}
        size={size === 'trigger' ? 20 : 18}
        color={tone.icon}
        solid
      />
      {icon.badgeLabel ? (
        <View
          style={[
            size === 'trigger' ? selectBoxStyles.iconBadge : selectBoxStyles.optionIconBadge,
            {
              backgroundColor: tone.badgeBg,
              borderColor: theme.colors.surface,
            },
          ]}
        >
          <Text style={[selectBoxStyles.iconBadgeText, { color: tone.badgeText }]}>
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

  const selectedOption = useMemo(
    () => options.find((option) => option.value === value) ?? null,
    [options, value]
  );

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setIsMounted(true);
    progress.setValue(0);
    Animated.spring(progress, OPEN_SPRING).start();
  }, [isOpen, progress]);

  const close = () => {
    Animated.timing(progress, CLOSE_TIMING).start(({ finished }) => {
      if (finished) {
        setIsMounted(false);
        setIsOpen(false);
      }
    });
  };

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

  const overlayOpacity = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const panelTranslateY = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [42, 0],
  });

  const panelScale = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0.98, 1],
  });

  const chevronRotate = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <>
      <Pressable
        onPress={open}
        accessibilityRole="button"
        style={({ pressed }) => [
          selectBoxStyles.trigger,
          {
            backgroundColor: theme.colors.surfaceAlt,
            borderColor: theme.colors.border,
            shadowColor: theme.colors.shadow,
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
                  <Text style={[selectBoxStyles.description, { color: theme.colors.textMuted }]} numberOfLines={1}>
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
            <FontAwesome6 name="chevron-down" size={14} color={theme.colors.textMuted} solid />
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
                shadowColor: theme.colors.shadow,
                transform: [{ translateY: panelTranslateY }, { scale: panelScale }],
              },
            ]}
          >
            <View style={selectBoxStyles.sheetHandleWrap}>
              <View style={[selectBoxStyles.sheetHandle, { backgroundColor: theme.colors.border }]} />
            </View>

            <View style={selectBoxStyles.sheetHeader}>
              <View style={selectBoxStyles.sheetHeaderTextWrap}>
                {label ? <Text style={[selectBoxStyles.sheetEyebrow, { color: theme.colors.primary }]}>{label}</Text> : null}
                <Text style={[selectBoxStyles.sheetTitle, { color: theme.colors.text }]}>
                  {modalTitle ?? label ?? triggerTitle}
                </Text>
              </View>

              <Pressable
                onPress={close}
                style={({ pressed }) => [
                  selectBoxStyles.closeButton,
                  {
                    backgroundColor: theme.colors.surfaceAlt,
                    borderColor: theme.colors.border,
                  },
                  pressed && selectBoxStyles.closeButtonPressed,
                ]}
                accessibilityRole="button"
              >
                <FontAwesome6 name="xmark" size={15} color={theme.colors.text} solid />
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
                    style={({ pressed }) => [
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
                        <Text style={[selectBoxStyles.optionTitle, { color: theme.colors.text }]}>{option.title}</Text>
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
                        <Text style={[selectBoxStyles.optionMeta, { color: theme.colors.textSubtle }]}>{option.metaText}</Text>
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
                          <FontAwesome6 name="check" size={11} color={theme.colors.primaryText} solid />
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
