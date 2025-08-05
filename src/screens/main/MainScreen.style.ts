import { StyleSheet } from 'react-native';
import colors from '../../design/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light.main,
  },
  headerContainer: {
    backgroundColor: colors.light.main,
    paddingTop: 25,
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
    fontSize: 16,
    fontWeight: '700',
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
    paddingHorizontal: 10,
    marginBottom: 20,
    marginTop: 10,
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 8,
    marginLeft: 10,
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
    width: 210,
    height: 55,
  },
  searchPlaceholder: {
    flex: 1,
    color: colors.light.gray2,
    fontSize: 14,
  },
  banner: {
    marginBottom: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  cardList: {
    flex: 1,
  },
  cardContainer: {
    paddingHorizontal: 18,
  },
});
