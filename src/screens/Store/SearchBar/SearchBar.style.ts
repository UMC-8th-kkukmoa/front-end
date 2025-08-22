import { StyleSheet } from 'react-native';
import colors from '../../../design/colors';

export default StyleSheet.create({
  searchBarContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 14,
  },
  searchTouchable: {
    paddingVertical: 16,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.light.main,
    borderRadius: 50,
    backgroundColor: colors.light.white,
    shadowColor: colors.light.shadow,
    shadowOpacity: 0.1,
    shadowOffset: { width: 1.02, height: 3.07 },
    shadowRadius: 3,
    elevation: 10,
    flex: 1,
  },
  searchPlaceholder: {
    flex: 1,
    color: colors.light.gray2,
    fontSize: 14,
    fontFamily: 'Pretendard-Medium',
  },
});
