import client from './client';
import type { BaseResponse } from '../types/store';

const idToPath = (storeId: string | number) => String(storeId);

export const likeStore = async (storeId: string | number) => {
  const { data } = await client.post(`/v1/stores/like/${idToPath(storeId)}`);
  return (data as BaseResponse<boolean>).result;
};

export const unlikeStore = async (storeId: string | number) => {
  const { data } = await client.delete(`/v1/stores/like/${idToPath(storeId)}`);
  return (data as BaseResponse<boolean>).result;
};

export const getIsLiked = async (storeId: string | number) => {
  const { data } = await client.get(`/v1/stores/like/${idToPath(storeId)}/me`);
  return (data as BaseResponse<boolean>).result;
};

export const getLikeCount = async (storeId: string | number) => {
  const { data } = await client.get(`/v1/stores/like/${idToPath(storeId)}/count`);
  return (data as BaseResponse<number>).result;
};
