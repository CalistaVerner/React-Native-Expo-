import { StyleSheet } from 'react-native';

export const meditationsStyles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
  },
  topBarTextWrap: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
  },
  subtitle: {
    fontSize: 14,
    marginTop: 6,
    lineHeight: 20,
  },
  settingsButton: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 10,
    alignSelf: 'flex-start',
  },
  settingsText: {
    fontSize: 13,
    fontWeight: '800',
  },
  welcomeCard: {
    gap: 16,
  },
  welcomeAccentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  welcomeAccent: {
    width: 12,
    height: 42,
    borderRadius: 999,
  },
  welcomeTitle: {
    flex: 1,
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '900',
  },
  welcomeText: {
    fontSize: 14,
    lineHeight: 20,
  },
  quickMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  metaPill: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  metaPillText: {
    fontSize: 12,
    fontWeight: '800',
  },
  aiCard: {
    gap: 16,
  },
  output: {
    borderRadius: 18,
    padding: 16,
  },
  outputText: {
    fontSize: 15,
    lineHeight: 23,
  },
  promptBox: {
    padding: 14,
    borderRadius: 16,
  },
  promptLabel: {
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 8,
  },
  promptText: {
    fontSize: 12,
    lineHeight: 18,
  },
});
