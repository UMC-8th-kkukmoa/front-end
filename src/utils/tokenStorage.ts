import * as Keychain from 'react-native-keychain';

export const saveTokens = async (accessToken: string, refreshToken: string) => {
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

export const getAccessToken = async () => {
  const creds = await Keychain.getGenericPassword({
    service: 'com.kkukmoa.accessToken',
  });
  return creds ? creds.password : null;
};

export const getRefreshToken = async () => {
  const creds = await Keychain.getGenericPassword({
    service: 'com.kkukmoa.refreshToken',
  });
  return creds ? creds.password : null;
};
