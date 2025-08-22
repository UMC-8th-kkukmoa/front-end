import { StyleSheet } from 'react-native';
import colors from '../../design/colors';

export default StyleSheet.create({
  sheet: {
    backgroundColor: colors.light.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingBottom: 20,
  },
  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 25.5,
    paddingHorizontal: 36,
  },
  sheetTitle: {
    fontSize: 20,
    fontFamily: 'Pretendard-Bold',
  },
  sheetItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 21,
    paddingHorizontal: 20,
  },
  sheetItemTxt: {
    marginLeft: 23,
    fontSize: 17,
    fontFamily: 'Pretendard-Medium',
    color: colors.light.black,
  },
});
