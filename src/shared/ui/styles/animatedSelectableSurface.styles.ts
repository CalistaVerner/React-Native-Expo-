import { StyleSheet } from 'react-native';

export const animatedSelectableSurfaceStyles = StyleSheet.create({
  tintLayer: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 20,
  },
  ring: {
    ...StyleSheet.absoluteFillObject,
    borderWidth: 1.5,
    borderRadius: 20,
  },
  indicator: {
    position: 'absolute',
    top: 12,
    right: 12,
    minWidth: 24,
    height: 24,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 4,
  },
  indicatorText: {
    fontSize: 13,
    lineHeight: 14,
    fontWeight: '900',
  },
});
