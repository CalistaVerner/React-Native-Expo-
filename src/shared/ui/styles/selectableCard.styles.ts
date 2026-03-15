import { StyleSheet } from 'react-native';
import { boxShadow } from './effects';

export const selectableCardStyles = StyleSheet.create({
  pressableBase: {
    minHeight: 64,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  pressableSelected: {
    boxShadow: boxShadow(0, 12, 22, 'rgba(18, 24, 36, 0.18)'),
    elevation: 3,
  },
  pressableCompact: {
    minHeight: 52,
    borderRadius: 18,
  },
  pressableTile: {
    minHeight: 116,
    paddingHorizontal: 12,
    paddingVertical: 14,
  },
  content: {
    gap: 10,
  },
  contentTile: {
    flex: 1,
    justifyContent: 'space-between',
    gap: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 10,
  },
  headerTile: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 8,
  },
  titleWrap: {
    flex: 1,
    gap: 6,
  },
  titleWrapTile: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  titleWrapWithIndicator: {
    paddingRight: 24,
  },
  title: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '800',
  },
  titleTile: {
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 18,
    minHeight: 36,
  },
  description: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '500',
  },
  descriptionTile: {
    textAlign: 'center',
    fontSize: 12,
    lineHeight: 16,
  },
  childrenWrap: {
    alignSelf: 'stretch',
  },
  childrenWrapTile: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  footerTile: {
    justifyContent: 'center',
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
  badgeWrapTile: {
    alignSelf: 'center',
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
