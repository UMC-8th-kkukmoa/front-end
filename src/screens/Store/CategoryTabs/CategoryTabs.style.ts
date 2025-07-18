import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  scrollContainer: {
    flexDirection: 'row',
    gap: 7,
    paddingHorizontal: 25,
    paddingVertical: 5,
    marginTop: 10,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    shadowColor: 'rgb(108, 49, 49)',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 4,
    alignSelf: 'flex-start',
  },
});
