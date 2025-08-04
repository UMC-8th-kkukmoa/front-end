import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';
import * as Keychain from 'react-native-keychain';
import { TokenResponse } from '../types/kakao';

const KAKAO_LOGIN_URL = process.env.EXPO_PUBLIC_KAKAO_LOGIN_URL;
if (!KAKAO_LOGIN_URL) throw new Error('EXPO_PUBLIC_KAKAO_LOGIN_URL is not defined.');

const saveTokens = async (accessToken: string, refreshToken: string) => {
  await Keychain.setGenericPassword('accessToken', accessToken, {
    service: 'com.kkukmoa.accessToken',
  });
  await Keychain.setGenericPassword('refreshToken', refreshToken, {
    service: 'com.kkukmoa.refreshToken',
  });
};

function timeout(ms: number): Promise<never> {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error('TIMEOUT'));
    }, ms);
  });
}

const handleKakaoLogin = async (): Promise<TokenResponse | null> => {
  try {
    const redirectUrl = Linking.createURL('oauth');
    const loginUrl = `${KAKAO_LOGIN_URL}?redirect_uri=${encodeURIComponent(redirectUrl)}&mobile=true`;

    const timeoutPromise = timeout(60000);

    const result = (await Promise.race([
      WebBrowser.openAuthSessionAsync(loginUrl, redirectUrl, { showInRecents: true }),
      timeoutPromise,
    ])) as WebBrowser.WebBrowserAuthSessionResult;

    if (result.type !== 'success' || !result.url) return null;

    const url = new URL(result.url);
    const encodedToken = url.searchParams.get('token');
    const error = url.searchParams.get('error');
    if (error || !encodedToken) return null;

    let tokenData;
    // 토큰 디코딩
    try {
      // JWT인 경우
      if (encodedToken.includes('.')) {
        const payload = encodedToken.split('.')[1];
        const decodedPayload = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
        const jwtData = JSON.parse(decodedPayload);
        tokenData = {
          accessToken: encodedToken,
          refreshToken: encodedToken,
          userId: jwtData.sub || jwtData.user_id,
          email: jwtData.email || jwtData.sub,
          newUser: false,
        };
      } else {
        // Base64로 인코딩된 JSON인 경우
        const decodedString = atob(encodedToken);
        tokenData = JSON.parse(decodedString);
      }
    } catch {
      // 디코딩 실패 시 원본 토큰 사용
      tokenData = {
        accessToken: encodedToken,
        refreshToken: encodedToken,
        userId: null,
        email: null,
        newUser: false,
      };
    }

    const { accessToken, refreshToken, userId, email, newUser } = tokenData;
    if (!accessToken) return null;

    await saveTokens(accessToken, refreshToken || accessToken);

    return {
      id: userId ? parseInt(userId, 10) : 0,
      tokenResponseDto: { accessToken, refreshToken: refreshToken || accessToken },
      email: email || '',
      newUser: Boolean(newUser),
    };
  } catch (error: any) {
    if (error instanceof Error && error.message === 'TIMEOUT') {
      console.warn('Login timed out.');
    }
    return null;
  }
};

export default handleKakaoLogin;
