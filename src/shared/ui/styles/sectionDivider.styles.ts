import { StyleSheet } from 'react-native';

export const sectionDividerStyles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  line: {
    flex: 1,
    height: 1,
    opacity: 0.85,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    borderWidth: 1,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 999,
  },
  label: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.85,
  },
});
