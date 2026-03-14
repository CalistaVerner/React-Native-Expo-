import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import type { AppTheme } from '../../../shared/theme/themes';
import type { Session } from '../config/sessions';

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
      style={[styles.card, { backgroundColor: theme.colors.surface }, locked && styles.locked]}
    >
      <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
      <View style={[styles.overlay, { backgroundColor: theme.colors.lockedOverlay }]} />
      <View style={styles.content}>
        <View style={styles.metaRow}>
          <Text style={[styles.metaBadge, { color: theme.colors.text }]}>{item.category}</Text>
          <Text style={[styles.metaText, { color: theme.colors.text }]}>{item.duration}</Text>
        </View>

        <View style={styles.bottomBlock}>
          <Text style={[styles.title, { color: theme.colors.text }]}>{item.title}</Text>
          <Text style={[styles.hint, { color: theme.colors.text }]}>{locked ? `🔒 ${lockedLabel}` : openLabel}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 184,
    borderRadius: 24,
    overflow: 'hidden',
  },
  locked: {
    opacity: 0.6,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 18,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metaBadge: {
    fontSize: 12,
    fontWeight: '700',
    backgroundColor: 'rgba(0,0,0,0.18)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    overflow: 'hidden',
  },
  metaText: {
    fontSize: 12,
    fontWeight: '700',
  },
  bottomBlock: {
    gap: 8,
  },
  title: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '800',
    maxWidth: '78%',
  },
  hint: {
    fontSize: 13,
    fontWeight: '600',
  },
});
