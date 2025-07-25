import { StyleSheet } from 'react-native';
import colors from '../../design/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light.main,
  },
  headerContainer: {
    backgroundColor: colors.light.main,
    paddingTop: 50,
    paddingBottom: 0,
    paddingHorizontal: 20,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  location: {
    fontSize: 16,
    fontWeight: 'bold',
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
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 20,
    gap: 8,
  },
  iconButton: {
    borderWidth: 1,
    borderColor: colors.light.main,
    borderRadius: 12,
    padding: 12,
    backgroundColor: colors.light.white,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBarContainer: {
    flex: 1,
    transform: [{ scale: 0.85 }],
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
    paddingHorizontal: 23,
    paddingBottom: 120,
  },
});
