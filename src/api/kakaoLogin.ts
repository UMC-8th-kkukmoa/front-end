import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';
import axios from 'axios';
import { TokenResponse } from '../types/kakao';
import { saveTokens, saveRoles } from '../utils/tokenStorage';

const KAKAO_LOGIN_URL = process.env.EXPO_PUBLIC_KAKAO_LOGIN_URL;
if (!KAKAO_LOGIN_URL) throw new Error('[KakaoLogin] EXPO_PUBLIC_KAKAO_LOGIN_URL is not defined.');

function timeout(ms: number): Promise<never> {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error('TIMEOUT')), ms);
  });
}

const handleKakaoLogin = async (): Promise<(TokenResponse & { roles: string[] }) | null> => {
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
    const exchangeCode = url.searchParams.get('code');
    if (!exchangeCode) return null;

    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_BASE_URL}/v1/users/exchange?code=${encodeURIComponent(exchangeCode)}`,
      null,
      { headers: { 'Content-Type': 'application/json' } },
    );

    const { id, email, newUser, roles, tokenResponseDto } = response.data.result ?? {};

    if (!tokenResponseDto?.accessToken || !tokenResponseDto?.refreshToken) return null;

    // 토큰 저장
    await saveTokens(tokenResponseDto.accessToken, tokenResponseDto.refreshToken);

    // roles 저장
    await saveRoles(roles ?? []);

    return {
      id: id ?? 0,
      tokenResponseDto,
      email: email ?? '',
      newUser: newUser ?? false,
      roles: roles ?? [],
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
