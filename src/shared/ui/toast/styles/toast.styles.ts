import { StyleSheet } from 'react-native';

export const toastStyles = StyleSheet.create({
  viewport: {
    position: 'absolute',
    top: 18,
    left: 14,
    right: 14,
    gap: 10,
    zIndex: 100,
  },
  card: {
    overflow: 'hidden',
    borderRadius: 22,
    borderWidth: 1,
    elevation: 6,
  },
  accent: {
    height: 4,
    width: '100%',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    paddingHorizontal: 14,
    paddingVertical: 13,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    flexShrink: 0,
  },
  textWrap: {
    flex: 1,
    gap: 3,
  },
  title: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '900',
  },
  message: {
    fontSize: 12,
    lineHeight: 17,
    fontWeight: '500',
  },
  closeButton: {
    width: 28,
    height: 28,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -2,
  },
  closeButtonPressed: {
    opacity: 0.7,
  },
  closeButtonText: {
    fontSize: 18,
    lineHeight: 18,
    fontWeight: '800',
  },
});
