import React from 'react';
import { Animated, Text, View } from 'react-native';
import type { DimensionValue } from 'react-native';
import type { AppTheme } from '../theme/themes';
import { AnimatedSelectableSurface } from './AnimatedSelectableSurface';
import { optionSelectStyles } from './styles/optionSelect.styles';

export type OptionSelectOption<T extends string> = {
  value: T;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  badgeText?: string;
  metaText?: string;
  disabled?: boolean;
};

type OptionSelectLayout = 'list' | 'grid';

type Props<T extends string> = {
  options: OptionSelectOption<T>[];
  value: T;
  onChange: (value: T) => void;
  theme: AppTheme;
  selectionLabel?: string;
  layout?: OptionSelectLayout;
  columns?: number;
};

export function OptionSelect<T extends string>({
  options,
  value,
  onChange,
  theme,
  selectionLabel,
  layout = 'list',
  columns = 2,
}: Props<T>) {
  const isGrid = layout === 'grid';
  const columnWidth: DimensionValue = `${100 / Math.max(columns, 1)}%`;

  return (
    <View style={[optionSelectStyles.container, isGrid && optionSelectStyles.containerGrid]}>
      {options.map((option) => {
        const isSelected = option.value === value;

        return (
          <View
            key={option.value}
            style={[
              optionSelectStyles.cell,
              isGrid ? { width: columnWidth } : optionSelectStyles.cellList,
            ]}
          >
            <AnimatedSelectableSurface
              theme={theme}
              onPress={() => onChange(option.value)}
              isSelected={isSelected}
              disabled={option.disabled}
              borderRadius={isGrid ? 20 : 18}
              style={[
                optionSelectStyles.surface,
                isGrid ? optionSelectStyles.surfaceGrid : optionSelectStyles.surfaceList,
                {
                  borderColor: isSelected ? theme.colors.primary : theme.colors.border,
                  backgroundColor: isSelected ? theme.colors.surfaceSoft : theme.colors.surfaceAlt,
                },
                option.disabled && optionSelectStyles.surfaceDisabled,
              ]}
              showSelectionIndicator={false}
              selectedTintOpacity={theme.mode === 'dark' ? 0.12 : 0.08}
              selectedStyle={isSelected ? optionSelectStyles.surfaceSelected : undefined}
              accessibilityRole="button"
              accessibilityState={{ selected: isSelected, disabled: option.disabled }}
            >
              {({ selectionProgress, pressProgress }) => (
                <View style={[optionSelectStyles.content, isGrid && optionSelectStyles.contentGrid]}>
                  <View style={[optionSelectStyles.mainRow, isGrid && optionSelectStyles.mainRowGrid]}>
                    {option.icon ? (
                      <Animated.View
                        style={[
                          optionSelectStyles.iconWrap,
                          isGrid && optionSelectStyles.iconWrapGrid,
                          {
                            backgroundColor: isSelected ? theme.colors.surface : theme.colors.surface,
                            borderColor: isSelected ? theme.colors.primary : theme.colors.border,
                            transform: [
                              {
                                scale: selectionProgress.interpolate({
                                  inputRange: [0, 1],
                                  outputRange: [1, 1.06],
                                }),
                              },
                              {
                                translateY: pressProgress.interpolate({
                                  inputRange: [0, 1],
                                  outputRange: [0, 1],
                                }),
                              },
                            ],
                          },
                        ]}
                      >
                        {typeof option.icon === 'string' ? (
                          <Text style={optionSelectStyles.iconText}>{option.icon}</Text>
                        ) : (
                          option.icon
                        )}
                      </Animated.View>
                    ) : null}

                    <View style={[optionSelectStyles.textWrap, isGrid && optionSelectStyles.textWrapGrid]}>
                      <View style={[optionSelectStyles.titleRow, isGrid && optionSelectStyles.titleRowGrid]}>
                        <Text
                          numberOfLines={isGrid ? 2 : 1}
                          style={[
                            optionSelectStyles.title,
                            isGrid && optionSelectStyles.titleGrid,
                            { color: theme.colors.text },
                          ]}
                        >
                          {option.title}
                        </Text>

                        {option.badgeText ? (
                          <Text
                            style={[
                              optionSelectStyles.badge,
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
                        <Text
                          numberOfLines={isGrid ? 2 : 2}
                          style={[
                            optionSelectStyles.description,
                            isGrid && optionSelectStyles.descriptionGrid,
                            { color: theme.colors.textMuted },
                          ]}
                        >
                          {option.description}
                        </Text>
                      ) : null}
                    </View>

                    <Animated.View
                      style={[
                        optionSelectStyles.trailing,
                        isGrid && optionSelectStyles.trailingGrid,
                        {
                          borderColor: isSelected ? theme.colors.primary : theme.colors.border,
                          backgroundColor: isSelected ? theme.colors.primary : theme.colors.surface,
                          transform: [
                            {
                              scale: selectionProgress.interpolate({
                                inputRange: [0, 1],
                                outputRange: [1, 1.08],
                              }),
                            },
                          ],
                        },
                      ]}
                    >
                      <Text style={[optionSelectStyles.checkMark, { color: isSelected ? theme.colors.primaryText : 'transparent' }]}>
                        ✓
                      </Text>
                    </Animated.View>
                  </View>

                  {(selectionLabel || option.metaText) ? (
                    <View style={[optionSelectStyles.footer, isGrid && optionSelectStyles.footerGrid]}>
                      <Text
                        style={[
                          optionSelectStyles.selectionText,
                          { color: isSelected ? theme.colors.primary : theme.colors.textSubtle },
                        ]}
                      >
                        {isSelected ? selectionLabel : option.metaText || ' '}
                      </Text>
                    </View>
                  ) : null}
                </View>
              )}
            </AnimatedSelectableSurface>
          </View>
        );
      })}
    </View>
  );
}
