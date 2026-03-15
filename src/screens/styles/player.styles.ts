import { StyleSheet } from 'react-native';

export const playerStyles = StyleSheet.create({
  root: {
    gap: 18,
  },
  topActions: {
    flexDirection: 'row',
    gap: 12,
  },
  heroCard: {
    gap: 18,
  },
  artwork: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 28,
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    lineHeight: 36,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '600',
  },
  statusChipRow: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
  },
  statusChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
  },
  statusChipText: {
    fontSize: 12,
    fontWeight: '800',
  },
  transportCard: {
    gap: 18,
  },
  transportRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  queueCard: {
    gap: 12,
  },
  queueEyebrow: {
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  queueItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  queueTextWrap: {
    flex: 1,
    gap: 4,
  },
  queueTitle: {
    fontSize: 15,
    fontWeight: '700',
  },
  queueSubtitle: {
    fontSize: 13,
    fontWeight: '600',
  },
  demoNote: {
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 20,
  },
  emptyCard: {
    gap: 14,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '800',
  },
  emptyText: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '500',
  },
});
