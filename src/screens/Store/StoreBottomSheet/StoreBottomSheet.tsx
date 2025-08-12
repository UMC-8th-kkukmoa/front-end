import React, { useState, useMemo, useRef, useCallback } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
  ActivityIndicator,
} from 'react-native';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getStoreList, getStoreListByCategory } from '../../../api/store';
import styles from './StoreBottomSheet.style';
import MapPin from '../../../assets/images/mappin.svg';
import MapButton from '../../../assets/images/mapbutton.svg';
import StoreCard from '../StoreCard/StoreCard';

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
};

function StoreBottomSheet({ selectedCategory, address, location }: Props) {
  const sheetRef = useRef<BottomSheet>(null);
  const { height: screenHeight } = Dimensions.get('window');

  const snapPoints = useMemo(() => {
    const topSnap = screenHeight * 0.65;
    const bottomSnap = screenHeight * 0.09;
    return [bottomSnap, topSnap];
  }, [screenHeight]);

  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [sheetIndex, setSheetIndex] = useState(1);
  const [showMapButton, setShowMapButton] = useState(false);

  // 데이터 패칭
  const { data, isError, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery(
    {
      queryKey: ['stores', selectedCategory, location?.lat, location?.lng],
      enabled: !!location,
      initialPageParam: 0,
      queryFn: ({ pageParam }) => {
        if (!location)
          return Promise.resolve({
            stores: [],
            isLast: true,
            page: 0,
            totalPages: 0,
            totalElements: 0,
            isFirst: true,
          });
        return selectedCategory
          ? getStoreListByCategory(selectedCategory!, location.lat, location.lng, pageParam, 10)
          : getStoreList(location.lat, location.lng, pageParam, 10);
      },
      getNextPageParam: (lastPage, pages) => {
        if (!lastPage || lastPage.isLast) return undefined;
        return Array.isArray(pages) ? pages.length : 1;
      },
      select: (queryData) => {
        const pages = queryData?.pages ?? [];
        const flattened = pages.flatMap((p: any) => {
          if (p?.stores && Array.isArray(p.stores)) return p.stores;
          if (Array.isArray(p)) return p;
          return [];
        });
        return flattened
          .map((store) => {
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
            };
          })
          .sort((a, b) => a.distanceKm - b.distanceKm);
      },
      retry: 1,
      staleTime: 30_000,
    },
  );

  const storeList = data ?? [];

  React.useEffect(() => {
    if (isError && error) {
      Alert.alert(
        '오류',
        (error as Error).message || '가게 정보를 불러오는 중 문제가 발생했습니다.',
      );
    }
  }, [isError, error]);

  // 시트 관리
  const handleSheetChanges = useCallback((index: number) => {
    setSheetIndex(index);

    // 바텀시트 상태에 따라 지도 버튼 관리
    if (index >= 1) {
      setShowMapButton(true);
    } else {
      setShowMapButton(false);
    }

    // 70% 위로 열리지 않도록 고정
    if (index > 1) {
      sheetRef.current?.snapToIndex(1);
    }
  }, []);

  // 지도보기 버튼 클릭 -> 시트 컨트롤
  const handleMapButtonPress = () => {
    setShowMapButton(false);
    sheetRef.current?.snapToIndex(0);
  };

  // 하트 관리
  const toggleLike = (storeId: string) => {
    setLikedMap((prev) => ({
      ...prev,
      [storeId]: !prev[storeId],
    }));
  };

  const onEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const renderItem = ({ item }: { item: any }) => (
    <StoreCard item={item} isLiked={likedMap[item.storeId] === true} onToggleLike={toggleLike} />
  );

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
