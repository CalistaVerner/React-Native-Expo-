import { StyleSheet } from 'react-native';

export const appModalStyles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(4, 8, 18, 0.48)',
  },
  overlayPressable: {
    flex: 1,
  },
  panel: {
    borderWidth: 1,
    borderRadius: 28,
    paddingHorizontal: 18,
    paddingVertical: 18,
    gap: 18,
    shadowOffset: { width: 0, height: 18 },
    shadowOpacity: 0.18,
    shadowRadius: 28,
    elevation: 8,
  },
  dragHandleWrap: {
    alignItems: 'center',
    marginTop: -6,
    marginBottom: 6,
  },
  dragHandle: {
    width: 44,
    height: 5,
    borderRadius: 999,
    opacity: 0.84,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
  },
  iconWrap: {
    width: 46,
    height: 46,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  textWrap: {
    flex: 1,
    gap: 8,
  },
  title: {
    fontSize: 19,
    lineHeight: 24,
    fontWeight: '900',
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
  },
  actions: {
    gap: 10,
  },
});
