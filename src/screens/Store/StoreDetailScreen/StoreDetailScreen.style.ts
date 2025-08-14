import { StyleSheet } from 'react-native';
import colors from '../../../design/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light.white,
  },

  header: {
    paddingHorizontal: 28,
    backgroundColor: colors.light.white,
    paddingVertical: 16,
  },

  backButton: {
    width: 24, // 상단 헤더 전체가 눌리기에 하드코딩으로 제어
    justifyContent: 'center',
  },
  // 스토어 사진
  storeImageArea: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 170,
    backgroundColor: colors.light.gray1_35,
  },
  storeImage: {
    width: '100%',
    height: '100%',
  },

  infoArea: {
    flex: 1,
  },

  // 그림자
  bottomShadow: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 20,
  },

  // 스토어 정보
  storeInfo: {
    padding: 30,
    borderBottomWidth: 1,
    borderBottomColor: colors.light.gray1,
  },
  titleSection: {
    marginBottom: 43,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  storeName: {
    fontSize: 22,
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
    marginBottom: 26,
  },
  reviewTitle: {
    fontSize: 22,
    fontFamily: 'Pretendard-Bold',
  },
  buttonWrapper: {
    alignItems: 'center',
    paddingHorizontal: 11,
    paddingVertical: 3,
    backgroundColor: colors.light.sub,
    borderRadius: 20,
  },
  seeAllButton: {
    fontSize: 9,
    color: colors.light.white,
    fontFamily: 'Pretendard-Regular',
  },
});
