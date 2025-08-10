import * as Keychain from 'react-native-keychain';
import apiClient from './client';
import { saveTokens } from '../utils/tokenStorage';

const reissueTokens = async () => {
  try {
    const refreshTokenCreds = await Keychain.getGenericPassword({
      service: 'com.kkukmoa.refreshToken',
    });

    if (!refreshTokenCreds) {
      console.warn('No refresh token found');
      return null;
    }

    const refreshToken = refreshTokenCreds.password;

    const { data } = await apiClient.post(
      '/v1/users/reissue',
      {},
      { headers: { Authorization: `Bearer ${refreshToken}` } },
    );

    const { accessToken, refreshToken: newRefreshToken } = data;

    await saveTokens(accessToken, newRefreshToken);

    return { accessToken, refreshToken: newRefreshToken };
  } catch (error) {
    console.error('토큰 재발급 실패:', error);
    return null;
  }
};

export default reissueTokens;
