export type MyGiftcard = {
  name: string;
  validDays: string;
  status: 'UNUSED' | 'USED' | string;
  qrCodeUuid: string;
  daysLeft: string;
};

export type DetailedGiftcard = MyGiftcard & {
  value: number;
  remainingValue: number;
  qrCode: string;
};
