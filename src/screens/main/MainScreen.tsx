import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { getStoreList } from '../../api/store';
import { getAddressFromCoords, getCurrentCoords } from '../../utils/location';
import useLikeStore from '../../hooks/useLikeStore';
import styles from './MainScreen.style';
import StoreCard from '../Store/StoreCard/StoreCard';
import HeartIcon from '../../assets/images/Vector.svg';
import BellIcon from '../../assets/images/bell.svg';
import MapPinIcon from '../../assets/images/map-pin2.svg';
import QRIcon from '../../assets/images/maximize.svg';
import StampIcon from '../../assets/images/star.svg';
import SearchBarIcon from '../../assets/images/search-icon.svg';
import { StoreListPage } from '../../types/store';
import MainBanner from './MainBanner';
import { requestStamp } from '../../api/stamp';

function StoreListHeader({ isLoading, isError }: { isLoading: boolean; isError: boolean }) {
  return (
    <>
      <MainBanner />
      {isLoading && <ActivityIndicator style={styles.loading} color="#FF8246" />}
      {isError && <Text style={{ textAlign: 'center', paddingBottom: '50%' }}>오류</Text>}
    </>
  );
}

function EmptyStoreList() {
  return (
    <View style={styles.emptyWrapper}>
      <Text style={styles.emptyText}>아직 준비된 가게가 없습니다.</Text>
    </View>
  );
}

function MainScreen() {
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const router = useRouter();
  const { qrCodeData } = useLocalSearchParams();

  const stampMutation = useMutation({
    mutationFn: (qrCode: string) => requestStamp(qrCode),
    onSuccess: () => {
      Alert.alert('스탬프 적립 성공', '스탬프가 성공적으로 적립되었습니다.');
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        Alert.alert('스탬프 적립 실패', error.response?.data?.message || '다시 시도해주세요.');
      } else {
        Alert.alert('스탬프 적립 실패', error.message || '다시 시도해주세요.');
      }
    },
  });

  const { toggleLike, isFavoriteShop, addFavoriteShop } = useLikeStore();

  const { data: appCoords } = useQuery({
    queryKey: ['coords'],
    queryFn: getCurrentCoords,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 0,
  });

  useEffect(() => {
    if (appCoords) setCoords(appCoords);
  }, [appCoords]);

  const { data: address, isPending: isAddrLoading } = useQuery({
    queryKey: ['address', coords?.lat, coords?.lng],
    queryFn: () => getAddressFromCoords(coords!.lat, coords!.lng),
    enabled: !!coords,
    staleTime: 60_000,
  });

  const emptyStoreListPage: StoreListPage = {
    stores: [],
    page: 0,
    totalPages: 0,
    totalElements: 0,
    isFirst: true,
    isLast: true,
  };

  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<StoreListPage, Error>({
      queryKey: ['storeList', coords?.lat, coords?.lng],
      enabled: !!coords,
      initialPageParam: 0,
      queryFn: ({ pageParam }) => {
        const page = pageParam as number;
        if (!coords) return Promise.resolve(emptyStoreListPage);
        return getStoreList(coords.lat, coords.lng, page, 10);
      },
      getNextPageParam: (lastPage) => (lastPage.isLast ? undefined : lastPage.page + 1),
    });

  const transformedStoreList = React.useMemo(() => {
    if (!data?.pages) return [];
    return data.pages.flatMap((page) =>
      page.stores.map((store) => {
        const km = Number(store.distance);
        return {
          storeId: store.storeId.toString(),
          name: store.name,
          imageUrl: store.storeImage,
          categoryName: store.categoryName,
          distance: `${Number.isNaN(km) ? '0.00' : km.toFixed(2)} km`,
          time: `${store.openingHours} ~ ${store.closingHours}`,
          bookmarkCount: 0,
        };
      }),
    );
  }, [data]);

  useEffect(() => {
    if (data?.pages) {
      const allStores = data.pages.flatMap((page) => page.stores);
      allStores.forEach((store) => {
        const storeIdStr = store.storeId.toString();
        if (store.liked && !isFavoriteShop(storeIdStr)) {
          addFavoriteShop(storeIdStr);
        }
      });
    }
  }, [data, addFavoriteShop, isFavoriteShop]);

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  };

  useEffect(() => {
    if (qrCodeData && typeof qrCodeData === 'string') {
      stampMutation.mutate(qrCodeData);
      router.setParams({ qrCodeData: undefined });
    }
  }, [qrCodeData, router]);

  return (
    <View style={styles.container}>
      {/* 상단 주황색 헤더 */}
      <View style={styles.headerContainer}>
        <View style={styles.topBar}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <MapPinIcon width={24} height={24} />
            <Text style={styles.location}>
              {!coords || isAddrLoading ? '위치 불러오는 중...' : (address ?? '주소 미확인')}
            </Text>
          </View>
          <View style={styles.rightIcons}>
            <TouchableOpacity onPress={() => router.push('/qrcode')}>
              <QRIcon width={24} height={24} />
            </TouchableOpacity>
            <TouchableOpacity>
              <HeartIcon width={24} height={24} />
            </TouchableOpacity>
            <TouchableOpacity>
              <BellIcon width={24} height={24} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* 흰색 모달 */}
      <View style={styles.whiteModal}>
        <View style={styles.searchRow}>
          {/* 버튼 */}
          <View style={styles.buttonGroup}>
            <TouchableOpacity style={styles.iconButton}>
              <QRIcon width={26} height={26} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => router.push('/stamp/StampList')}
            >
              <StampIcon width={26} height={26} />
            </TouchableOpacity>
          </View>
          {/* 검색 */}
          <View style={styles.searchBarContainer}>
            <TouchableOpacity
              style={styles.searchTouchable}
              onPress={() => router.push('/store/search')}
              activeOpacity={0.8}
            >
              <Text style={styles.searchPlaceholder}>매장을 검색해보세요.</Text>
              <SearchBarIcon width={23} height={23} />
            </TouchableOpacity>
          </View>
        </View>

        <FlatList
          data={transformedStoreList}
          keyExtractor={(item) => item.storeId}
          ListHeaderComponent={<StoreListHeader isLoading={isLoading} isError={isError} />}
          renderItem={({ item }) => (
            <StoreCard
              item={item}
              isLiked={isFavoriteShop(item.storeId)}
              onToggleLike={toggleLike}
              onPress={(id) =>
                router.push({ pathname: '/store/[id]', params: { id, from: 'main' } })
              }
            />
          )}
          contentContainerStyle={styles.cardContainer}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListEmptyComponent={isLoading || isError ? null : EmptyStoreList}
        />
      </View>
    </View>
  );
}

export default MainScreen;
