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

export const getAccessToken = async (): Promise<string | null> => {
  try {
    const creds = await Keychain.getGenericPassword({ service: 'com.kkukmoa.accessToken' });
    return creds ? creds.password : null;
  } catch (error) {
    console.error('Failed to get access token:', error);
    return null;
  }
};

export const getRefreshToken = async (): Promise<string | null> => {
  try {
    const creds = await Keychain.getGenericPassword({ service: 'com.kkukmoa.refreshToken' });
    return creds ? creds.password : null;
  } catch (error) {
    console.error('Failed to get refresh token:', error);
    return null;
  }
};
