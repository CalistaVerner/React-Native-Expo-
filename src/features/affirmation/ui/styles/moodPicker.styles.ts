import { StyleSheet } from 'react-native';

export const moodPickerStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 16,
  },
  cell: {
    flex: 1,
  },
  emoji: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 32,
  },
});
