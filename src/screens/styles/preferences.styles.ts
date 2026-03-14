import { StyleSheet } from 'react-native';

export const preferencesStyles = StyleSheet.create({
  card: {
    gap: 14,
  },
  label: {
    fontSize: 16,
    fontWeight: '800',
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
  previewRow: {
    flexDirection: 'row',
    gap: 10,
  },
  previewTile: {
    flex: 1,
    borderRadius: 18,
    padding: 14,
  },
  previewCaption: {
    fontSize: 12,
    fontWeight: '700',
  },
  previewValue: {
    fontSize: 19,
    lineHeight: 24,
    fontWeight: '900',
    marginTop: 8,
  },
  metaText: {
    fontSize: 12,
    lineHeight: 18,
  },
  footerActions: {
    gap: 12,
  },
  savedText: {
    fontSize: 12,
    textAlign: 'center',
  },
});
