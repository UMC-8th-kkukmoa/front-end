import { StyleSheet } from 'react-native';
import colors from '../../../design/colors';

export default StyleSheet.create({
  card: {
    position: 'relative',
    backgroundColor: colors.light.white,
    overflow: 'hidden',
    shadowColor: 'rgb(108, 49, 49)',
    borderRadius: 20,
    marginBottom: 23,
    elevation: 4,
  },
  image: {
    width: '100%',
    height: 120,
  },
  categoryBadge: {
    position: 'absolute',
    top: 2,
    left: 10,
    elevation: 3,
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    height: 115,
  },
  title: {
    width: 210,
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 13,
    color: colors.light.black,
    minHeight: 48,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subInfo: {
    fontSize: 10,
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
    fontSize: 10,
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
