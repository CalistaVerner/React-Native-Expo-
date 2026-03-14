import { StyleSheet } from 'react-native';

export const meditationsIntroStyles = StyleSheet.create({
  root: {
    gap: 18,
  },
  settingsButton: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 10,
    alignSelf: 'flex-start',
  },
  settingsButtonPressed: {
    transform: [{ scale: 0.985 }],
  },
  settingsText: {
    fontSize: 13,
    fontWeight: '800',
  },
  heroCard: {
    gap: 18,
  },
  heroLead: {
    flexDirection: 'row',
    gap: 14,
    alignItems: 'flex-start',
  },
  heroAccent: {
    width: 12,
    minHeight: 70,
    borderRadius: 999,
  },
  heroTextWrap: {
    flex: 1,
    gap: 8,
  },
  heroTitle: {
    fontSize: 24,
    lineHeight: 31,
    fontWeight: '900',
    letterSpacing: -0.2,
  },
  heroText: {
    fontSize: 14,
    lineHeight: 21,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  metaPill: {
    minWidth: 120,
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 4,
  },
  metaLabel: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.7,
  },
  metaValue: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '800',
  },
});
