import React from 'react';
import { View } from 'react-native';
import type { AppTheme } from '../../../shared/theme/themes';
import { SurfaceCard } from '../../../shared/ui/SurfaceCard';
import { SectionHeader } from '../../../shared/ui/SectionHeader';
import type { PreferenceSectionModel } from '../model/preferenceFields';
import { preferenceFieldRegistry } from './preferenceFieldRegistry';
import { preferenceSectionCardStyles } from './styles/preferenceSectionCard.styles';

export function PreferenceSectionCard({
  theme,
  section,
}: {
  theme: AppTheme;
  section: PreferenceSectionModel;
}) {
  return (
    <SurfaceCard theme={theme} style={preferenceSectionCardStyles.card}>
      <SectionHeader theme={theme} title={section.title} caption={section.caption} compact />
      <View style={preferenceSectionCardStyles.fieldStack}>
        {section.fields.map((field) => {
          const FieldComponent = preferenceFieldRegistry.get(field.componentType);

          return <FieldComponent key={field.key} theme={theme} field={field} />;
        })}
      </View>
    </SurfaceCard>
  );
}
