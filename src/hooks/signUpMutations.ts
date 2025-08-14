import { useMutation } from '@tanstack/react-query';
import { SignUpRequest, SignUpResponse, VerificationConfirmResponse } from '../types/auth';
import { signUp, checkNicknameExists, emailReq, checkEmail } from '../api/localAuth';

// 닉네임 중복 확인
export const useCheckNicknameMutation = () => {
  return useMutation<boolean, Error, string>({
    mutationFn: checkNicknameExists,
  });
};

// 이메일 전송
export const useEmailRequestMutation = () => {
  return useMutation<any, Error, string>({
    mutationFn: emailReq,
  });
};

// 이메일 인증 확인
export const useCheckEmailMutation = () => {
  return useMutation<VerificationConfirmResponse, Error, { email: string; code: string }>({
    mutationFn: ({ email, code }) => checkEmail(email, code),
  });
};

// 회원가입
export const useSignUpMutation = () => {
  return useMutation<SignUpResponse, Error, SignUpRequest>({
    mutationFn: signUp,
  });
};
