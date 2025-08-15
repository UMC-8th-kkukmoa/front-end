import { create } from 'zustand';

interface ShopState {
  favoriteShopIds: string[];
  addFavoriteShop: (id: string) => void;
  removeFavoriteShop: (id: string) => void;
  setFavoriteShops: (ids: string[]) => void;
  isFavoriteShop: (id: string) => boolean;
}

const useShopStore = create<ShopState>((set, get) => ({
  favoriteShopIds: [],

  addFavoriteShop: (id: string) => {
    set((state) => ({
      favoriteShopIds: [...state.favoriteShopIds, id],
    }));
  },

  removeFavoriteShop: (id: string) => {
    set((state) => ({
      favoriteShopIds: state.favoriteShopIds.filter((shopId) => shopId !== id),
    }));
  },

  setFavoriteShops: (ids: string[]) => {
    set({ favoriteShopIds: ids });
  },

  isFavoriteShop: (id: string) => {
    return get().favoriteShopIds.includes(id);
  },
}));

export default useShopStore;
