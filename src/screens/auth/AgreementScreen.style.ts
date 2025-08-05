import { StyleSheet } from 'react-native';
import colors from '../../design/colors';

export default StyleSheet.create({
  contain: {
    flex: 1,
    paddingTop: 25,
    backgroundColor: colors.light.white,
  },
  container: {
    flex: 1,
    backgroundColor: colors.light.white,
    padding: 35,
    paddingTop: 40,
  },
  progressBarContainer: {
    marginTop: 15,
    alignItems: 'flex-start',
  },
  progressBarBackground: {
    width: '100%',
    height: 15.8,
    borderRadius: 15,
    backgroundColor: colors.light.gray1,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressBar: {
    width: '50%',
    height: '100%',
    backgroundColor: colors.light.main,
    borderRadius: 15,
  },
  progressText: {
    fontSize: 12.64,
    fontWeight: '600',
    color: colors.light.main,
    paddingLeft: 55,
  },
  agreementList: {
    marginTop: 32,
    flex: 1,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkboxText: {
    fontWeight: '600',
    marginLeft: 10,
    fontSize: 15,
    flex: 1,
  },
  checkboxText2: {
    fontWeight: '500',
    marginLeft: 10,
    fontSize: 15,
    flex: 1,
    color: colors.light.gray2,
  },
  required: {
    color: colors.light.main,
    fontWeight: '600',
  },
  optional: {
    color: colors.light.black,
    fontWeight: '600',
  },
  separator: {
    height: 1,
    backgroundColor: colors.light.gray1,
    marginBottom: 10,
  },
  nextButton: {
    width: '100%',
    marginTop: 50,
  },
});
