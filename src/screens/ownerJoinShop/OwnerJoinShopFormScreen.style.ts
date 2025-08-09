import { StyleSheet } from 'react-native';
import colors from '../../design/colors';

export default StyleSheet.create({
  screen: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 26,
  },
  title: {
    fontSize: 18,
    color: colors.light.black,
    textAlign: 'center',
    paddingVertical: 21,
    fontWeight: 'bold',
  },
  formContainer: {
    gap: 32,
    marginBottom: 54,
  },
  storeAddressFormContainer: {
    gap: 4,
  },
  bottomContainer: {
    backgroundColor: colors.light.white,
    padding: 20,
    shadowColor: '#6C3131',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 10,
  },
  button: {
    marginVertical: 20,
  },
  label: {
    fontSize: 14,
    color: colors.light.black,
    fontFamily: 'Pretendard-Regular',
    marginLeft: 8,
    marginBottom: 8,
  },
  required: {
    color: colors.light.main,
    fontFamily: 'Pretendard-Bold',
  },
  mapButton: {
    backgroundColor: colors.light.white,
  },
  fileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: colors.light.gray2,
  },
  fileRowError: {
    borderColor: colors.light.main,
  },
  fileSelectText: {
    fontSize: 12,
    backgroundColor: colors.light.gray1,
    paddingHorizontal: 12,
    paddingVertical: 5,
    fontFamily: 'Pretendard-Medium',
    borderRadius: 30,
  },
  fileName: {
    color: colors.light.gray2,
    fontSize: 14,
  },
  fileNameError: {
    color: colors.light.main,
    fontSize: 14,
  },
});
