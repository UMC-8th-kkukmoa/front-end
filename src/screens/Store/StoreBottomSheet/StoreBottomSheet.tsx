import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getStoreList, getStoreListByCategory } from '../../../api/store';
import { likeStore, unlikeStore } from '../../../api/shop';
import useShopStore from '../../../store/useShopStore';
import styles from './StoreBottomSheet.style';
import MapPin from '../../../assets/images/mappin.svg';
import MapButton from '../../../assets/images/mapbutton.svg';
import StoreCard from '../StoreCard/StoreCard';
import type { StoreListPage, StoreCardItem } from '../../../types/store';

function BottomSheetHandle() {
  return (
    <View style={styles.bottomSheetHandleIndicatorWrapper}>
      <View style={styles.bottomSheetHandleIndicator} />
    </View>
  );
}

function EmptyStoreList() {
  return (
    <View style={styles.emptyWrapper}>
      <Text style={styles.emptyText}>아직 준비된 가게가 없습니다.</Text>
    </View>
  );
}

function ListFooter({ loading }: { loading: boolean }) {
  if (!loading) return null;
  return (
    <View style={{ paddingVertical: 16, alignItems: 'center' }}>
      <ActivityIndicator />
    </View>
  );
}

type Props = {
  selectedCategory: string | null;
  address?: string | null;
  location?: { lat: number; lng: number } | null;
  onStoresLoaded?: (
    stores: Array<{
      storeId: string;
      name: string;
      lat: number;
      lng: number;
      categoryName: string;
    }>,
  ) => void;
  selectedId?: string | null;
  onClearSelected?: () => void;
};

function StoreBottomSheet({
  selectedCategory,
  address,
  location,
  onStoresLoaded,
  selectedId,
  onClearSelected,
}: Props) {
  const sheetRef = useRef<BottomSheet>(null);
  const router = useRouter();
  const queryClient = useQueryClient();

  const { addFavoriteShop, removeFavoriteShop, isFavoriteShop } = useShopStore();

  const snapPoints = useMemo(() => ['9%', '37%', '75%'], []);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [sheetIndex, setSheetIndex] = useState(1);
  const [showMapButton, setShowMapButton] = useState(false);

  const { mutate: like } = useMutation({
    mutationFn: (storeId: string) => likeStore(storeId),
    onMutate: async (storeId: string) => {
      await queryClient.cancelQueries({ queryKey: ['isLiked', storeId] });
      addFavoriteShop(storeId);
    },
    onError: (_, storeId) => {
      removeFavoriteShop(storeId);
    },
  });

  const { mutate: unlike } = useMutation({
    mutationFn: (storeId: string) => unlikeStore(storeId),
    onMutate: async (storeId: string) => {
      await queryClient.cancelQueries({ queryKey: ['isLiked', storeId] });
      removeFavoriteShop(storeId);
    },
    onError: (_, storeId) => {
      addFavoriteShop(storeId);
    },
  });

  // 데이터 패칭
  const {
    data: storeList,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<
    StoreListPage,
    Error,
    StoreCardItem[],
    ['stores', string | null, number | undefined, number | undefined],
    number
  >({
    queryKey: ['stores', selectedCategory, location?.lat, location?.lng],
    enabled: !!location,
    initialPageParam: 0,
    queryFn: async ({ pageParam = 0 }) => {
      if (!location) {
        return {
          stores: [],
          page: 0,
          totalPages: 0,
          totalElements: 0,
          isFirst: true,
          isLast: true,
        };
      }
      if (selectedCategory) {
        return getStoreListByCategory(selectedCategory, location.lat, location.lng, pageParam, 10);
      }
      return getStoreList(location.lat, location.lng, pageParam, 10);
    },
    getNextPageParam: (lastPage, pages) => (lastPage.isLast ? undefined : pages.length),
    select: (data) => {
      const flattened = (data.pages ?? []).flatMap((p) => p.stores ?? []);
      return flattened
        .map<StoreCardItem>((store) => {
          const km = Number(store.distance);
          const distanceKm = Number.isNaN(km) ? 0 : km;
          return {
            storeId: String(store.storeId),
            name: store.name,
            imageUrl: store.storeImage,
            categoryName: store.categoryName,
            distance: `${distanceKm.toFixed(2)} km`,
            time: `${store.openingHours} ~ ${store.closingHours}`,
            bookmarkCount: 0,
            distanceKm,
            lat: Number(store.latitude),
            lng: Number(store.longitude),
            liked: store.liked,
          };
        })
        .sort((a, b) => a.distanceKm - b.distanceKm);
    },
    staleTime: 30_000,
    retry: 1,
  });

  useEffect(() => {
    if (storeList) {
      storeList.forEach((store) => {
        const storeIdStr = store.storeId.toString();
        if (store.liked && !isFavoriteShop(storeIdStr)) {
          addFavoriteShop(storeIdStr);
        }
      });
    }
  }, [storeList, addFavoriteShop, isFavoriteShop]);

  useEffect(() => {
    if (!onStoresLoaded || !storeList) return;
    const markers = storeList.map((s) => ({
      storeId: s.storeId,
      name: s.name,
      categoryName: s.categoryName,
      lat: s.lat,
      lng: s.lng,
    }));
    onStoresLoaded(markers);
  }, [storeList, onStoresLoaded]);

  // selectedId에 해당하는 단일 스토어 찾기
  const selectedStore = useMemo(() => {
    if (!selectedId || !storeList) return null;
    return storeList.find((s) => s.storeId === selectedId) ?? null;
  }, [selectedId, storeList]);

  // 단일/리스트 모드에 따라 시트 위치 자동 조정
  useEffect(() => {
    if (selectedStore) {
      sheetRef.current?.snapToIndex(1);
    } else {
      sheetRef.current?.snapToIndex(0);
    }
  }, [selectedStore]);

  // 시트 관리
  const handleSheetChanges = useCallback(
    (index: number) => {
      setSheetIndex(index);

      // 바텀시트 상태에 따라 지도 버튼 관리
      if (index >= 2) {
        setShowMapButton(true);
      } else {
        setShowMapButton(false);
      }
      // 시트가 완전히 내려가면 선택 해제 → 핀도 내려가게
      if (index === 0 && selectedId) {
        onClearSelected?.();
      }

      // 70% 위로 열리지 않도록 고정
      if (index > 2) {
        sheetRef.current?.snapToIndex(2);
      }
    },
    [selectedId, onClearSelected],
  );

  // 지도보기 버튼 클릭 -> 시트 컨트롤
  const handleMapButtonPress = () => {
    setShowMapButton(false);
    sheetRef.current?.snapToIndex(0);
  };

  const toggleLike = (storeId: string) => {
    if (isFavoriteShop(storeId)) {
      unlike(storeId);
    } else {
      like(storeId);
    }
  };

  const onEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const renderItem = ({ item }: { item: StoreCardItem }) => (
    <StoreCard
      item={item}
      isLiked={isFavoriteShop(item.storeId)}
      onToggleLike={toggleLike}
      onPress={(id) => router.push({ pathname: '/store/[id]', params: { id, from: 'stores' } })}
    />
  );

  if (selectedStore) {
    return (
      <View style={StyleSheet.absoluteFill}>
        <BottomSheet
          ref={sheetRef}
          index={2}
          snapPoints={snapPoints}
          enablePanDownToClose={false}
          backgroundStyle={styles.bottomSheetBackground}
          handleStyle={styles.bottomSheetHandle}
          handleComponent={BottomSheetHandle}
          style={{ flex: 1 }}
        >
          <View style={styles.header}>
            <MapPin />
            <Text style={styles.locationText}>{address ?? '위치 불러오는 중...'}</Text>
          </View>

          <View style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
            <StoreCard
              item={selectedStore}
              isLiked={isFavoriteShop(selectedStore.storeId)}
              onToggleLike={toggleLike}
              onPress={(id) =>
                router.push({ pathname: '/store/[id]', params: { id, from: 'stores' } })
              }
            />
          </View>
        </BottomSheet>
      </View>
    );
  }

  return (
    <View style={StyleSheet.absoluteFill}>
      <BottomSheet
        ref={sheetRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose={false}
        backgroundStyle={styles.bottomSheetBackground}
        handleStyle={styles.bottomSheetHandle}
        enableContentPanningGesture={false}
        handleComponent={BottomSheetHandle}
        style={{ flex: 1 }}
      >
        <View style={styles.header}>
          <MapPin />
          <Text style={styles.locationText}>{address ?? '위치 불러오는 중...'}</Text>
        </View>

        <BottomSheetFlatList
          data={storeList}
          keyExtractor={(item) => item.storeId}
          renderItem={renderItem}
          contentContainerStyle={{ ...styles.listContentContainer, flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled
          ListEmptyComponent={EmptyStoreList}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.2}
          ListFooterComponent={<ListFooter loading={isFetchingNextPage} />}
        />
      </BottomSheet>
      {showMapButton && (
        <TouchableOpacity style={styles.mapButton} onPress={handleMapButtonPress}>
          <MapButton />
        </TouchableOpacity>
      )}
    </View>
  );
}

export default StoreBottomSheet;
