import React from 'react';
import { Pressable, Text, View } from 'react-native';
import type { AppTheme } from '../../../shared/theme/themes';
import { SurfaceCard } from '../../../shared/ui/SurfaceCard';
import { SectionHeader } from '../../../shared/ui/SectionHeader';
import type { Dictionary } from '../../../shared/i18n';
import type { RegionCode } from '../../settings/model/types';
import { meditationsIntroStyles } from './styles/meditationsIntroSection.styles';

type Props = {
  theme: AppTheme;
  t: Dictionary;
  isSubscribed: boolean;
  regionCode: RegionCode;
  onOpenSettings: () => void;
};

export function MeditationsIntroSection({ theme, t, isSubscribed, regionCode, onOpenSettings }: Props) {
  return (
    <View style={meditationsIntroStyles.root}>
      <SectionHeader
        theme={theme}
        eyebrow={t.meditations.introEyebrow}
        title={t.meditations.title}
        caption={isSubscribed ? t.meditations.premiumUnlocked : t.meditations.freeMode}
        accessory={
          <Pressable
            onPress={onOpenSettings}
            style={({ pressed }) => [
              meditationsIntroStyles.settingsButton,
              { borderColor: theme.colors.border, backgroundColor: theme.colors.surfaceSoft },
              pressed && meditationsIntroStyles.settingsButtonPressed,
            ]}
          >
            <Text style={[meditationsIntroStyles.settingsText, { color: theme.colors.text }]}>{t.nav.openSettings}</Text>
          </Pressable>
        }
      />

      <SurfaceCard theme={theme} variant="hero" style={meditationsIntroStyles.heroCard}>
        <View style={meditationsIntroStyles.heroLead}>
          <View
            style={[
              meditationsIntroStyles.heroAccent,
              { backgroundColor: theme.mode === 'dark' ? 'rgba(244,214,148,0.16)' : 'rgba(232,190,100,0.14)' },
            ]}
          />
          <View style={meditationsIntroStyles.heroTextWrap}>
            <Text style={[meditationsIntroStyles.heroTitle, { color: theme.colors.text }]}>{t.meditations.welcome}</Text>
            <Text style={[meditationsIntroStyles.heroText, { color: theme.colors.textMuted }]}>{t.meditations.settingsHint}</Text>
          </View>
        </View>

        <View style={meditationsIntroStyles.metaRow}>
          <View style={[meditationsIntroStyles.metaPill, { backgroundColor: theme.colors.surfaceSoft }]}> 
            <Text style={[meditationsIntroStyles.metaLabel, { color: theme.colors.textSubtle }]}>{t.common.current}</Text>
            <Text style={[meditationsIntroStyles.metaValue, { color: theme.colors.text }]}>{t.regions[regionCode]}</Text>
          </View>

          <View
            style={[
              meditationsIntroStyles.metaPill,
              { backgroundColor: isSubscribed ? theme.colors.success : theme.colors.surfaceSoft },
            ]}
          >
            <Text
              style={[
                meditationsIntroStyles.metaValue,
                { color: isSubscribed ? theme.colors.successText : theme.colors.text },
              ]}
            >
              {isSubscribed ? t.meditations.premium : t.meditations.upgrade}
            </Text>
          </View>
        </View>
      </SurfaceCard>
    </View>
  );
}
