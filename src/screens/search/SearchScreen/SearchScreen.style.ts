import { StyleSheet } from 'react-native';
import colors from '../../../design/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light.white,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.light.white,
    paddingHorizontal: 16,
    padding: 15,
    zIndex: 1,
  },
  backButton: {
    paddingLeft: 16,
    paddingRight: 16.5,
  },
  searchWrapper: {
    alignItems: 'center',
    flex: 1,
    position: 'relative',
  },
  textBox: {
    width: '100%',
    borderRadius: 50,
    backgroundColor: colors.light.white,
    shadowColor: colors.light.shadow,
    shadowOpacity: 0.1,
    shadowOffset: { width: 1.02, height: 3.07 },
    shadowRadius: 3,
    elevation: 10,
  },
  iconWrapper: {
    position: 'absolute',
    right: 15,
    top: 12,
  },
  body: {
    flex: 1,
  },
  bottomShadow: {
    height: 20,
  },
  emptyResultContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  emptyResultText: {
    fontSize: 16,
    fontFamily: 'Pretendard-Regular',
    color: colors.light.gray2,
  },
  errorContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  errorText: {
    fontSize: 16,
    fontFamily: 'Pretendard-Regular',
    color: colors.light.gray2,
  },
  flatList: {
    paddingVertical: 7,
    paddingHorizontal: 16,
  },
  searchListItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    gap: 9,
  },
  searchListItemText: {
    fontSize: 16,
  },
  highlightText: {
    color: '#E17B43',
  },
  searchIconMargin: {
    marginRight: 8,
  },
  iconButtonMargin: {
    margin: 5,
  },
});
