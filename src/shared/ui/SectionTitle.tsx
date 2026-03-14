import React from 'react';
import { Text, View } from 'react-native';
import type { AppTheme } from '../theme/themes';
import { sectionTitleStyles } from './styles/sectionTitle.styles';

type Props = {
  title: string;
  caption?: string;
  theme: AppTheme;
};

export function SectionTitle({ title, caption, theme }: Props) {
  return (
    <View style={sectionTitleStyles.wrap}>
      <Text style={[sectionTitleStyles.title, { color: theme.colors.text }]}>{title}</Text>
      {caption ? <Text style={[sectionTitleStyles.caption, { color: theme.colors.textMuted }]}>{caption}</Text> : null}
    </View>
  );
}
