import axios from 'axios';
import { Platform } from 'react-native';
import { getGenericPassword } from 'react-native-keychain';

const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;
if (!baseUrl) {
  throw new Error('EXPO_PUBLIC_BASE_URL is not defined.');
}

const apiClient = axios.create({
  baseURL: baseUrl,
});

apiClient.interceptors.request.use(async (config) => {
  const newConfig = { ...config };
  // react-native-keychain은 RN에서만 사용 가능함
  if (Platform.OS !== 'web') {
    try {
      const credential = await getGenericPassword();
      if (credential && credential.password) {
        newConfig.headers.Authorization = `Bearer ${credential.password}`;
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to get credential', error);
    }
  }

  return newConfig;
});

export default apiClient;
