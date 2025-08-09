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
  textbox: {
    marginBottom: 16,
  },
  agreementContainer: {
    marginHorizontal: 8,
    gap: 12,
  },
  agreementRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  agreementText: {
    marginLeft: 8,
    fontSize: 15,
    color: colors.light.black,
    fontFamily: 'Pretendard-Regular',
  },
  requiredText: {
    color: colors.light.main,
    fontFamily: 'Pretendard-Bold',
  },
  bottomContainer: {
    backgroundColor: colors.light.white,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  allAgreementContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  formContainer: {
    gap: 12,
  },
  allAgreementRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  allAgreementText: {
    marginLeft: 10,
    fontSize: 16,
    color: colors.light.black,
    fontFamily: 'Pretendard-Regular',
  },
  button: {
    marginTop: 20,
  },
  checkbox: {
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusIcon: {
    fontSize: 24,
    color: colors.light.gray2,
  },
});
