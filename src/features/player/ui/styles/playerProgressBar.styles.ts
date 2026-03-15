import { StyleSheet } from 'react-native';

export const playerProgressBarStyles = StyleSheet.create({
  root: {
    gap: 10,
  },
  bar: {
    height: 8,
    borderRadius: 999,
    overflow: 'hidden',
    position: 'relative',
  },
  fill: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    borderRadius: 999,
  },
  thumb: {
    position: 'absolute',
    top: -4,
    width: 16,
    height: 16,
    borderRadius: 999,
    borderWidth: 2,
    marginLeft: -8,
  },
  labels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
  },
});
