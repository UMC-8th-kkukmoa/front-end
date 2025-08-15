import apiClient from './client';

export interface StampResponse {
  isSuccess: boolean;
  code: string;
  result: {
    has_earned_coupon: boolean;
  };
  message: string;
}

// eslint-disable-next-line import/prefer-default-export
export const requestStamp = async (qrCode: string) => {
  const response = await apiClient.put<StampResponse>(`/v1/stamps?qr=${qrCode}`);
  return response.data;
};
