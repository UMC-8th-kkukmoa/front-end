import * as WebBrowser from 'expo-web-browser';
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
    const redirectUrl = 'kkukmoa://oauth';
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
    const tokenRes = await fetch(
      `https://kkukmoa.shop/v1/users/exchange?code=${encodeURIComponent(exchangeCode)}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      },
    );

    if (!tokenRes.ok) return null;

    const { accessToken, refreshToken } = await tokenRes.json();
    if (!accessToken || !refreshToken) return null;

    await saveTokens(accessToken, refreshToken);

    return {
      id: 0,
      tokenResponseDto: { accessToken, refreshToken },
      email: '',
      newUser: false,
    };
  } catch {
    return null;
  }
};

export default handleKakaoLogin;
