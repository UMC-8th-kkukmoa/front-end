export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
};

export type SignUpItem = {
  signupToken: string;
  email: string;
  password: string;
  nickname: string;
};

export type SignUpRequest = {
  signupToken: string;
  email: string;
  password: string;
  nickname: string;
  role: 'USER' | 'OWNER' | 'ADMIN' | 'PENDING_OWNER';
};

export type SignUpResponse = {
  isSuccess: boolean;
  code: string;
  result: {
    signupToken: string;
  };
  message: string;
};

export type VerificationConfirmResponse = {
  signupToken: string;
  expiresInSec: number;
};

export type NickCheckResponse = {
  isSuccess: boolean;
  code: string;
  result: boolean;
  message: string;
};
