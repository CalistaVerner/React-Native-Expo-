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
  iconWrap: {
    width: 42,
    height: 42,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
});
