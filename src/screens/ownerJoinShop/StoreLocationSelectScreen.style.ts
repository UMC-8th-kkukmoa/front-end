import { StyleSheet } from 'react-native';
import colors from '../../design/colors';

export default StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.light.white,
  },
  mapContainer: {
    flex: 1,
  },
  pinOverlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -16,
    marginLeft: -16,
  },
  footer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    backgroundColor: colors.light.white,
  },
  locationTextWrap: {
    gap: 4,
  },
  locationTitle: {
    fontSize: 12,
    color: colors.light.gray2,
    fontFamily: 'Pretendard-Medium',
  },
  locationValue: {
    fontSize: 16,
    color: colors.light.black,
    fontFamily: 'Pretendard-Bold',
  },
  coordValue: {
    fontSize: 12,
    color: colors.light.gray2,
    fontFamily: 'Pretendard-Regular',
  },
});
