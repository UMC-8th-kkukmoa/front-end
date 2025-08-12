import apiClient from './client';
import type { BaseResponse } from '../types/store';
import type {
  ReviewPreviewItem,
  ReviewCursorEnvelopeDto,
  ReviewCursorPageDto,
  ReviewCount,
} from '../types/review';

// 최신 리뷰 프리뷰
export async function getReviewPreviews(
  storeId: string | number,
  limit = 4,
): Promise<ReviewPreviewItem[]> {
  const { data } = await apiClient.get<BaseResponse<ReviewPreviewItem[]>>(
    `/v1/stores/${storeId}/reviews/preview`,
    { params: { limit } },
  );
  if (!data.isSuccess) throw new Error(data.message || '리뷰 프리뷰를 불러오지 못했습니다.');
  return data.result;
}

// 커서 기반 리뷰 목록
export async function getStoreReviewsByCursor(
  storeId: string | number,
  cursor?: string,
  size = 10,
): Promise<ReviewCursorEnvelopeDto> {
  const { data } = await apiClient.get<BaseResponse<any>>(`/v1/stores/${storeId}/reviews/cursor`, {
    params: { cursor, size },
  });
  if (!data.isSuccess) throw new Error(data.message || '리뷰 목록을 불러오지 못했습니다.');

  const result = data.result ?? data;

  const { header } = result;
  const page: ReviewCursorPageDto = {
    content: Array.isArray(result.page?.content) ? result.page.content : [],
    nextCursor: result.page?.nextCursor ?? null,
    hasNext: !!result.page?.hasNext,
  };

  return { header, page };
}

// 리뷰 총 개수
export async function getReviewCount(storeId: string | number): Promise<ReviewCount> {
  const { data } = await apiClient.get<BaseResponse<ReviewCount>>(
    `/v1/stores/${storeId}/reviews/count`,
  );
  if (!data.isSuccess) throw new Error(data.message || '리뷰 개수를 불러오지 못했습니다.');
  return data.result;
}
