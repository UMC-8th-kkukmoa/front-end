import * as Keychain from 'react-native-keychain';

const ACCESS_TOKEN_KEY = 'com.kkukmoa.accessToken';
const REFRESH_TOKEN_KEY = 'com.kkukmoa.refreshToken';
const ROLES_KEY = 'com.kkukmoa.userRoles';

export const saveTokens = async (accessToken: string, refreshToken: string) => {
  try {
    await Keychain.setGenericPassword('accessToken', accessToken, {
      service: ACCESS_TOKEN_KEY,
    });
    await Keychain.setGenericPassword('refreshToken', refreshToken, {
      service: REFRESH_TOKEN_KEY,
    });
  } catch (error) {
    console.error('Failed to save tokens:', error);
    throw error;
  }
};

export const getAccessToken = async (): Promise<string | null> => {
  try {
    const creds = await Keychain.getGenericPassword({ service: ACCESS_TOKEN_KEY });
    return creds ? creds.password : null;
  } catch (error) {
    console.error('Failed to get access token:', error);
    return null;
  }
};

export const getRefreshToken = async (): Promise<string | null> => {
  try {
    const creds = await Keychain.getGenericPassword({ service: REFRESH_TOKEN_KEY });
    return creds ? creds.password : null;
  } catch (error) {
    console.error('Failed to get refresh token:', error);
    return null;
  }
};

// Roles 저장/불러오기
export const saveRoles = async (roles: string[]) => {
  await Keychain.setGenericPassword(ROLES_KEY, JSON.stringify(roles), { service: ROLES_KEY });
};

export const getRoles = async (): Promise<string[] | null> => {
  const credentials = await Keychain.getGenericPassword({ service: ROLES_KEY });
  return credentials ? JSON.parse(credentials.password) : null;
};

export const clearAuth = async () => {
  await Keychain.resetGenericPassword({ service: ACCESS_TOKEN_KEY });
  await Keychain.resetGenericPassword({ service: REFRESH_TOKEN_KEY });
  await Keychain.resetGenericPassword({ service: ROLES_KEY });
};
