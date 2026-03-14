import { StyleSheet } from 'react-native';

export const affirmationSectionStyles = StyleSheet.create({
  card: {
    gap: 18,
  },
  panelStack: {
    gap: 12,
  },
  resultPanel: {
    borderRadius: 22,
    paddingHorizontal: 18,
    paddingVertical: 16,
    gap: 8,
  },
  resultEyebrow: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0.7,
  },
  resultText: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  promptPanel: {
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 8,
  },
  promptEyebrow: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.65,
  },
  promptText: {
    fontSize: 12,
    lineHeight: 18,
  },
});
