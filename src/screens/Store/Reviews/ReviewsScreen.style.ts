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
  // 상단 그림자
  topShadow: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 20,
  },

  // 스크롤 헤더(배너/카운트)
  banner: {
    height: 200,
    backgroundColor: colors.light.gray1_35,
  },
  // 그림자
  bottomShadow: {
    height: 20,
  },
  headerBlock: {
    paddingHorizontal: 20,
    paddingVertical: 13,
  },
  countReview: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 17,
    color: colors.light.black,
  },

  // 리뷰 아이템
  reviewCard: {
    paddingVertical: 6,
    paddingBottom: 20,
  },
  row: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.light.sub,
    shadowColor: colors.light.shadow,
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 1.02, height: 3.07 },
    elevation: 4,

    marginRight: 8,
  },
  name: {
    fontSize: 18,
    fontFamily: 'Pretendard-Bold',
    color: colors.light.black,
  },
  content: {
    paddingHorizontal: 20,
    fontSize: 15,
    fontFamily: 'Pretendard-Medium',
    lineHeight: 20,
    color: colors.light.black,
    marginVertical: 12.5,
  },

  // 사진 가로 슬라이드
  photoRow: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  photo: {
    marginVertical: 6,
    width: 120,
    height: 120,
    borderRadius: 8.18,
    backgroundColor: colors.light.gray1_35,
    shadowColor: colors.light.shadow,
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 1.02, height: 3.07 },
    elevation: 4,
  },

  // 사장님 댓글
  replyCard: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginVertical: 6,
  },
  replyAvatar: {
    width: 45,
    height: 45,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.light.white,
    shadowColor: colors.light.shadow,
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 1.02, height: 3.07 },
    elevation: 4,
    marginRight: 14,
  },
  replyContent: {
    flex: 1,
    padding: 13,
    borderRadius: 10,
    justifyContent: 'center',
    backgroundColor: colors.light.gray1_35,
  },
  replyOwnerName: {
    fontSize: 16,
    fontFamily: 'Pretendard-Bold',
    color: colors.light.black,
    paddingBottom: 13,
  },
  replyText: {
    fontSize: 14,
    fontFamily: 'Pretendard-Medium',
    color: colors.light.gray2,
  },

  loadingBox: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  loadingText: { marginTop: 8, color: colors.light.gray2 },

  footerLoading: { paddingVertical: 16 },
  footerSpace: { height: 24 },
});

export default styles;
