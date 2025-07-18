import { StyleSheet } from 'react-native';
import colors from '../../../design/colors';

export default StyleSheet.create({
  wrapper: {
    width: '100%',
    alignItems: 'center',
  },
  searchBar: {
    backgroundColor: colors.light.white,
    borderRadius: 30,
  },
  iconWrapper: {
    position: 'absolute',
    right: 45,
    top: 14,
  },
});
