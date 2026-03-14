import React from 'react';
import { useAppContext } from '../state/AppContext';
import MeditationsScreen from '../../screens/MeditationsScreen';
import PaywallScreen from '../../screens/PaywallScreen';
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
    default:
      return <MeditationsScreen />;
  }
}
