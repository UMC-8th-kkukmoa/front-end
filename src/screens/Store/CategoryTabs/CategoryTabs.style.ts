import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  scrollContainer: {
    flexDirection: 'row',
    gap: 7,
    paddingHorizontal: 25,
    paddingVertical: 5,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    shadowColor: 'rgb(108, 49, 49)',
    shadowOpacity: 0.1,
    shadowOffset: { width: 1.12, height: 3.37 },
    shadowRadius: 3,
    elevation: 7,
    alignSelf: 'flex-start',
  },
});
