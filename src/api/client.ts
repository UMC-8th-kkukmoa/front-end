import axios from 'axios';
import { Platform } from 'react-native';
import { getGenericPassword, setGenericPassword } from 'react-native-keychain';
import reissueTokens from './reissueTokens';

const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;
if (!baseUrl) {
  throw new Error('EXPO_PUBLIC_BASE_URL is not defined.');
}

const apiClient = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
});

apiClient.interceptors.request.use(async (config) => {
  const newConfig = { ...config };
  // react-native-keychain은 RN에서만 사용 가능함
  if (Platform.OS !== 'web') {
    try {
      const credential = await getGenericPassword({ service: 'com.kkukmoa.accessToken' });
      if (credential) {
        newConfig.headers.Authorization = `Bearer ${credential.password}`;
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to get credential', error);
    }
  }

  return newConfig;
});

// 401 Unauthorized 발생 시 토큰 재발급 후 재요청 처리
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // eslint-disable-next-line no-underscore-dangle
    if (error.response?.status === 401 && !originalRequest._retry) {
      // eslint-disable-next-line no-underscore-dangle
      originalRequest._retry = true;

      const newTokens = await reissueTokens();

      if (newTokens) {
        try {
          await setGenericPassword('accessToken', newTokens.accessToken, {
            service: 'com.kkukmoa.accessToken',
          });

          // 요청 헤더에 새 accessToken 설정
          originalRequest.headers.Authorization = `Bearer ${newTokens.accessToken}`;

          return await apiClient(originalRequest);
        } catch (e) {
          console.error('Failed to update access token in Keychain', e);
          return Promise.reject(error);
        }
      }
    }
    return Promise.reject(error);
  },
);

export default apiClient;
