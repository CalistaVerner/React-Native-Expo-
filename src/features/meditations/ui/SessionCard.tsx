import React from 'react';
import { Animated, Image, Text, View } from 'react-native';
import type { AppTheme } from '../../../shared/theme/themes';
import { AppIcon } from '../../../shared/ui/AppIcon';
import { AnimatedSelectableSurface } from '../../../shared/ui/AnimatedSelectableSurface';
import type { Session } from '../config/sessions';
import {
  BADGE_BG,
  BASE_OVERLAY,
  BOTTOM_SCRIM,
  IMAGE_TEXT,
  IMAGE_TEXT_MUTED,
  sessionCardStyles,
} from './styles/sessionCard.styles';

type Props = {
  item: Session;
  theme: AppTheme;
  locked: boolean;
  isSelected: boolean;
  onPress: () => void;
  lockedLabel: string;
  openLabel: string;
  selectedLabel: string;
};

export function SessionCard({
  item,
  theme,
  locked,
  isSelected,
  onPress,
  lockedLabel,
  openLabel,
  selectedLabel,
}: Props) {
  const hintText = locked ? lockedLabel : isSelected ? `${selectedLabel} · ${openLabel}` : openLabel;
  const hintIcon = locked ? 'lock' : isSelected ? 'check' : 'play';

  return (
    <AnimatedSelectableSurface
      theme={theme}
      onPress={onPress}
      isSelected={isSelected}
      borderRadius={24}
      pressedScale={0.988}
      liftDistance={4}
      showSelectionIndicator={!locked}
      selectedTintColor={theme.mode === 'dark' ? 'rgba(205,186,255,1)' : 'rgba(114,87,232,1)'}
      selectedTintOpacity={locked ? 0.02 : theme.mode === 'dark' ? 0.12 : 0.1}
      style={[
        sessionCardStyles.card,
        { backgroundColor: theme.colors.surface },
      ]}
      selectedStyle={isSelected ? sessionCardStyles.selected : undefined}
      accessibilityState={{ disabled: false }}
    >
      {({ selectionProgress }) => (
        <>
          <Image source={{ uri: item.image }} style={sessionCardStyles.image} resizeMode="cover" />
          <View style={[sessionCardStyles.overlay, { backgroundColor: BASE_OVERLAY }]} />
          <View
            style={[
              sessionCardStyles.bottomScrim,
              { backgroundColor: locked ? theme.colors.lockedOverlay : BOTTOM_SCRIM },
            ]}
          />

          <Animated.View
            pointerEvents="none"
            style={[
              sessionCardStyles.selectedSheen,
              {
                opacity: selectionProgress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 1],
                }),
              },
            ]}
          />

          <View style={sessionCardStyles.content}>
            <View style={sessionCardStyles.metaRow}>
              <Animated.View
                style={{
                  transform: [
                    {
                      scale: selectionProgress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 1.04],
                      }),
                    },
                  ],
                }}
              >
                <Text style={[sessionCardStyles.metaBadge, { color: IMAGE_TEXT, backgroundColor: BADGE_BG }]}>{item.category}</Text>
              </Animated.View>
              <Text style={[sessionCardStyles.metaBadge, { color: IMAGE_TEXT, backgroundColor: BADGE_BG }]}>{item.duration}</Text>
            </View>

            <View style={sessionCardStyles.bottomBlock}>
              <Animated.Text
                style={[
                  sessionCardStyles.title,
                  {
                    transform: [
                      {
                        scale: selectionProgress.interpolate({
                          inputRange: [0, 1],
                          outputRange: [1, 1.02],
                        }),
                      },
                    ],
                  },
                ]}
              >
                {item.title}
              </Animated.Text>
              <View style={sessionCardStyles.hintRow}>
                <AppIcon name={hintIcon} size={12} color={IMAGE_TEXT_MUTED} />
                <Text style={sessionCardStyles.hint}>{hintText}</Text>
              </View>
            </View>
          </View>
        </>
      )}
    </AnimatedSelectableSurface>
  );
}
