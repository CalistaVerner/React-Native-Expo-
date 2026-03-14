import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import type { AppTheme } from '../../../shared/theme/themes';
import type { Session } from '../config/sessions';
import {
  BADGE_BG,
  BASE_OVERLAY,
  BOTTOM_SCRIM,
  IMAGE_TEXT,
  sessionCardStyles,
} from './styles/sessionCard.styles';

type Props = {
  item: Session;
  theme: AppTheme;
  locked: boolean;
  onPress: () => void;
  lockedLabel: string;
  openLabel: string;
};

export function SessionCard({ item, theme, locked, onPress, lockedLabel, openLabel }: Props) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ disabled: false }}
      style={({ pressed }) => [
        sessionCardStyles.card,
        { backgroundColor: theme.colors.surface },
        locked && sessionCardStyles.locked,
        pressed && sessionCardStyles.pressed,
      ]}
    >
      <Image source={{ uri: item.image }} style={sessionCardStyles.image} resizeMode="cover" />
      <View style={[sessionCardStyles.overlay, { backgroundColor: BASE_OVERLAY }]} />
      <View style={[sessionCardStyles.bottomScrim, { backgroundColor: locked ? theme.colors.lockedOverlay : BOTTOM_SCRIM }]} />
      <View style={sessionCardStyles.content}>
        <View style={sessionCardStyles.metaRow}>
          <Text style={[sessionCardStyles.metaBadge, { color: IMAGE_TEXT, backgroundColor: BADGE_BG }]}>{item.category}</Text>
          <Text style={[sessionCardStyles.metaBadge, { color: IMAGE_TEXT, backgroundColor: BADGE_BG }]}>{item.duration}</Text>
        </View>

        <View style={sessionCardStyles.bottomBlock}>
          <Text style={sessionCardStyles.title}>{item.title}</Text>
          <Text style={sessionCardStyles.hint}>{locked ? `🔒 ${lockedLabel}` : openLabel}</Text>
        </View>
      </View>
    </Pressable>
  );
}
