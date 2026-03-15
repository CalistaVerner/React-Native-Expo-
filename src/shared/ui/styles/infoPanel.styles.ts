import { StyleSheet } from 'react-native';

export const infoPanelStyles = StyleSheet.create({
  base: {
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 10,
  },
  emphasis: {
    elevation: 2,
  },
  subtle: {
    elevation: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconWrap: {
    width: 28,
    height: 28,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 14,
    lineHeight: 16,
  },
  title: {
    flex: 1,
    fontSize: 13,
    lineHeight: 16,
    fontWeight: '900',
  },
  body: {
    gap: 8,
  },
});
