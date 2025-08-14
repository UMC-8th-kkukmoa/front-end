import React, { useRef, useCallback, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useQueryClient } from '@tanstack/react-query';
import { WebView, WebViewMessageEvent } from 'react-native-webview';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import KakaoMap from '../KakaoMap/KakaoMap';
import Pin from '../../../assets/images/pinPoint.svg';
import styles from './PickLocationScreen.style';
import MapPin from '../../../assets/images/map-pin2.svg';
import ZoomPoint from '../../../assets/images/plus-square.svg';
import OutPoint from '../../../assets/images/minus-square.svg';

type Coords = { lat: number; lng: number };

export default function PickLocationScreen() {
  const { lat, lng } = useLocalSearchParams<{ lat?: string; lng?: string }>();
  const initCenter = (() => {
    const latNum = Number(lat);
    const lngNum = Number(lng);
    return Number.isFinite(latNum) && Number.isFinite(lngNum) ? { lat: latNum, lng: lngNum } : null;
  })();
  const router = useRouter();
  const qc = useQueryClient();
  const mapRef = useRef<WebView>(null);
  const insets = useSafeAreaInsets();

  const [currentCenter, setCurrentCenter] = useState<Coords | null>(initCenter ?? null);

  const onMessage = useCallback((e: WebViewMessageEvent) => {
    try {
      const data = JSON.parse(e.nativeEvent.data);
      if (data.type === 'CENTER_CHANGED' && data.payload) {
        setCurrentCenter({ lat: Number(data.payload.lat), lng: Number(data.payload.lng) });
      }
    } catch (err) {
      console.debug('[PickLocation] onMessage parse fail:', e.nativeEvent.data, err);
    }
  }, []);

  const confirm = async () => {
    if (currentCenter) {
      await qc.cancelQueries({ queryKey: ['coords'], exact: true });
      qc.setQueryData(['coords'], currentCenter);
      router.back();
    } else {
      mapRef.current?.injectJavaScript(`window.KKUKMOA.getCenter(); true;`);
    }
  };

  const zoomIn = () => {
    mapRef.current?.injectJavaScript(`window.KKUKMOA.zoomIn(); true;`);
  };

  const zoomOut = () => {
    mapRef.current?.injectJavaScript(`window.KKUKMOA.zoomOut(); true;`);
  };

  return (
    <View style={styles.container}>
      <KakaoMap center={initCenter} zoom={2} mapRef={mapRef} onMessage={onMessage} />

      <View style={styles.pinWrapper} pointerEvents="none">
        <Pin />
      </View>

      {/* 실시간 좌표 표시
      <View style={[styles.coordsBadge, { top: insets.top + 8 }]}>
        <Text style={styles.coordsText}>
          {currentCenter
            ? `${currentCenter.lat.toFixed(6)}, ${currentCenter.lng.toFixed(6)}`
            : '좌표 수신 중...'}
        </Text>
      </View> */}

      {/* 줌 컨트롤 */}
      <View style={[styles.zoomControls, { top: insets.top + 24 }]}>
        <TouchableOpacity onPress={zoomIn}>
          <ZoomPoint />
        </TouchableOpacity>
        <TouchableOpacity onPress={zoomOut}>
          <OutPoint />
        </TouchableOpacity>
      </View>

      {/* 뒤로가기 */}
      <View style={[styles.floatingButtonWrapper, { bottom: insets.bottom + 187 }]}>
        <TouchableOpacity
          onPress={() => router.back()}
          activeOpacity={0.9}
          style={styles.floatingButton}
        >
          <MapPin />
        </TouchableOpacity>
      </View>

      {/* 하단 바 */}
      <View style={styles.bottomBar}>
        <View style={styles.tipHeader}>
          <Text style={styles.tipText}>3km 내 매장을 찾아드려요 !</Text>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity onPress={confirm} activeOpacity={0.9} style={styles.confirmButton}>
            <Text style={styles.confirmText}>완료</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
