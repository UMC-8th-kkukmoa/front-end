import apiClient from './client';
import type { BaseResponse } from '../types/store';
import type {
  ReviewCreateResult,
  ReviewPreviewItem,
  ReviewCursorEnvelopeDto,
  ReviewCursorPageDto,
  ReviewCount,
} from '../types/review';

// 리뷰 작성
export async function createReview(
  storeId: string | number,
  content: string,
  images: (string | Blob)[] = [],
): Promise<ReviewCreateResult> {
  const formData = new FormData();
  formData.append('content', content);

  images.forEach((img, idx) => {
    formData.append('images', {
      uri: typeof img === 'string' ? img : undefined,
      name: `review_${idx}.jpg`,
      type: 'image/jpeg',
    } as any);
  });

  const { data } = await apiClient.post<BaseResponse<ReviewCreateResult>>(
    `/v1/stores/${storeId}/reviews`,
    formData,
    { headers: { 'Content-Type': 'multipart/form-data' } },
  );

  if (!data.isSuccess) throw new Error(data.message || '리뷰 작성에 실패했습니다.');
  return data.result;
}
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
