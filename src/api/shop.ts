import client from './client';

export const likeStore = async (storeId: string) => {
  const response = await client.post(`/v1/stores/like/${storeId}`);
  return response.data;
};

export const unlikeStore = async (storeId: string) => {
  const response = await client.delete(`/v1/stores/like/${storeId}`);
  return response.data;
};

export const getIsLiked = async (storeId: string) => {
  const response = await client.get(`/v1/stores/like/${storeId}/me`);
  return response.data;
};
