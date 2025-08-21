import { StyleSheet } from 'react-native';
import colors from '../../design/colors';

export default StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.light.white,
  },

  // 헤더
  header: {
    paddingHorizontal: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.light.white,
    paddingVertical: 20,
  },

  backBtn: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 17,
    fontFamily: 'Pretendard-Bold',
    color: colors.light.black,
  },
  topShadow: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: -20,
    height: 20,
  },
  // 스토어 이름
  storeNameBox: {
    alignSelf: 'center',
    paddingVertical: 15,
    marginTop: 18,
  },
  storeName: {
    color: colors.light.black,
    fontFamily: 'Pretendard-Bold',
    fontSize: 20,
  },

  body: {
    flex: 1,
    paddingHorizontal: 16,
  },

  // 사진 첨부
  choiceArea: {
    paddingVertical: 7.5,
    paddingHorizontal: 26,
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.light.main,
    borderWidth: 1,
    borderRadius: 30,
    paddingVertical: 12,
  },
  sectionTitle: {
    marginLeft: 7,
    fontSize: 14,
    fontFamily: 'Pretendard-Medium',
    color: colors.light.main,
    lineHeight: 24,
    letterSpacing: 0.5,
  },

  // 사진
  photoArea: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  photoBox: {
    width: 90,
    height: 90,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  remove: {
    position: 'absolute',
    top: 7,
    right: 6,
  },

  // 내용
  inputArea: {
    paddingVertical: 6,
    paddingHorizontal: 14,
  },
  input: {
    minHeight: 189,
    borderRadius: 20,
    borderWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 20,
    textAlignVertical: 'top',
    fontSize: 15,
    color: colors.light.black,
  },

  submitBtn: {
    marginTop: 10,
    paddingHorizontal: 28.5,
  },
});
