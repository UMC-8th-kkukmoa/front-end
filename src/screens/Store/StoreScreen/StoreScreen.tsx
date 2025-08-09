import React, { useState, useEffect, useRef } from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';
import * as Location from 'expo-location';
import styles from './StoreScreen.style';
import StoreBottomSheet from '../StoreBottomSheet/StoreBottomSheet';
import SearchBar from '../SearchBar/SearchBar';
import CategoryTabs from '../CategoryTabs/CategoryTabs';
import MapFloatingButtons from '../MapFloatingButtons/MapFloatingButtons';
import KakaoMap from '../KakaoMap/KakaoMap';

const KAKAO_REST_API_KEY = process.env.EXPO_PUBLIC_KAKAO_REST_API_KEY;

function Store() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null); // 중앙 카테고리 관리

  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [address, setAddress] = useState<string | null>(null);

  const mapRef = useRef<WebView<unknown>>(null);

  const handleMoveToCurrentLocation = async () => {
    try {
      const loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
        timeout: 5000,
        maximumAge: 0,
      } as any);

      const { latitude, longitude } = loc.coords;

      const newLocation = { lat: latitude, lng: longitude };
      setLocation(newLocation);

      if (mapRef.current) {
        mapRef.current.postMessage(
          JSON.stringify({
            type: 'MOVE_TO_LOCATION',
            payload: newLocation,
          }),
        );
      }
    } catch (err) {
      console.warn('현재 위치 재측정 실패:', err);
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.warn('📛 위치 권한 거부됨');
        return;
      }

      const loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
        timeout: 5000,
        maximumAge: 0,
      } as any);

      const { latitude, longitude } = loc.coords;

      setLocation({ lat: latitude, lng: longitude });

      // console.log('현재위치 : ', latitude, longitude);
      try {
        const res = await fetch(
          `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${longitude}&y=${latitude}`,
          { headers: { Authorization: `KakaoAK ${KAKAO_REST_API_KEY}` } },
        );

        if (!res.ok) {
          setAddress('주소 미확인');
          return;
        }

        const json = await res.json();
        const region = json?.documents?.[0];

        if (!region) {
          setAddress('주소 미확인');
          return;
        }

        const addressText = `${region.region_1depth_name} ${region.region_2depth_name} ${region.region_3depth_name}`;
        setAddress(addressText);
      } catch (error) {
        setAddress('주소 미확인');
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.mapArea}>
        <KakaoMap center={location} zoom={2} mapRef={mapRef} />
        <MapFloatingButtons onPressTarget={handleMoveToCurrentLocation} />
      </View>

      <View style={styles.headerArea}>
        <SearchBar />
        <CategoryTabs selected={selectedCategory} onSelect={setSelectedCategory} />
      </View>

      <StoreBottomSheet selectedCategory={selectedCategory} address={address} location={location} />
    </View>
  );
}

export default Store;
