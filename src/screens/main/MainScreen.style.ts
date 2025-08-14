import { StyleSheet, Platform, StatusBar } from 'react-native';
import colors from '../../design/colors';

const STATUSBAR_HEIGHT = Platform.OS === 'android' ? (StatusBar.currentHeight ?? 0) : 0;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light.main,
  },
  headerContainer: {
    backgroundColor: colors.light.main,
    paddingTop: STATUSBAR_HEIGHT,
    paddingBottom: 0,
    paddingHorizontal: 20,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    margin: 7,
  },
  location: {
    fontSize: 17,
    fontFamily: 'Pretendard-Bold',
    color: colors.light.white,
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  whiteModal: {
    backgroundColor: colors.light.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flex: 1,
    paddingTop: 20,
  },
  searchRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 20,
    marginTop: 10,
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 8,
  },
  iconButton: {
    borderWidth: 1,
    borderColor: colors.light.main,
    backgroundColor: colors.light.white,
    borderRadius: 12,
    width: 65,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBarContainer: {
    flex: 1,
    alignItems: 'center',
  },
  searchTouchable: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.light.white,
    borderColor: colors.light.main,
    borderWidth: 1,
    borderRadius: 30,
    paddingHorizontal: 16,
    marginLeft: 10,
    height: 55,
    flex: 1,
  },
  searchPlaceholder: {
    flex: 1,
    color: colors.light.gray2,
    fontSize: 14,
    fontFamily: 'Pretendard-Medium',
  },
  banner: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginBottom: 16,
  },
  cardContainer: {
    paddingHorizontal: 16,
  },
  loading: {
    alignItems: 'center',
    paddingBottom: '50%',
    color: colors.light.main,
  },
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
});
