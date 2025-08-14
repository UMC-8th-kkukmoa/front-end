import { isAxiosError } from 'axios';
import {
  LoginResponse,
  SignUpResponse,
  VerificationConfirmResponse,
  NickCheckResponse,
  SignUpRequest,
} from '../types/auth';
import apiClient from './client';
import { saveTokens } from '../utils/tokenStorage';

const logApiError = (error: any, action: string) => {
  if (isAxiosError(error)) {
    console.error(`${action} 실패 status:`, error.response?.status);
    console.error(`${action} 실패 data:`, error.response?.data);
  } else {
    console.error(`${action} 실패:`, error);
  }
};

export const localLogin = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const { data } = await apiClient.post<LoginResponse>('/v1/users/login/local', {
      email,
      password,
    });

    // 토큰 저장
    if (data.accessToken && data.refreshToken) {
      await saveTokens(data.accessToken, data.refreshToken);
    } else {
      console.warn('로그인 응답에 토큰이 없습니다');
    }

    return data;
  } catch (error) {
    logApiError(error, '로그인');
    throw error;
  }
};

export const emailReq = async (email: string) => {
  try {
    const { data } = await apiClient.post('/v1/users/verification/request', { email });
    return data;
  } catch (error) {
    logApiError(error, '이메일 전송');
    throw error;
  }
};

export const checkEmail = async (email: string, code: string) => {
  try {
    const { data } = await apiClient.post<VerificationConfirmResponse>(
      '/v1/users/verification/confirm',
      { email, code },
    );
    return data;
  } catch (error) {
    logApiError(error, '이메일 확인');
    throw error;
  }
};

export const checkNicknameExists = async (nickname: string): Promise<boolean> => {
  try {
    const { data } = await apiClient.get<NickCheckResponse>('/v1/users/nickname/exists', {
      params: { nickname },
    });
    return data.result;
  } catch (error: any) {
    logApiError(error, '닉네임 중복 확인');
    throw new Error('닉네임 중복 확인 실패');
  }
};

export const signUp = async (data: SignUpRequest): Promise<SignUpResponse> => {
  try {
    const { data: result } = await apiClient.post<SignUpResponse>('/v1/users/signup', data);
    return result;
  } catch (error) {
    logApiError(error, '회원가입');
    throw error;
  }
};
