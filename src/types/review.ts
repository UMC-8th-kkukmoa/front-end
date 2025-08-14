export interface ReviewPreviewItem {
  reviewId: number;
  writerNickname: string | null;
  thumbnailUrl: string | null;
  contentSnippet: string;
  createdAt: string;
}

// 서버 응답 매칭
export interface ReviewListItem {
  reviewId: number;
  writerNickname: string | null;
  content: string;
  imageUrls: string[];
  rating?: number;
  createdAt: string;
}

// 서버 페이지 컨테이너
export interface ReviewCursorPageDto {
  content: ReviewListItem[];
  nextCursor: string | null;
  hasNext: boolean;
}

// 서버 헤더
export interface ReviewHeaderDto {
  storeId: number;
  storeName: string;
  storeImageUrl: string;
}

// 서버 전체
export interface ReviewCursorEnvelopeDto {
  header: ReviewHeaderDto;
  page: ReviewCursorPageDto;
}

export type ReviewCount = number;
