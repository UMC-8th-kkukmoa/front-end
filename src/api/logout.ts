import * as Keychain from 'react-native-keychain';
import apiClient from './client';
import { getAccessToken, getRefreshToken } from '../utils/tokenStorage';

const logout = async () => {
  try {
    const accessToken = await getAccessToken();
    const refreshToken = await getRefreshToken();

    if (!accessToken || !refreshToken) {
      console.warn('토큰이 없습니다.');
      return;
    }

    const response = await apiClient.post('/v1/users/logout', null, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'refresh-token': refreshToken,
      },
    });

    console.log('로그아웃 성공:', response.data);
  } catch (error: any) {
    if (error.response) {
      console.error('로그아웃 실패 status:', error.response.status);
      console.error('로그아웃 실패 data:', error.response.data);
    } else {
      console.error('로그아웃 실패:', error);
    }
  } finally {
    // 토큰 삭제
    await Keychain.resetGenericPassword({ service: 'com.kkukmoa.accessToken' });
    await Keychain.resetGenericPassword({ service: 'com.kkukmoa.refreshToken' });
  }
};

export default logout;
