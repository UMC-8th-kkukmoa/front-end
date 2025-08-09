import apiClient from './client';

export type StoreDetail = {
  storeId: number;
  name: string;
  reviewCount: number;
  categoryName: string;
  merchantNumber: string;
  address: string;
  detailAddress: string;
  storeImage: string;
  openingHours: string;
  closingHours: string;
};

export type StoreListItem = {
  storeId: number;
  name: string;
  storeImage: string;
  distance: number;
  openingHours: string;
  closingHours: string;
  reviewCount: number;
};

type BaseResponse<T> = {
  isSuccess: boolean;
  code?: string;
  message?: string;
  result?: T;
};

// 상세 조회
export async function getStoreDetail(storeId: string | number): Promise<StoreDetail> {
  const { data } = await apiClient.get<BaseResponse<StoreDetail>>(`/v1/stores/${storeId}`);
  if (!data?.isSuccess || !data?.result) {
    throw new Error(data?.message || '가게 정보를 불러오지 못했습니다.');
  }
  return data.result;
}

// 전체 리스트 조회
export async function getStoreList(
  latitude: number,
  longitude: number,
  offset = 0,
  limit = 10,
): Promise<StoreListItem[]> {
  const { data } = await apiClient.get<BaseResponse<StoreListItem[]>>('/v1/stores', {
    params: { latitude, longitude, offset, limit },
  });
  if (!data?.isSuccess || !data?.result) {
    throw new Error(data?.message || '가게 목록을 불러오지 못했습니다.');
  }
  return data.result;
}

// 카테고리별 리스트 조회
export async function getStoreListByCategory(
  categoryType: string,
  latitude: number,
  longitude: number,
  offset = 0,
  limit = 10,
): Promise<StoreListItem[]> {
  const { data } = await apiClient.get<BaseResponse<StoreListItem[]>>('/v1/stores/category', {
    params: { categoryType, latitude, longitude, offset, limit },
  });
  if (!data?.isSuccess || !data?.result) {
    throw new Error(data?.message || '카테고리별 가게 목록을 불러오지 못했습니다.');
  }
  return data.result;
}
