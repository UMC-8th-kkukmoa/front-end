// export interface PaymentHistoryItem {
//   id: string;
//   date: string;
//   storeName: string;
//   amount: number;
//   imageUrl?: string;
// }

export interface PaymentHistoryItem {
  usageId: number;
  voucherId: number;
  storeId: number;
  storeName: string;
  usedAmount: number;
  usedAtFormatted: string;
  storeImage?: string;
}

export interface PaymentHistoryResult {
  items: PaymentHistoryItem[];
  nextCursor: string | null;
  hasNext: boolean;
}

export interface PaymentHistoryResponse {
  isSuccess: boolean;
  code: string;
  result: PaymentHistoryResult;
  message: string;
}
