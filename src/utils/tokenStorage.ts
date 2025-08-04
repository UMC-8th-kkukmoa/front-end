import * as Keychain from 'react-native-keychain';

const saveTokens = async (accessToken: string, refreshToken: string) => {
  try {
    await Keychain.setGenericPassword('accessToken', accessToken, {
      service: 'com.kkukmoa.accessToken',
    });
    await Keychain.setGenericPassword('refreshToken', refreshToken, {
      service: 'com.kkukmoa.refreshToken',
    });
  } catch (error) {
    console.error('Failed to save tokens:', error);
    throw error;
  }
};

export default saveTokens;
