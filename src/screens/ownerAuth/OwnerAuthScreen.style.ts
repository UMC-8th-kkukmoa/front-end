import { StyleSheet } from 'react-native';
import colors from '../../design/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light.white,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 100,
    height: 42,
    resizeMode: 'contain',
  },
  formContainer: {
    marginBottom: 65,
    gap: 16,
  },
  input: {
    width: '100%',
  },
  buttonContainer: {},
  loginButton: {
    marginBottom: 56,
  },
  joinButtonContainer: {
    gap: 14,
  },
});
