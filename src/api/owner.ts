import apiClient from './client';

interface ApplyForStoreParams {
  storeName: string;
  storeAddress: string;
  storeAddressDetail: string;
  latitude: number;
  longitude: number;
  openingHours: string;
  closingHours: string;
  storePhoneNumber: string;
  storeImageUrl: string;
  category: string;
}

// eslint-disable-next-line import/prefer-default-export
export const applyForStore = (data: ApplyForStoreParams) => {
  return apiClient.post('/v1/owners/applications', data);
};
