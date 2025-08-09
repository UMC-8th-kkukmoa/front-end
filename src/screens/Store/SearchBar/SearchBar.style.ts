import { StyleSheet } from 'react-native';
import colors from '../../../design/colors';

export default StyleSheet.create({
  wrapper: {
    paddingTop: 50,
    paddingBottom: 13,
  },
  searchBar: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
    paddingHorizontal: 16,
  },
  textBox: {
    width: '100%',
    borderRadius: 50,
    backgroundColor: colors.light.white,
    shadowColor: colors.light.shadow,
    shadowOpacity: 0.1,
    shadowOffset: { width: 1.02, height: 3.07 },
    shadowRadius: 3,
    elevation: 10,
  },
  iconWrapper: {
    position: 'absolute',
    right: 34,
    top: 12,
  },
});
