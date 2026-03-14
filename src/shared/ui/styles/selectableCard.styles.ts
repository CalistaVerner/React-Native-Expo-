import { StyleSheet } from 'react-native';

export const selectableCardStyles = StyleSheet.create({
  pressableBase: {
    minHeight: 64,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  pressableSelected: {
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.18,
    shadowRadius: 22,
    elevation: 3,
  },
  pressableCompact: {
    minHeight: 52,
    borderRadius: 18,
  },
  content: {
    gap: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 10,
  },
  titleWrap: {
    flex: 1,
    gap: 6,
  },
  title: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '800',
  },
  description: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  statusWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusDot: {
    width: 9,
    height: 9,
    borderRadius: 999,
  },
  statusText: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '800',
  },
  accessory: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '800',
  },
  badgeWrap: {
    alignSelf: 'flex-start',
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '900',
    overflow: 'hidden',
  },
});
