// 공통 API 래퍼
export type BaseResponse<T> = {
  isSuccess: boolean;
  code?: string;
  message?: string;
  result?: T;
};

// 상세 DTO (백엔드 원본)
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

// 목록 DTO (백엔드 원본)
export type StoreListItem = {
  storeId: number;
  name: string;
  storeImage: string;
  distance: number;
  openingHours: string;
  closingHours: string;
  categoryName: string;
  reviewCount: number;
};
