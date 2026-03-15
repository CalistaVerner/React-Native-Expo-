import React from 'react';
import { Text, View } from 'react-native';
import type { AppTheme } from '../../../../shared/theme/themes';
import { SelectBox } from '../../../../shared/ui/SelectBox';
import type { PreferenceFieldModel } from '../../model/preferenceFields';
import { preferenceSectionCardStyles } from '../styles/preferenceSectionCard.styles';

export type PreferenceFieldRendererProps = {
  theme: AppTheme;
  field: PreferenceFieldModel;
};

export function PreferenceSelectField({ theme, field }: PreferenceFieldRendererProps) {
  return (
    <View style={preferenceSectionCardStyles.fieldBlock}>
      <SelectBox
        theme={theme}
        label={field.title}
        modalTitle={field.modalTitle}
        options={field.options}
        value={field.value}
        onChange={field.onChange}
      />
      {field.description ? (
        <Text style={[preferenceSectionCardStyles.description, { color: theme.colors.textMuted }]}>
          {field.description}
        </Text>
      ) : null}
    </View>
  );
}
