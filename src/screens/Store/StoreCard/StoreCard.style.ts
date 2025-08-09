import { StyleSheet } from 'react-native';
import colors from '../../../design/colors';

export default StyleSheet.create({
  card: {
    position: 'relative',
    backgroundColor: colors.light.white,
    overflow: 'hidden',
    shadowColor: colors.light.shadow,
    borderRadius: 20,
    marginBottom: 23,
    elevation: 4,
  },
  image: {
    width: '100%',
    height: 97,
  },
  categoryBadge: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    top: 14,
    left: 14,
    backgroundColor: colors.light.white,
    borderRadius: 55,
    shadowColor: colors.light.shadow,
    shadowOpacity: 0.15,
    shadowOffset: { width: 0.72, height: 2.15 },
    shadowRadius: 3,
    elevation: 4,
    paddingHorizontal: 6.3,
    paddingVertical: 4,
  },
  categoryLabel: {
    fontFamily: 'Pretendard-Regular',
    marginBottom: 2.3,
    color: colors.light.gray2,
    marginLeft: 3.5,
    fontSize: 8.3,
    lineHeight: 12.4,
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    height: 101,
  },
  title: {
    fontFamily: 'Pretendard-Bold',
    width: 210,
    fontSize: 20,
    marginBottom: 10,
    color: colors.light.black,
    minHeight: 48,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subInfo: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 9,
    color: colors.light.gray2,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 0.5,
    borderRadius: 12,
    borderWidth: 0.6,
    borderColor: colors.light.gray1,
  },
  tagText: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 9,
    lineHeight: 16,
    color: colors.light.gray2,
  },
  heart: {
    position: 'absolute',
    top: 12,
    right: 12,
    margin: 6,
  },
});
