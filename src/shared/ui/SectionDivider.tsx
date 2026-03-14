import React from 'react';
import { Text, View } from 'react-native';
import type { AppTheme } from '../theme/themes';
import { sectionDividerStyles } from './styles/sectionDivider.styles';

type Props = {
  theme: AppTheme;
  label?: string;
};

export function SectionDivider({ theme, label }: Props) {
  return (
    <View style={sectionDividerStyles.root}>
      <View style={[sectionDividerStyles.line, { backgroundColor: theme.colors.border }]} />
      {label ? (
        <View style={[sectionDividerStyles.chip, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}> 
          <View style={[sectionDividerStyles.dot, { backgroundColor: theme.colors.primary }]} />
          <Text style={[sectionDividerStyles.label, { color: theme.colors.textSubtle }]}>{label}</Text>
        </View>
      ) : null}
      <View style={[sectionDividerStyles.line, { backgroundColor: theme.colors.border }]} />
    </View>
  );
}
