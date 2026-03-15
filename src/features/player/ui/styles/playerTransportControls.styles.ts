import { StyleSheet } from 'react-native';

export const playerTransportControlsStyles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  control: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  controlPressed: {
    opacity: 0.86,
    transform: [{ scale: 0.98 }],
  },
  primaryControl: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
});
