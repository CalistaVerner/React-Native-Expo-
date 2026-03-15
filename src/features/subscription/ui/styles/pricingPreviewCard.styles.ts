import { StyleSheet } from 'react-native';

export const pricingPreviewCardStyles = StyleSheet.create({
  card: {
    gap: 14,
  },
  previewRow: {
    flexDirection: 'row',
    gap: 10,
  },
  previewTile: {
    flex: 1,
    borderRadius: 18,
    padding: 14,
    gap: 6,
  },
  previewCaption: {
    fontSize: 12,
    lineHeight: 16,
  },
  previewValue: {
    fontSize: 18,
    fontWeight: '800',
  },
  metaText: {
    fontSize: 12,
    lineHeight: 18,
  },
});
