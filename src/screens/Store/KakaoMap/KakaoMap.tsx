import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import colors from '../../../design/colors';

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 8,
    fontSize: 14,
    color: colors.light.gray2,
  },
});

interface KakaoMapProps {
  center?: { lat: number; lng: number } | null;
  zoom?: number;
}

function renderMapLoading() {
  // 임시 UI
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" />
      <Text style={styles.loadingText}>지도 로딩 중...</Text>
    </View>
  );
}

// 일단 center 무시
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function KakaoMap({ center, zoom = 3 }: KakaoMapProps) {
  const fallbackCenter = { lat: 37.5665, lng: 126.978 };
  // 에뮬레이터 위치값이 이상해서 서울 시청으로 하드코딩 후 나중 배포시 수정
  const finalCenter = fallbackCenter; // 추후: center ?? fallbackCenter;

  const rawHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <script src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=__APP_KEY__"></script>
        <style>
          html, body, #map {
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
          }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script>
          var container = document.getElementById('map');
          var options = {
            center: new kakao.maps.LatLng(${finalCenter.lat}, ${finalCenter.lng}),
            level: ${zoom}
          };
          var map = new kakao.maps.Map(container, options); 
        </script>
      </body>
    </html>
  `;

  const html = rawHtml.replace('__APP_KEY__', process.env.EXPO_PUBLIC_KAKAO_MAP_KEY ?? '');

  return (
    <WebView
      originWhitelist={['*']}
      source={{ html }}
      style={{ flex: 1 }}
      startInLoadingState
      renderLoading={renderMapLoading}
    />
  );
}
