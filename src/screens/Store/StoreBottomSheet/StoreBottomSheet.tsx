import React, { useState, useMemo, useRef, useCallback, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Dimensions, Alert } from 'react-native';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import axios from 'axios';
import * as Keychain from 'react-native-keychain';
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

type Props = {
  selectedCategory: string | null;
  address?: string | null;
  location?: { lat: number; lng: number } | null;
};

function StoreBottomSheet({ selectedCategory, address, location }: Props) {
  const sheetRef = useRef<BottomSheet>(null);
  const { height: screenHeight } = Dimensions.get('window');

  const snapPoints = useMemo(() => {
    const topSnap = screenHeight * 0.75;
    const bottomSnap = screenHeight * 0.1;
    return [bottomSnap, topSnap];
  }, []);

  const [storeList, setStoreList] = useState<any[]>([]);
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [sheetIndex, setSheetIndex] = useState(1);
  const [showMapButton, setShowMapButton] = useState(false); // 지도보기 버튼 반응 느려서 추가

  // 시트 관리
  const handleSheetChanges = useCallback((index: number) => {
    setSheetIndex(index);

    // 바텀시트 상태에 따라 지도 버튼 관리
    if (index === 1) {
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

  // API 호출
  useEffect(() => {
    const fetchStores = async () => {
      if (!location) return;

      const API_BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

      const params: any = {
        latitude: location.lat,
        longitude: location.lng,
        offset: 0,
        limit: 10,
      };

      let url = '';
      if (selectedCategory) {
        url = `${API_BASE_URL}/v1/stores/category`;
        params.categoryType = selectedCategory;
      } else {
        url = `${API_BASE_URL}/v1/stores`;
      }

      try {
        const credentials = await Keychain.getGenericPassword({
          service: 'com.kkukmoa.accessToken',
        });

        if (!credentials) {
          Alert.alert('알림', '로그인이 필요합니다.');
          return;
        }

        const token = credentials.password;

        const res = await axios.get(url, {
          params,
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        });

        if (res.data.isSuccess) {
          const stores = res.data.result.map((store: any) => ({
            storeId: store.storeId.toString(),
            name: store.name,
            imageUrl: store.storeImage,
            category: selectedCategory ?? '기타',
            distance: `${store.distance.toFixed(2)} km`,
            time: `${store.openingHours} ~ ${store.closingHours}`,
            reviewCount: store.reviewCount,
            bookmarkCount: 0,
          }));

          // console.log('✅ 가게 데이터:', stores);
          setStoreList(stores);
        } else {
          Alert.alert('오류', res.data.message || '가게 정보를 불러오지 못했습니다.');
        }
      } catch (err: any) {
        Alert.alert('오류', err?.message || '가게 정보를 불러오는 중 문제가 발생했습니다.');
      }
    };

    fetchStores();
  }, [location, selectedCategory]);

  const filteredAndSortedStores = useMemo(() => {
    return storeList
      .map((store) => ({
        ...store,
        distanceValue: parseFloat(store.distance.replace(' km', '')),
      }))
      .sort((a, b) => a.distanceValue - b.distanceValue);
  }, [storeList]);

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
          data={filteredAndSortedStores}
          keyExtractor={(item) => item.storeId}
          renderItem={renderItem}
          contentContainerStyle={{ ...styles.listContentContainer, flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled
          ListEmptyComponent={EmptyStoreList}
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
