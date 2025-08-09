export type Stamp = {
  id: number;
  isStamped: boolean;
};

export type ShopStampData = {
  shopName: string;
  stamps: Stamp[];
};

export interface ApiStamp {
  id: number;
  store_name: string;
  stamp_score: number;
}

export interface StampApiResponse {
  isSuccess: boolean;
  code: string;
  result: {
    stamps: ApiStamp[];
    total: number;
  };
  message: string;
}
