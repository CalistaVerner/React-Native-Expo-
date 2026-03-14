import React from 'react';
import { Text, View } from 'react-native';
import type { AppTheme } from '../../../shared/theme/themes';
import type { Dictionary } from '../../../shared/i18n';
import { SurfaceCard } from '../../../shared/ui/SurfaceCard';
import { Pill } from '../../../shared/ui/Pill';
import { welcomeSummaryCardStyles } from './styles/welcomeSummaryCard.styles';
import type { RegionCode } from '../../settings/model/types';

type Props = {
  theme: AppTheme;
  t: Dictionary;
  regionCode: RegionCode;
  isSubscribed: boolean;
};

export function WelcomeSummaryCard({ theme, t, regionCode, isSubscribed }: Props) {
  return (
    <SurfaceCard theme={theme} variant="hero" style={welcomeSummaryCardStyles.card}>
      <View style={welcomeSummaryCardStyles.header}>
        <View
          style={[
            welcomeSummaryCardStyles.accent,
            {
              backgroundColor:
                theme.mode === 'dark' ? 'rgba(244,214,148,0.16)' : 'rgba(232,190,100,0.14)',
            },
          ]}
        />
        <Text style={[welcomeSummaryCardStyles.title, { color: theme.colors.text }]}>{t.meditations.welcome}</Text>
      </View>

      <Text style={[welcomeSummaryCardStyles.text, { color: theme.colors.textMuted }]}>{t.meditations.settingsHint}</Text>

      <View style={welcomeSummaryCardStyles.pills}>
        <Pill theme={theme} title={t.regions[regionCode]} />
        <Pill theme={theme} title={isSubscribed ? t.meditations.premium : t.meditations.upgrade} tone={isSubscribed ? 'success' : 'default'} />
      </View>
    </SurfaceCard>
  );
}
