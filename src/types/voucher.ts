export type MyGiftcard = {
  name: string;
  validDays: string;
  status: '미사용' | '사용중' | '사용완료';
  qrCodeUuid: string;
  daysLeft: string;
};

export type DetailedGiftcard = MyGiftcard & {
  value: number;
  remainingValue: number;
  qrCode: string;
};
