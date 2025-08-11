import React, { useState, useRef } from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';
import { useQuery } from '@tanstack/react-query';
import styles from './StoreScreen.style';
import StoreBottomSheet from '../StoreBottomSheet/StoreBottomSheet';
import SearchBar from '../SearchBar/SearchBar';
import CategoryTabs from '../CategoryTabs/CategoryTabs';
import MapFloatingButtons from '../MapFloatingButtons/MapFloatingButtons';
import KakaoMap from '../KakaoMap/KakaoMap';
import { getCurrentCoords, getAddressFromCoords } from '../../../utils/location';

function Store() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const mapRef = useRef<WebView<unknown>>(null);

  const {
    data: coords,
    isPending: isLocLoading,
    refetch: refetchCoords,
  } = useQuery({
    queryKey: ['coords'],
    queryFn: getCurrentCoords,
    retry: 0,
  });

  const { data: address, isPending: isAddrLoading } = useQuery({
    queryKey: ['address', coords?.lat, coords?.lng],
    queryFn: () => getAddressFromCoords(coords!.lat, coords!.lng),
    enabled: !!coords,
    staleTime: 60_000,
  });

  // 현재 위치로 이동 버튼
  const handleMoveToCurrentLocation = async () => {
    const res = await refetchCoords(); // 새 좌표 강제 갱신
    const newCoords = res.data;
    if (newCoords && mapRef.current) {
      mapRef.current.postMessage(
        JSON.stringify({
          type: 'MOVE_TO_LOCATION',
          payload: newCoords,
        }),
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.mapArea}>
        <KakaoMap center={coords ?? null} zoom={2} mapRef={mapRef} />
        <MapFloatingButtons onPressTarget={handleMoveToCurrentLocation} />
      </View>

      <View style={styles.headerArea}>
        <SearchBar />
        <CategoryTabs selected={selectedCategory} onSelect={setSelectedCategory} />
      </View>

      <StoreBottomSheet
        selectedCategory={selectedCategory}
        address={isLocLoading || isAddrLoading ? '위치 불러오는 중...' : (address ?? '주소 미확인')}
        location={coords ?? null}
      />
    </View>
  );
}

export default Store;
