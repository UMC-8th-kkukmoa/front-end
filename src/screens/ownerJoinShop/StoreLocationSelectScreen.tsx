import React from 'react';
import { Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../design/component/Header';
import { KkButton } from '../../design/component/KkButton';
import KakaoMap from '../Store/KakaoMap/KakaoMap';
import MapPinIcon from '../../assets/images/map-pin.svg';
import styles from './StoreLocationSelectScreen.style';
import { getAddressFromCoords } from '../../utils/location';
import useOwnerJoinStore from '../../store/useOwnerJoinStore';

export default function StoreLocationSelectScreen() {
  const router = useRouter();
  const debounceRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const { setLatitude, setLongitude, setAddress } = useOwnerJoinStore();

  const [center, setCenter] = React.useState<{ lat: number; lng: number } | null>(null);
  const [regionName, setRegionName] = React.useState<string | null>(null);

  const mapNode = React.useMemo(
    () => (
      <KakaoMap
        center={null}
        zoom={1}
        onMessage={(e) => {
          try {
            const data = JSON.parse(e.nativeEvent.data);
            if (data.type === 'CENTER_CHANGED' && data.payload) {
              const { lat, lng } = data.payload;
              setCenter({ lat, lng });

              if (debounceRef.current) {
                clearTimeout(debounceRef.current);
              }
              debounceRef.current = setTimeout(async () => {
                try {
                  const newRegionName = await getAddressFromCoords(lat, lng);
                  setRegionName(newRegionName);
                } catch (err) {
                  console.error('Failed to get address from coords', err);
                  setRegionName('주소를 불러올 수 없습니다.');
                }
              }, 300);
            }
          } catch (error) {
            console.error('Failed to parse message from map', error);
          }
        }}
      />
    ),
    [],
  );

  return (
    <SafeAreaView style={styles.screen}>
      <Header title="위치 선택" onBackPress={() => router.back()} />

      <View style={styles.mapContainer}>
        {mapNode}

        {/* Center pin overlay */}
        <View pointerEvents="none" style={styles.pinOverlay}>
          <MapPinIcon width={32} height={32} />
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.locationTextWrap}>
          <Text style={styles.locationTitle}>선택한 위치</Text>
          <Text style={styles.locationValue} numberOfLines={1}>
            {regionName || '지도를 이동하여 위치를 선택하세요'}
          </Text>
          {center && (
            <Text style={styles.coordValue}>
              {center.lat.toFixed(6)}, {center.lng.toFixed(6)}
            </Text>
          )}
        </View>

        <KkButton
          label="이 위치로 설정"
          type={center ? 'primary' : 'disabled'}
          size="large"
          onPress={() => {
            if (!center) return;
            setLatitude(center.lat);
            setLongitude(center.lng);
            setAddress(regionName ?? '');
            router.back();
          }}
          shadow
        />
      </View>
    </SafeAreaView>
  );
}
