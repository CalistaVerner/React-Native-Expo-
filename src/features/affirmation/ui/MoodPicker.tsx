import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { AppTheme } from '../../../shared/theme/themes';
import { MOODS } from '../config/prompts';
import type { MoodId } from '../model/types';

type Props = {
  value: MoodId;
  onChange: (mood: MoodId) => void;
  labels: Record<MoodId, string>;
  theme: AppTheme;
};

export function MoodPicker({ value, onChange, labels, theme }: Props) {
  return (
    <View style={styles.row}>
      {MOODS.map((mood) => {
        const active = mood.id === value;

        return (
          <Pressable
            key={mood.id}
            onPress={() => onChange(mood.id)}
            style={[
              styles.button,
              { backgroundColor: theme.colors.surfaceAlt, borderColor: theme.colors.border },
              active && { borderColor: theme.colors.primary, backgroundColor: theme.colors.surface },
            ]}
          >
            <Text style={styles.emoji}>{mood.emoji}</Text>
            <Text style={[styles.label, { color: theme.colors.text }]}>{labels[mood.id]}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 16,
  },
  button: {
    flex: 1,
    minHeight: 88,
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  emoji: {
    fontSize: 26,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    marginTop: 8,
  },
});
