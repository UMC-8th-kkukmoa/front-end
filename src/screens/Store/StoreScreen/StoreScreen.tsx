import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import * as Location from 'expo-location';
import styles from './StoreScreen.style';
import StoreBottomSheet from '../StoreBottomSheet/StoreBottomSheet';
import SearchBar from '../SearchBar/SearchBar';
import CategoryTabs from '../CategoryTabs/CategoryTabs';
import MapFloatingButtons from '../MapFloatingButtons/MapFloatingButtons';
import KakaoMap from '../KakaoMap/KakaoMap';

function Store() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null); // 중앙 카테고리 관리
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('위치 권한이 거부되었습니다.');
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      setLocation({
        lat: loc.coords.latitude,
        lng: loc.coords.longitude,
      });
    })();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.mapArea}>
        <KakaoMap center={location} zoom={1} />
        <MapFloatingButtons />
      </View>

      <View style={styles.headerArea}>
        <SearchBar />
        <CategoryTabs selected={selectedCategory} onSelect={setSelectedCategory} />
      </View>

      <StoreBottomSheet selectedCategory={selectedCategory} />
    </View>
  );
}

export default Store;
