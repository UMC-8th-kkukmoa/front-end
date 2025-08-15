import { useMutation, useQueryClient } from '@tanstack/react-query';
import { likeStore, unlikeStore } from '../api/shop';
import useShopStore from '../store/useShopStore';

function useLikeStore() {
  const queryClient = useQueryClient();
  const { addFavoriteShop, removeFavoriteShop, isFavoriteShop } = useShopStore();

  const { mutate: like } = useMutation({
    mutationFn: (storeId: string) => likeStore(storeId),
    onMutate: async (storeId: string) => {
      await queryClient.cancelQueries({ queryKey: ['isLiked', storeId] });
      addFavoriteShop(storeId);
    },
    onError: (_, storeId: string) => {
      removeFavoriteShop(storeId);
    },
  });

  const { mutate: unlike } = useMutation({
    mutationFn: (storeId: string) => unlikeStore(storeId),
    onMutate: async (storeId: string) => {
      await queryClient.cancelQueries({ queryKey: ['isLiked', storeId] });
      removeFavoriteShop(storeId);
    },
    onError: (_, storeId: string) => {
      addFavoriteShop(storeId);
    },
  });

  const toggleLike = (storeId: string) => {
    if (isFavoriteShop(storeId)) {
      unlike(storeId);
    } else {
      like(storeId);
    }
  };

  return { toggleLike, isFavoriteShop, addFavoriteShop, removeFavoriteShop };
}

export default useLikeStore;
