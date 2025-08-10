import * as Keychain from 'react-native-keychain';
import axios from 'axios';
import { saveTokens } from '../utils/tokenStorage';

const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;
if (!baseUrl) throw new Error('EXPO_PUBLIC_BASE_URL is not defined.');

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

    const { data } = await axios.post(
      `${baseUrl}/v1/users/reissue`,
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
