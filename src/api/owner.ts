import apiClient from './client';

interface ApplyForStoreParams {
  name: string;
  address: string;
  detailAddress: string;
  latitude: number;
  longitude: number;
  openingHours: string;
  closingHours: string;
  number: string;
  storeImage: string;
  category: string;
}

export const applyForStore = (data: ApplyForStoreParams) => {
  return apiClient.post('/v1/owners/applications', data);
};

interface RegisterOwnerParams {
  email: string;
  password: string;
  agreeTerms: boolean;
  agreePrivacy: boolean;
}

export const registerOwner = (data: RegisterOwnerParams) => {
  return apiClient.post('/v1/owners/register', data);
};

interface OwnerLoginParams {
  email: string;
  password?: string;
}

export async function ownerLogin({ email, password }: OwnerLoginParams) {
  const response = await apiClient.post('/v1/owners/login', {
    email,
    password,
  });
  return response.data;
}
