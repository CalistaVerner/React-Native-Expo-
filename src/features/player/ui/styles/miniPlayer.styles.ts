import { StyleSheet } from 'react-native';

export const miniPlayerStyles = StyleSheet.create({
  root: {
    position: 'absolute',
    left: 16,
    right: 16,
    zIndex: 40,
  },
  card: {
    borderWidth: 1,
    borderRadius: 24,
    overflow: 'hidden',
    padding: 14,
    gap: 14,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  artwork: {
    width: 60,
    height: 60,
    borderRadius: 18,
  },
  textWrap: {
    flex: 1,
    gap: 4,
  },
  eyebrow: {
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
  },
  subtitle: {
    fontSize: 13,
    fontWeight: '600',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  action: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  actionPressed: {
    opacity: 0.84,
    transform: [{ scale: 0.98 }],
  },
});
