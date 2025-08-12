import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { getStoreList } from '../../api/store';
import { getAddressFromCoords, getCurrentCoords } from '../../utils/location';
import styles from './MainScreen.style';
import StoreCard from '../Store/StoreCard/StoreCard';
import HeartIcon from '../../assets/images/Vector.svg';
import BellIcon from '../../assets/images/bell.svg';
import BannerImage from '../../assets/images/banner.svg';
import MapPinIcon from '../../assets/images/map-pin2.svg';
import QRIcon from '../../assets/images/maximize.svg';
import StampIcon from '../../assets/images/star.svg';
import SearchBarIcon from '../../assets/images/search-icon.svg';

function MainScreen() {
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});
  const router = useRouter();

  const { data: location } = useQuery({
    queryKey: ['currentCoords'],
    queryFn: getCurrentCoords,
  });

  const { data: address, isPending: isAddrLoading } = useQuery({
    queryKey: ['address', coords?.lat, coords?.lng],
    queryFn: () => getAddressFromCoords(coords!.lat, coords!.lng),
    enabled: !!coords,
    staleTime: 60_000,
  });

  useEffect(() => {
    if (location) {
      setCoords(location);
    }
  }, [location]);

  const {
    data: storeList = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['storeList', coords?.lat, coords?.lng],
    enabled: !!coords,
    queryFn: () => (coords ? getStoreList(coords.lat, coords.lng, 0, 10) : Promise.resolve([])),
  });

  const transformedStoreList = storeList.map((store) => ({
    storeId: store.storeId.toString(),
    name: store.name,
    imageUrl: store.storeImage,
    categoryName: store.categoryName,
    distance: `${store.distance.toFixed(2)} km`,
    time: `${store.openingHours} ~ ${store.closingHours}`,
    reviewCount: store.reviewCount,
    bookmarkCount: 0,
  }));

  const toggleLike = useCallback((id: string) => {
    setLikedMap((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }, []);

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
            <TouchableOpacity style={styles.iconButton}>
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

        <View style={styles.banner}>
          <BannerImage width="100%" height={130} />
        </View>

        {/* 가게 카드 리스트 */}
        <View style={styles.cardContainer}>
          {isLoading && <ActivityIndicator />}
          {isError && <Text>에러가 발생했습니다.</Text>}
          <FlatList
            data={transformedStoreList}
            keyExtractor={(item) => item.storeId}
            renderItem={({ item }) => (
              <StoreCard
                item={item}
                isLiked={likedMap[item.storeId] === true}
                onToggleLike={() => toggleLike(item.storeId)}
              />
            )}
          />
        </View>
      </View>
    </View>
  );
}

export default MainScreen;
