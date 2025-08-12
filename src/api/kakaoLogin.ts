import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';
import axios from 'axios';
import { TokenResponse } from '../types/kakao';
import { saveTokens } from '../utils/tokenStorage';

const KAKAO_LOGIN_URL = process.env.EXPO_PUBLIC_KAKAO_LOGIN_URL;
if (!KAKAO_LOGIN_URL) throw new Error('[KakaoLogin] EXPO_PUBLIC_KAKAO_LOGIN_URL is not defined.');

function timeout(ms: number): Promise<never> {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error('TIMEOUT')), ms);
  });
}

const handleKakaoLogin = async (): Promise<TokenResponse | null> => {
  try {
    const redirectUrl = Linking.createURL('oauth');
    const loginUrl = `${KAKAO_LOGIN_URL}?redirect_uri=${encodeURIComponent(redirectUrl)}&mobile=true`;

    const timeoutPromise = timeout(60000);

    // 카카오 로그인 창 열기
    const result = (await Promise.race([
      WebBrowser.openAuthSessionAsync(loginUrl, redirectUrl, { showInRecents: true }),
      timeoutPromise,
    ])) as WebBrowser.WebBrowserAuthSessionResult;

    if (result.type !== 'success' || !result.url) return null;

    // 딥링크에서 코드 추출
    const url = new URL(result.url);
    const exchangeCode = url.searchParams.get('code');
    if (!exchangeCode) return null;

    // 교환 코드로 토큰 발급 요청
    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_BASE_URL}/v1/users/exchange?code=${encodeURIComponent(exchangeCode)}`,
      null,
      { headers: { 'Content-Type': 'application/json' } },
    );

    const { accessToken, refreshToken, id, email, newUser } = response.data;

    if (!accessToken || !refreshToken) return null;

    await saveTokens(accessToken, refreshToken);

    return {
      id: id ?? 0,
      tokenResponseDto: { accessToken, refreshToken },
      email: email ?? '',
      newUser: newUser ?? false,
    };
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'TIMEOUT') {
        console.warn('로그인 시간이 초과되었습니다.');
      } else {
        console.error('카카오 로그인 실패:', error);
      }
    }
    return null;
  }
};

export default handleKakaoLogin;
