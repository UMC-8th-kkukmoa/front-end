import { StyleSheet } from 'react-native';
import colors from '../../../design/colors';

export default StyleSheet.create({
  shadowWrapper: {
    marginBottom: 10,
    borderRadius: 20,
    shadowColor: colors.light.shadow,
    shadowOpacity: 0.15,
    shadowOffset: { width: 1.02, height: 3.07 },
    shadowRadius: 3,
    elevation: 4,
    backgroundColor: colors.light.white, // 그림자 표시용 배경색
  },
  card: {
    width: 144,
    height: 167,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: colors.light.gray1_35,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    height: 57,
    width: '100%',
  },
  textContainer: {
    position: 'absolute',
    top: 120,
    left: 11,
    right: 11,
  },
  name: {
    color: colors.light.white,
    fontWeight: '700',
    fontFamily: 'Pretendard-Bold',
    fontSize: 13,
    marginBottom: 2,
  },
  text: {
    fontFamily: 'Pretendard-Medium',
    color: colors.light.white,
    fontSize: 10,
  },
});
