import apiClient from './client';
import type { MyGiftcard, DetailedGiftCard } from '../types/voucher';

// 내 금액권 전체 목록 조회
export const getMyGiftCards = async (): Promise<MyGiftcard[]> => {
  try {
    const response = await apiClient.get<{ result: MyGiftcard[] }>('/v1/vouchers');
    return response.data.result;
  } catch (error) {
    console.error('금액권 목록 조회 실패:', error);
    throw error;
  }
};

// 금액권 상세 조회
export const getGiftCardDetail = async (uuid: string): Promise<DetailedGiftCard> => {
  try {
    const response = await apiClient.get<{ result: DetailedGiftCard }>(`/v1/vouchers/${uuid}`);
    return response.data.result;
  } catch (error) {
    console.error('금액권 상세 조회 실패:', error);
    throw error;
  }
};
