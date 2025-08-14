import { SignUpValue } from '../types/signUp';
import apiClient from './client';

export const emailReq = async (email: string) => {
  try {
    const response = await apiClient.post('/v1/users/verification', { email });
    console.log('이메일 전송 성공:', response.data);
  } catch (error: any) {
    if (error.response) {
      console.error('이메일 전송 실패 status:', error.response.status);
      console.error('이메일 전송 실패 data:', error.response.data);
    } else {
      console.error('이메일 전송 실패:', error);
    }
  }
};

export const checkEmail = async (email: string, code: string) => {
  try {
    const response = await apiClient.post('/v1/users/verification/confirm', { email, code });
    console.log('이메일 확인 성공:', response.data);
  } catch (error: any) {
    if (error.response) {
      console.error('이메일 확인 실패 status:', error.response.status);
      console.error('이메일 확인 실패 data:', error.response.data);
    } else {
      console.error('이메일 확인 실패:', error);
    }
  }
};

export const signUp = async (data: SignUpValue) => {
  try {
    const response = await apiClient.post('/v1/users/signup', data);
    console.log('회원가입 성공:', response.data);
  } catch (error: any) {
    if (error.response) {
      console.error('회원가입 실패 status:', error.response.status);
      console.error('회원가입 실패 data:', error.response.data);
    } else {
      console.error('회원가입 실패:', error);
    }
  }
};
