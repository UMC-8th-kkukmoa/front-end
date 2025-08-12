export interface ReviewPreviewItem {
  reviewId: number;
  writerNickname: string | null;
  thumbnailUrl: string | null;
  contentSnippet: string;
  createdAt: string;
}

// ✅ 서버 응답과 1:1 매칭 (imageUrls)
export interface ReviewListItem {
  reviewId: number;
  writerNickname: string | null;
  content: string;
  imageUrls: string[]; // ← 여기 images? → imageUrls 로 확정
  rating?: number;
  createdAt: string;
}

// ✅ 서버 페이지 컨테이너 (result.page)
export interface ReviewCursorPageDto {
  content: ReviewListItem[];
  nextCursor: string | null;
  hasNext: boolean;
}

// ✅ 서버 헤더 (result.header)  *주의: StoreId 대문자*
export interface ReviewHeaderDto {
  StoreId: number;
  storeName: string;
  storeImageUrl: string;
}

// ✅ 서버 전체 봉투 (result)
export interface ReviewCursorEnvelopeDto {
  header: ReviewHeaderDto;
  page: ReviewCursorPageDto;
}

export type ReviewCount = number;
