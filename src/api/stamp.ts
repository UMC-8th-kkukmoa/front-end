import apiClient from './client';

// eslint-disable-next-line import/prefer-default-export
export const requestStamp = async (qrCode: string) => {
  const response = await apiClient.put(`/v1/stamps?qr=${qrCode}`);
  return response.data;
};
