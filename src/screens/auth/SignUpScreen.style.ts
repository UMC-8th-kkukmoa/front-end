import { StyleSheet } from 'react-native';
import colors from '../../design/colors';

export default StyleSheet.create({
  progressBarContainer: {
    alignItems: 'center',
    padding: 23,
    marginBottom: 20,
  },
  progressBarBackground: {
    width: '100%',
    height: 15.8,
    borderRadius: 15,
    backgroundColor: colors.light.main,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressText: {
    fontSize: 12.64,
    fontWeight: '600',
    color: colors.light.main,
  },
  headerContainer: {
    flex: 1,
    backgroundColor: colors.light.white,
  },
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: colors.light.white,
    paddingHorizontal: 16,
  },
  smallbox: {
    flex: 1,
    marginRight: 16,
    position: 'relative',
  },
  form: {
    paddingHorizontal: 16,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 36,
  },
  message: {
    position: 'absolute',
    left: 0,
    bottom: -18,
    fontWeight: '400',
    lineHeight: 14,
    letterSpacing: 0.4,
    marginTop: 6,
    marginLeft: 18,
    color: colors.light.main,
    fontSize: 12,
  },
  messageSuccess: {
    position: 'absolute',
    left: 0,
    bottom: -18,
    fontWeight: '400',
    lineHeight: 14,
    letterSpacing: 0.4,
    marginTop: 6,
    marginLeft: 18,
    color: colors.light.gray2,
    fontSize: 12,
  },
  button: {
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 70,
  },
});
