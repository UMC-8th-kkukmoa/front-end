export type MyGiftcard = {
  name: string;
  amount: number;
  validDays: string;
  status: '미사용' | '사용중' | '사용완료';
  qrCodeUuid: string;
  daysLeft: number;
};

export type DetailedGiftCard = {
  name: string;
  value: number;
  remainingValue: number;
  validDays: string;
  status: '미사용' | '사용중' | '사용완료';
  qrCodeUuid: string;
  qrCode: string;
  daysLeft: number;
};
