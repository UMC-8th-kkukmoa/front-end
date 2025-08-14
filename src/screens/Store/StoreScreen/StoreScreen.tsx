import React, { useState, useRef, useCallback, useEffect } from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import styles from './StoreScreen.style';
import StoreBottomSheet from '../StoreBottomSheet/StoreBottomSheet';
import SearchBar from '../SearchBar/SearchBar';
import CategoryTabs from '../CategoryTabs/CategoryTabs';
import MapFloatingButtons from '../MapFloatingButtons/MapFloatingButtons';
import KakaoMap from '../KakaoMap/KakaoMap';
import { getCurrentCoords, getAddressFromCoords } from '../../../utils/location';

function Store() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const qc = useQueryClient();
  const mapRef = useRef<WebView<unknown>>(null);
  const router = useRouter();

  const { data: coords } = useQuery({
    queryKey: ['coords'],
    queryFn: getCurrentCoords,
    retry: 0,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const { data: address, isPending: isAddrLoading } = useQuery({
    queryKey: ['address', coords?.lat, coords?.lng],
    queryFn: () => getAddressFromCoords(coords!.lat, coords!.lng),
    enabled: !!coords,
    staleTime: 60_000,
  });

  // 목록 → 마커로 내려보내기
  const handleStoresLoaded = useCallback(
    (
      stores: Array<{
        storeId: string;
        name: string;
        categoryName: string;
        lat: number;
        lng: number;
      }>,
    ) => {
      mapRef.current?.postMessage(JSON.stringify({ type: 'SET_MARKERS', payload: stores }));
    },
    [],
  );

  // 맵 메시지 수신 (마커 클릭 → 상세 이동 등)
  const onMapMessage = useCallback((e: any) => {
    try {
      const data = JSON.parse(e?.nativeEvent?.data || '{}');
      if (data.type === 'MARKER_CLICK' && data.payload?.id) {
        const id = String(data.payload.id);
        setSelectedId((prev) => (prev === id ? null : id));
      }
      if (data.type === 'MAP_BACKGROUND_CLICK') {
        setSelectedId(null);
      }
    } catch (err) {
      console.error('onMapMessage parse error', err);
    }
  }, []);

  // 현재 위치로 이동 버튼
  const handleMoveToCurrentLocation = () => {
    const current = qc.getQueryData<{ lat: number; lng: number }>(['coords']) ?? coords ?? null;
    if (!current) return;
    mapRef.current?.postMessage(JSON.stringify({ type: 'MOVE_TO_LOCATION', payload: current }));
  };

  // 픽 페이지로 이동
  const handlePickLocation = () => {
    const c = qc.getQueryData<{ lat: number; lng: number }>(['coords']) ?? coords ?? null;
    router.push({
      pathname: '/store/pickLocation',
      params: c ? { lat: String(c.lat), lng: String(c.lng) } : undefined,
    });
  };

  let addressText = '주소 미확인';
  if (coords) {
    if (isAddrLoading) {
      addressText = '위치 불러오는 중...';
    } else {
      addressText = address ?? '주소 미확인';
    }
  }

  // 앱 → 지도: 선택 변화 시 하이라이트/해제 알림
  useEffect(() => {
    if (!mapRef.current) return;
    if (selectedId) {
      mapRef.current.postMessage(
        JSON.stringify({ type: 'HIGHLIGHT_MARKER', payload: { id: selectedId } }),
      );
    } else {
      mapRef.current.postMessage(JSON.stringify({ type: 'CLEAR_SELECTION' }));
    }
  }, [selectedId]);

  return (
    <View style={styles.container}>
      <View style={styles.mapArea}>
        <KakaoMap center={coords ?? null} zoom={2} mapRef={mapRef} onMessage={onMapMessage} />
        <MapFloatingButtons
          onPressTarget={handlePickLocation}
          onPressLocate={handleMoveToCurrentLocation}
        />
      </View>

      <View style={styles.headerArea}>
        <SearchBar />
        <CategoryTabs
          selected={selectedCategory}
          onSelect={(cat) => {
            setSelectedCategory(cat);
            setSelectedId(null);
          }}
        />
      </View>

      <StoreBottomSheet
        selectedCategory={selectedCategory}
        address={addressText}
        location={coords ?? null}
        onStoresLoaded={handleStoresLoaded}
        selectedId={selectedId}
        onClearSelected={() => setSelectedId(null)}
      />
    </View>
  );
}

export default Store;
