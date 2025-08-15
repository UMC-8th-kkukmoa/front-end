import { useMutation, useQueryClient } from '@tanstack/react-query';
import { likeStore, unlikeStore } from '../api/like';
import useShopStore from '../store/useShopStore';

type Ctx = {
  prevLiked?: boolean;
  prevCount?: number;
  storeId: string;
};

const toKey = (id: string | number) => String(id);

function useLikeStore() {
  const queryClient = useQueryClient();
  const { addFavoriteShop, removeFavoriteShop, isFavoriteShop } = useShopStore();

  // 공통 낙관 갱신 함수
  const optimisticUpdate = (storeId: string, nextLiked: boolean, delta: number) => {
    const id = toKey(storeId);

    // isLiked 캐시
    queryClient.setQueryData<boolean>(['isLiked', id], nextLiked);

    // likeCount 캐시 (없으면 0으로 가정)
    queryClient.setQueryData<number>(['likeCount', id], (old) => {
      const base = typeof old === 'number' ? old : 0;
      const next = base + delta;
      return next < 0 ? 0 : next;
    });
  };

  const { mutate: like } = useMutation({
    mutationFn: (storeId: string) => likeStore(storeId),
    onMutate: async (storeId: string): Promise<Ctx> => {
      const id = toKey(storeId);
      await Promise.all([
        queryClient.cancelQueries({ queryKey: ['isLiked', id] }),
        queryClient.cancelQueries({ queryKey: ['likeCount', id] }),
      ]);

      const prevLiked = queryClient.getQueryData<boolean>(['isLiked', id]);
      const prevCount = queryClient.getQueryData<number>(['likeCount', id]);

      // 로컬 스토어 & 캐시 동시 반영
      addFavoriteShop(id);
      optimisticUpdate(id, true, +1);

      return { prevLiked, prevCount, storeId: id };
    },
    onError: (_err, _vars, ctx) => {
      if (!ctx) return;
      // 롤백
      if (typeof ctx.prevLiked !== 'undefined') {
        queryClient.setQueryData(['isLiked', ctx.storeId], ctx.prevLiked);
      }
      if (typeof ctx.prevCount !== 'undefined') {
        queryClient.setQueryData(['likeCount', ctx.storeId], ctx.prevCount);
      }
      removeFavoriteShop(ctx.storeId);
    },
    onSettled: (_d, _e, storeId) => {
      const id = toKey(storeId);
      // 최종 서버값 동기화
      queryClient.invalidateQueries({ queryKey: ['isLiked', id] });
      queryClient.invalidateQueries({ queryKey: ['likeCount', id] });
    },
  });

  const { mutate: unlike } = useMutation({
    mutationFn: (storeId: string) => unlikeStore(storeId),
    onMutate: async (storeId: string): Promise<Ctx> => {
      const id = toKey(storeId);
      await Promise.all([
        queryClient.cancelQueries({ queryKey: ['isLiked', id] }),
        queryClient.cancelQueries({ queryKey: ['likeCount', id] }),
      ]);

      const prevLiked = queryClient.getQueryData<boolean>(['isLiked', id]);
      const prevCount = queryClient.getQueryData<number>(['likeCount', id]);

      removeFavoriteShop(id);
      optimisticUpdate(id, false, -1);

      return { prevLiked, prevCount, storeId: id };
    },
    onError: (_err, _vars, ctx) => {
      if (!ctx) return;
      if (typeof ctx.prevLiked !== 'undefined') {
        queryClient.setQueryData(['isLiked', ctx.storeId], ctx.prevLiked);
      }
      if (typeof ctx.prevCount !== 'undefined') {
        queryClient.setQueryData(['likeCount', ctx.storeId], ctx.prevCount);
      }
      addFavoriteShop(ctx.storeId);
    },
    onSettled: (_d, _e, storeId) => {
      const id = toKey(storeId);
      queryClient.invalidateQueries({ queryKey: ['isLiked', id] });
      queryClient.invalidateQueries({ queryKey: ['likeCount', id] });
    },
  });

  const toggleLike = (storeId: string | number) => {
    const id = toKey(storeId);
    if (isFavoriteShop(id)) unlike(id);
    else like(id);
  };

  return { toggleLike, isFavoriteShop, addFavoriteShop, removeFavoriteShop };
}

export default useLikeStore;
