import * as Keychain from 'react-native-keychain';

const saveTokens = async (accessToken: string, refreshToken: string) => {
  await Keychain.setGenericPassword('accessToken', accessToken, {
    service: 'com.kkukmoa.accessToken',
  });
  await Keychain.setGenericPassword('refreshToken', refreshToken, {
    service: 'com.kkukmoa.refreshToken',
  });
};

export default saveTokens;
