import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { AppTheme } from '../theme/themes';

type Props = {
  title: string;
  caption?: string;
  theme: AppTheme;
};

export function SectionTitle({ title, caption, theme }: Props) {
  return (
    <View style={styles.wrap}>
      <Text style={[styles.title, { color: theme.colors.text }]}>{title}</Text>
      {caption ? <Text style={[styles.caption, { color: theme.colors.textMuted }]}>{caption}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: 6,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    lineHeight: 28,
  },
  caption: {
    fontSize: 14,
    lineHeight: 20,
  },
});
