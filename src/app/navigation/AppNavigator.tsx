import React from 'react';
import { useAppContext } from '../state/AppContext';
import MeditationsScreen from '../../screens/MeditationsScreen';
import PaywallScreen from '../../screens/PaywallScreen';
import PlayerScreen from '../../screens/PlayerScreen';
import PreferencesScreen from '../../screens/PreferencesScreen';

export function AppNavigator() {
  const { screen } = useAppContext();

  switch (screen) {
    case 'paywall':
      return <PaywallScreen />;
    case 'meditations':
      return <MeditationsScreen />;
    case 'preferences':
      return <PreferencesScreen />;
    case 'player':
      return <PlayerScreen />;
    default:
      return <MeditationsScreen />;
  }
}
