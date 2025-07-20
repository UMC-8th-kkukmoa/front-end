import { StyleSheet } from 'react-native';
import colors from '../../../design/colors';

export default StyleSheet.create({
  floatingButtonGroup: {
    position: 'absolute',
    left: 14,
    bottom: 130,
    zIndex: 0,
    gap: 12,
    padding: 10,
  },
  floatingButton: {
    borderRadius: 25,
    backgroundColor: colors.light.white,
    shadowColor: 'rgb(108, 49, 49)',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0.51, height: 1.53 },
    shadowRadius: 3,
    elevation: 5,
    padding: 13,
  },
});
