import { useQuery } from '@tanstack/react-query';
import * as Keychain from 'react-native-keychain';

const getAccessToken = async () => {
  try {
    return await Keychain.getGenericPassword({
      service: 'com.kkukmoa.accessToken',
    });
  } catch (error) {
    console.error('Failed to get access token:', error);
    throw new Error('Failed to retrieve credentials');
  }
};

const useAuth = () => {
  const {
    data: credentials,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['auth', 'accessToken'],
    queryFn: getAccessToken,
    staleTime: Infinity,
    retry: false, // 로컬 키체인에서 불러오기 때문에 재시도 하지 않음
  });

  if (isPending) {
    return { isAuthenticated: null };
  }

  if (isError) {
    return { isAuthenticated: false };
  }

  return { isAuthenticated: !!(credentials && credentials.password) };
};

export default useAuth;
