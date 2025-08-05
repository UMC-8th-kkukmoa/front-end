export interface TokenResponse {
  id: number;
  tokenResponseDto: {
    accessToken: string;
    refreshToken: string;
  };
  email: string;
  newUser: boolean;
}
