import { StyleSheet } from 'react-native';

export const sectionHeaderStyles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
  },
  rootCentered: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  textWrap: {
    flex: 1,
    gap: 6,
  },
  textWrapCentered: {
    alignItems: 'center',
  },
  eyebrow: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 1.1,
  },
  eyebrowCentered: {
    textAlign: 'center',
  },
  title: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '900',
    letterSpacing: -0.4,
  },
  titleCompact: {
    fontSize: 20,
    lineHeight: 26,
    fontWeight: '800',
    letterSpacing: -0.2,
  },
  titleCentered: {
    textAlign: 'center',
  },
  caption: {
    fontSize: 14,
    lineHeight: 21,
    maxWidth: 540,
  },
  captionCompact: {
    fontSize: 13,
    lineHeight: 19,
    maxWidth: 540,
  },
  captionCentered: {
    textAlign: 'center',
  },
  accessoryWrap: {
    alignSelf: 'flex-start',
  },
});
