import { StyleSheet } from 'react-native';

export const IMAGE_TEXT = '#F8FBFF';
export const IMAGE_TEXT_MUTED = 'rgba(248,251,255,0.92)';
export const BADGE_BG = 'rgba(7, 12, 24, 0.58)';
export const BASE_OVERLAY = 'rgba(6, 10, 20, 0.28)';
export const BOTTOM_SCRIM = 'rgba(6, 10, 20, 0.62)';

export const sessionCardStyles = StyleSheet.create({
  card: {
    height: 184,
    borderRadius: 24,
    overflow: 'hidden',
  },
  locked: {
    opacity: 0.96,
  },
  pressed: {
    transform: [{ scale: 0.988 }],
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  bottomScrim: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '58%',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 18,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  metaBadge: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '800',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    overflow: 'hidden',
    textShadowColor: 'rgba(0,0,0,0.4)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  bottomBlock: {
    gap: 8,
    paddingTop: 16,
  },
  title: {
    color: IMAGE_TEXT,
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '900',
    maxWidth: '86%',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  hint: {
    color: IMAGE_TEXT_MUTED,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '700',
    textShadowColor: 'rgba(0,0,0,0.45)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 5,
  },
});
