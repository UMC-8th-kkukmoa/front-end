// 공통 API 래퍼
export type ApiSuccess<T> = {
  isSuccess: true;
  code?: string;
  message?: string;
  result: T;
};

export type ApiFail = {
  isSuccess: false;
  code: string;
  message: string;
  result?: never;
};

export type BaseResponse<T> = ApiSuccess<T> | ApiFail;

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
  latitude: number;
  longitude: number;
  liked: boolean;
};

export type StoreListPage = {
  stores: StoreListItem[];
  page: number;
  totalPages: number;
  totalElements: number;
  isFirst: boolean;
  isLast: boolean;
};

export type StoreCardItem = {
  storeId: string;
  name: string;
  imageUrl: string;
  categoryName: string;
  distance: string;
  time: string;
  distanceKm?: number;
  lat: number;
  lng: number;
  liked: boolean;
};

// 카테고리/내 찜 목록
export type CategoryType = 'RESTAURANT' | 'CAFE' | 'BEAUTY' | 'EDUCATION' | 'HEALTH';

export type LikedStoreDto = {
  storeId: number;
  name: string;
  openingHours: string;
  closingHours: string;
  storeImage: string;
  latitude: number;
  longitude: number;
  categoryName: string;
  distance: number;
  liked: boolean;
};

export type LikedStorePage = {
  stores: LikedStoreDto[];
  page: number;
  totalPages: number;
  totalElements: number;
  isFirst: boolean;
  isLast: boolean;
};
