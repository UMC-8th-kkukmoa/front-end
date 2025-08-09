import { StyleSheet } from 'react-native';
import colors from '../../../design/colors';

export default StyleSheet.create({
  // 리스트 전체
  listContentContainer: {
    paddingHorizontal: 16,
    paddingTop: 7,
    paddingBottom: 150,
  },

  // 리스트 없을때
  emptyWrapper: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 91,
  },

  emptyText: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 14,
    color: colors.light.gray2,
  },

  // 바텀시트 자체
  bottomSheetBackground: {
    backgroundColor: colors.light.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },

  bottomSheetHandle: {
    backgroundColor: colors.light.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },

  // 핸들
  bottomSheetHandleIndicatorWrapper: {
    alignItems: 'center',
    padding: 14,
  },
  bottomSheetHandleIndicator: {
    width: 40,
    height: 4,
    borderRadius: 3,
    backgroundColor: 'rgba(187, 187, 187, 1)',
  },

  // 헤더 (주소-위치 표시)
  header: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  locationText: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 14,
    color: colors.light.gray2,
  },

  // 지도보기 버튼
  mapButton: {
    position: 'absolute',
    bottom: 100,
    alignSelf: 'center',
    zIndex: 100,
    shadowColor: colors.light.shadow,
  },
});
