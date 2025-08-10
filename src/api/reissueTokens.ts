import axios from 'axios';
import { getRefreshToken, saveTokens } from '../utils/tokenStorage';

const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;
if (!baseUrl) throw new Error('EXPO_PUBLIC_BASE_URL is not defined.');

const reissueTokens = async () => {
  try {
    const refreshToken = await getRefreshToken();
    if (!refreshToken) {
      console.warn('No refresh token found');
      return null;
    }

    const { data } = await axios.post(
      `${baseUrl}/v1/users/reissue`,
      {},
      { headers: { Authorization: `Bearer ${refreshToken}` } },
    );

    const { accessToken, refreshToken: newRefreshToken } = data;

    await saveTokens(accessToken, newRefreshToken);

    return { accessToken, refreshToken: newRefreshToken };
  } catch (error: unknown) {
    if (typeof error === 'object' && error && 'isAxiosError' in (error as any)) {
      const err = error as import('axios').AxiosError<any>;
      console.error('토큰 재발급 실패 status:', err.response?.status, 'message:', err.message);
    } else {
      console.error('토큰 재발급 실패:', (error as Error)?.message ?? error);
    }
    return null;
  }
};

export default reissueTokens;
