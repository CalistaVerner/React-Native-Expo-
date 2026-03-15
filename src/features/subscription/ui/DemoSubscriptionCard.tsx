import React from 'react';
import type { Dictionary } from '../../../shared/i18n';
import type { AppTheme } from '../../../shared/theme/themes';
import { Button } from '../../../shared/ui/Button';
import { SurfaceCard } from '../../../shared/ui/SurfaceCard';
import { SectionHeader } from '../../../shared/ui/SectionHeader';
import { demoSubscriptionCardStyles } from './styles/demoSubscriptionCard.styles';

export function DemoSubscriptionCard({
  theme,
  t,
  isSubscribed,
  onToggle,
}: {
  theme: AppTheme;
  t: Dictionary;
  isSubscribed: boolean;
  onToggle: () => void;
}) {
  return (
    <SurfaceCard theme={theme} style={demoSubscriptionCardStyles.card}>
      <SectionHeader theme={theme} title={t.preferences.subscriptionState} compact />
      <Button
        title={isSubscribed ? t.preferences.subscriptionOn : t.preferences.subscriptionOff}
        onPress={onToggle}
        theme={theme}
        variant="soft"
      />
    </SurfaceCard>
  );
}
