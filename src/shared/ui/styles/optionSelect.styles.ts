import { StyleSheet } from 'react-native';
import { boxShadow } from './effects';

export const optionSelectStyles = StyleSheet.create({
  container: {
    gap: 10,
  },
  containerGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -5,
  },
  cell: {
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  cellList: {
    width: '100%',
    paddingHorizontal: 0,
  },
  surface: {
    borderWidth: 1,
    overflow: 'hidden',
  },
  surfaceList: {
    minHeight: 76,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  surfaceGrid: {
    minHeight: 116,
    paddingHorizontal: 12,
    paddingVertical: 14,
  },
  surfaceSelected: {
    boxShadow: boxShadow(0, 10, 18, 'rgba(18, 24, 36, 0.16)'),
    elevation: 4,
  },
  surfaceDisabled: {
    opacity: 0.55,
  },
  content: {
    gap: 10,
  },
  contentGrid: {
    flex: 1,
    justifyContent: 'space-between',
  },
  mainRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  mainRowGrid: {
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: 10,
  },
  iconWrap: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    flexShrink: 0,
  },
  iconWrapGrid: {
    alignSelf: 'center',
    width: 46,
    height: 46,
    borderRadius: 16,
  },
  iconText: {
    fontSize: 22,
    lineHeight: 26,
  },
  textWrap: {
    flex: 1,
    gap: 4,
  },
  textWrapGrid: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  titleRowGrid: {
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  title: {
    flexShrink: 1,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '800',
  },
  titleGrid: {
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 18,
  },
  description: {
    fontSize: 12,
    lineHeight: 17,
    fontWeight: '500',
  },
  descriptionGrid: {
    textAlign: 'center',
  },
  trailing: {
    width: 24,
    height: 24,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    flexShrink: 0,
  },
  trailingGrid: {
    alignSelf: 'center',
  },
  checkMark: {
    fontSize: 13,
    lineHeight: 15,
    fontWeight: '900',
  },
  footer: {
    minHeight: 16,
    justifyContent: 'flex-end',
  },
  footerGrid: {
    alignItems: 'center',
  },
  selectionText: {
    fontSize: 11,
    lineHeight: 15,
    fontWeight: '800',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    fontSize: 10,
    lineHeight: 12,
    fontWeight: '900',
    overflow: 'hidden',
  },
});
