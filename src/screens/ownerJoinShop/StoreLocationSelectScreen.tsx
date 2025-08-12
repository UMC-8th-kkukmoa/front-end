import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import Header from '../../design/component/Header';
import { KkButton } from '../../design/component/KkButton';
import KakaoMap from '../Store/KakaoMap/KakaoMap';
import MapPinIcon from '../../assets/images/map-pin.svg';
import styles from './StoreLocationSelectScreen.style';

export default function StoreLocationSelectScreen() {
  const [center, setCenter] = React.useState<{ lat: number; lng: number } | null>(null);
  const [regionName, setRegionName] = React.useState<string | null>(null);

  const onCenterChangeStable = React.useCallback(
    ({ lat, lng, regionName: rn }: { lat: number; lng: number; regionName?: string | null }) => {
      setCenter({ lat, lng });
      setRegionName(rn ?? null);
    },
    [],
  );

  const mapNode = React.useMemo(
    () => <KakaoMap center={null} zoom={1} onCenterChange={onCenterChangeStable} />,
    [onCenterChangeStable],
  );

  return (
    <SafeAreaView style={styles.screen}>
      <Header title="위치 선택" onBackPress={() => {}} />

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
            // TODO: navigate back with selected center/regionName
          }}
          shadow
        />
      </View>
    </SafeAreaView>
  );
}
