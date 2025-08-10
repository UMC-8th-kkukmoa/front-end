import { StyleSheet } from 'react-native';
import colors from '../../../design/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
  },

  // 스토어 사진
  storeImageArea: {
    height: 221,
    backgroundColor: colors.light.gray1_35,
  },

  backButton: {
    position: 'absolute',
    padding: 8,
    left: 16,
    zIndex: 10,
  },

  infoArea: {
    flex: 1,
  },

  // 스토어 정보
  storeInfo: {
    padding: 30,
    borderBottomWidth: 1,
    borderBottomColor: colors.light.gray1,
  },
  titleSection: {
    marginBottom: 45,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  storeName: {
    fontSize: 22,
    fontWeight: '700',
    fontFamily: 'Pretendard-Bold',
    minWidth: 260,
  },
  reviewCount: {
    marginTop: 6,
    fontSize: 11,
    color: colors.light.main,
    fontFamily: 'Pretendard-Regular',
  },

  detailSection: {
    gap: 15,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  detailLabel: {
    color: colors.light.gray2,
    fontWeight: '400',
    fontFamily: 'Pretendard-Regular',
    fontSize: 13,
    marginRight: 10,
  },
  detailText: {
    color: colors.light.black,
    fontWeight: '400',
    fontFamily: 'Pretendard-Regular',
    fontSize: 13,
  },

  // 리뷰
  reviewSection: {
    paddingTop: 24,
  },
  reviewHeader: {
    paddingHorizontal: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  reviewTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    fontFamily: 'Pretendard-Bold',
  },
  buttonWapper: {
    alignItems: 'center',
    paddingHorizontal: 11,
    paddingVertical: 3,
    backgroundColor: colors.light.sub,
    borderRadius: 20,
  },
  seeAllButton: {
    fontSize: 9,
    color: colors.light.white,
    fontWeight: '500',
  },
});
