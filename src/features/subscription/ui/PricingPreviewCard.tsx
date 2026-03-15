import React from 'react';
import { Text, View } from 'react-native';
import type { Dictionary } from '../../../shared/i18n';
import type { AppTheme } from '../../../shared/theme/themes';
import { SurfaceCard } from '../../../shared/ui/SurfaceCard';
import { SectionHeader } from '../../../shared/ui/SectionHeader';
import { pricingPreviewCardStyles } from './styles/pricingPreviewCard.styles';

export function PricingPreviewCard({
  theme,
  t,
  monthlyPrice,
  yearlyPrice,
  fxSnapshotDate,
}: {
  theme: AppTheme;
  t: Dictionary;
  monthlyPrice: string;
  yearlyPrice: string;
  fxSnapshotDate: string;
}) {
  return (
    <SurfaceCard theme={theme} style={pricingPreviewCardStyles.card}>
      <SectionHeader theme={theme} title={t.preferences.pricingPreview} compact />
      <View style={pricingPreviewCardStyles.previewRow}>
        <View style={[pricingPreviewCardStyles.previewTile, { backgroundColor: theme.colors.surfaceSoft }]}> 
          <Text style={[pricingPreviewCardStyles.previewCaption, { color: theme.colors.textMuted }]}>{t.paywall.plans.monthly.title}</Text>
          <Text style={[pricingPreviewCardStyles.previewValue, { color: theme.colors.text }]}>{monthlyPrice}</Text>
        </View>
        <View style={[pricingPreviewCardStyles.previewTile, { backgroundColor: theme.colors.surfaceSoft }]}> 
          <Text style={[pricingPreviewCardStyles.previewCaption, { color: theme.colors.textMuted }]}>{t.paywall.plans.yearly.title}</Text>
          <Text style={[pricingPreviewCardStyles.previewValue, { color: theme.colors.text }]}>{yearlyPrice}</Text>
        </View>
      </View>
      <Text style={[pricingPreviewCardStyles.metaText, { color: theme.colors.textSubtle }]}> 
        {t.preferences.fxUpdated}: {fxSnapshotDate}
      </Text>
    </SurfaceCard>
  );
}
