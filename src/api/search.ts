import apiClient from './client';

export type StoreSearchItem = { id: number; name: string };
type BaseResponse<T> = { isSuccess: boolean; code?: string; message?: string; result?: T };

export async function searchStoresByName(
  name: string,
  offset = 0,
  limit = 10,
): Promise<StoreSearchItem[]> {
  const { data } = await apiClient.get<BaseResponse<StoreSearchItem[]>>('/v1/stores/search', {
    params: { name, offset, limit },
    headers: { Accept: 'application/json' },
  });

  if (!data?.isSuccess || !data?.result) {
    throw new Error(data?.message || '가게 검색 실패');
  }
  return data.result;
}
