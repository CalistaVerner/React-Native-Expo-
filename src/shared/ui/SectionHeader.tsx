import React from 'react';
import { Text, View } from 'react-native';
import type { AppTheme } from '../theme/themes';
import { sectionHeaderStyles } from './styles/sectionHeader.styles';

type Props = {
  theme: AppTheme;
  title: string;
  caption?: string;
  eyebrow?: string;
  align?: 'left' | 'center';
  accessory?: React.ReactNode;
};

export function SectionHeader({ theme, title, caption, eyebrow, align = 'left', accessory }: Props) {
  const centered = align === 'center';

  return (
    <View style={[sectionHeaderStyles.root, centered && sectionHeaderStyles.rootCentered]}>
      <View style={[sectionHeaderStyles.textWrap, centered && sectionHeaderStyles.textWrapCentered]}>
        {eyebrow ? (
          <Text style={[sectionHeaderStyles.eyebrow, { color: theme.colors.primary }, centered && sectionHeaderStyles.eyebrowCentered]}>
            {eyebrow}
          </Text>
        ) : null}
        <Text style={[sectionHeaderStyles.title, { color: theme.colors.text }, centered && sectionHeaderStyles.titleCentered]}>
          {title}
        </Text>
        {caption ? (
          <Text style={[sectionHeaderStyles.caption, { color: theme.colors.textMuted }, centered && sectionHeaderStyles.captionCentered]}>
            {caption}
          </Text>
        ) : null}
      </View>
      {accessory ? <View style={sectionHeaderStyles.accessoryWrap}>{accessory}</View> : null}
    </View>
  );
}
