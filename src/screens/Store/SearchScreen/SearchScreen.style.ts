import { StyleSheet } from 'react-native';
import colors from '../../../design/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.08)',
  },
  backButton: {
    paddingLeft: 20,
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
    right: 20,
    top: 17,
  },
  body: {
    flex: 1,
  },
});
