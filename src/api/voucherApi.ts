import apiClient from './client';

// 내 금액권 전체 목록 조회
export const getMyGiftcards = async () => {
  try {
    const response = await apiClient.get('/v1/vouchers');
    return response.data.result;
  } catch (error) {
    console.error('금액권 목록 조회 실패:', error);
    throw error;
  }
};

// 금액권 상세 조회
export const getGiftcardDetail = async (uuid: string) => {
  try {
    const response = await apiClient.get(`/v1/vouchers/${uuid}`);
    return response.data.result;
  } catch (error) {
    console.error('금액권 상세 조회 실패:', error);
    throw error;
  }
};

// 금액권 일부 사용 처리
export const useGiftcardAmount = async (uuid: string, amount: number) => {
  try {
    const response = await apiClient.post(`/v1/vouchers/${uuid}/use`, null, { params: { amount } });

    return response.data.result;
  } catch (error) {
    console.error('금액권 사용 실패:', error);
    throw error;
  }
};
