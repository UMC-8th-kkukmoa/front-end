import React, { useCallback } from 'react';
import { Text, TouchableOpacity, View, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import type { InfiniteData } from '@tanstack/react-query';
import { useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query';
import CategoryTabs from '../../../design/component/kkCategoryTaps';
import StoreCard from '../StoreCard/StoreCard';
import styles from './LikeListScreen.style';
import BackArrow from '../../../assets/images/arrow_back.svg';
import { getCurrentCoords } from '../../../utils/location';
import { getMyLikedStores } from '../../../api/store';
import useLikeStore from '../../../hooks/useLikeStore';
import type { LikedStorePage, StoreCardItem } from '../../../types/store';

function EmptyStoreList() {
  return (
    <View style={styles.emptyWrapper}>
      <Text style={styles.emptyText}>찜한 매장이 없어요.</Text>
    </View>
  );
}

// ---- 메인 화면 ----
export default function ReviewsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const qc = useQueryClient();
  const [headerH, setHeaderH] = React.useState(0);
  const { toggleLike, isFavoriteShop } = useLikeStore();
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);

  // 현재 위치
  const { data: coords } = useQuery({
    queryKey: ['coords'],
    queryFn: getCurrentCoords,
    retry: 0,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  // 내 찜 목록 무한 스크롤
  const {
    data: items,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<
    LikedStorePage,
    Error,
    StoreCardItem[],
    (string | number | null | undefined)[],
    number
  >({
    queryKey: ['myLikes', coords?.lat, coords?.lng, selectedCategory],
    initialPageParam: 0,
    queryFn: async ({ pageParam = 0 }) => {
      if (!coords) throw new Error('no coords');
      return getMyLikedStores({
        latitude: coords.lat,
        longitude: coords.lng,
        page: pageParam,
        size: 10,
        categoryType: selectedCategory ?? undefined,
      });
    },
    getNextPageParam: (last) => (last.isLast ? undefined : last.page + 1),
    enabled: !!coords,
    select: (data) => {
      const flattened = (data.pages ?? []).flatMap((p) => p.stores ?? []);
      return flattened.map<StoreCardItem>((dto) => ({
        storeId: String(dto.storeId),
        name: dto.name,
        imageUrl: dto.storeImage,
        categoryName: dto.categoryName,
        distance: `${dto.distance.toFixed(2)} km`,
        time:
          dto.openingHours && dto.closingHours ? `${dto.openingHours} - ${dto.closingHours}` : '-',
        lat: dto.latitude,
        lng: dto.longitude,
        liked: dto.liked,
      }));
    },
  });

  // 하트
  const handleToggleLike = useCallback(
    async (storeId: string) => {
      const wasLiked = isFavoriteShop(storeId);
      const key = ['myLikes', coords?.lat ?? null, coords?.lng ?? null, selectedCategory] as const;

      if (wasLiked) {
        // 진행중인 동일 쿼리 취소
        await qc.cancelQueries({ queryKey: key });

        // 캐시에서 해당 아이템 즉시 제거
        qc.setQueryData<InfiniteData<LikedStorePage> | undefined>(key, (old) => {
          if (!old) return old;
          return {
            ...old,
            pages: old.pages.map((pg) => ({
              ...pg,
              stores: pg.stores.filter((s) => String(s.storeId) !== storeId),
            })),
          };
        });
      }

      toggleLike(storeId);
    },
    [isFavoriteShop, toggleLike, qc, coords?.lat, coords?.lng, selectedCategory],
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* 상단 헤더 */}
      <View style={[styles.header]} onLayout={(e) => setHeaderH(e.nativeEvent.layout.height)}>
        <TouchableOpacity
          onPress={() => router.back()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          style={styles.backBtn}
        >
          <BackArrow />
        </TouchableOpacity>
        <Text style={styles.title}>관심매장</Text>
        <View style={{ width: 24 }} />
      </View>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 0.4 }}
        colors={['rgba(108, 49, 49, 0.08)', 'rgba(0,0,0,0)']}
        style={[styles.topShadow, { top: headerH + insets.top }]}
      />

      {/* 카테고리 */}
      <View>
        <CategoryTabs
          selected={selectedCategory}
          onSelect={(cat) => {
            setSelectedCategory(cat);
          }}
        />
      </View>

      {/* 리스트 */}
      <View>
        {isLoading ? (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator />
          </View>
        ) : (
          <FlatList
            data={items}
            keyExtractor={(it) => it.storeId}
            renderItem={({ item }) => (
              <StoreCard
                item={item}
                isLiked={isFavoriteShop(item.storeId)}
                onToggleLike={handleToggleLike}
                onPress={(id) =>
                  router.push({ pathname: '/store/[id]', params: { id, from: 'likeList' } })
                }
              />
            )}
            contentContainerStyle={styles.cardContainer}
            onEndReachedThreshold={0.4}
            onEndReached={() => {
              if (hasNextPage && !isFetchingNextPage) fetchNextPage();
            }}
            ListEmptyComponent={EmptyStoreList}
            ListFooterComponent={
              isFetchingNextPage ? (
                <View style={{ paddingVertical: 16 }}>
                  <ActivityIndicator />
                </View>
              ) : null
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
}
