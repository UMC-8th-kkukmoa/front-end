export type MyGiftcard = {
  name: string;
  validDays: string;
  status: '미사용' | '사용' | string;
  qrCodeUuid: string;
  daysLeft: string;
};

export type DetailedGiftcard = MyGiftcard & {
  value: number;
  remainingValue: number;
  qrCode: string;
};
