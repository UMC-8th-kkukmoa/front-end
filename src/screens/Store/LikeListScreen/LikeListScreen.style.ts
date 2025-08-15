import { StyleSheet } from 'react-native';
import colors from '../../../design/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light.white,
  },

  header: {
    paddingHorizontal: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.light.white,
    paddingVertical: 16,
  },
  backBtn: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 17,
    fontFamily: 'Pretendard-Medium',
    color: colors.light.black,
  },
  topShadow: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 20,
  },

  cardContainer: {
    paddingVertical: 7,
    paddingHorizontal: 16,
    paddingBottom: 120,
  },

  // 리스트 없을때
  emptyWrapper: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 120,
  },

  emptyText: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 15,
    color: colors.light.gray2,
  },
});

export default styles;
