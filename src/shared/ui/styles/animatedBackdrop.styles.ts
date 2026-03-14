import { StyleSheet } from 'react-native';

export const animatedBackdropStyles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  orb: {
    position: 'absolute',
    borderRadius: 999,
  },
  topOrb: {
    width: 220,
    height: 220,
    top: -56,
    right: -48,
  },
  bottomOrb: {
    width: 180,
    height: 180,
    bottom: 160,
    left: -70,
  },
});
