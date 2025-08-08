import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import colors from '../../../design/colors';

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 8,
    fontSize: 14,
    color: colors.light.gray2,
  },
});

function renderMapLoading() {
  // 임시 UI
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" />
      <Text style={styles.loadingText}>지도 로딩 중...</Text>
    </View>
  );
}

interface KakaoMapProps {
  center?: { lat: number; lng: number } | null;
  zoom?: number;
  mapRef?: React.RefObject<WebView<unknown> | null>;
}

export default function KakaoMap({ center, zoom, mapRef }: KakaoMapProps) {
  const fallbackCenter = { lat: 37.5665, lng: 126.978 };
  const finalCenter = center ?? fallbackCenter;

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
          
          document.addEventListener("message", function(event) {
          try {
            const data = JSON.parse(event.data);

            if (data.type === 'MOVE_TO_LOCATION') {
              const { lat, lng } = data.payload;
              const newCenter = new kakao.maps.LatLng(lat, lng);
              map.setCenter(newCenter);
            }
          } catch (e) {
            console.error('지도 메시지 처리 오류:', e);
          }
        });
        </script>
      </body>
    </html>
  `;

  const html = rawHtml.replace('__APP_KEY__', process.env.EXPO_PUBLIC_KAKAO_MAP_KEY ?? '');

  return (
    <WebView<unknown>
      ref={mapRef}
      originWhitelist={['*']}
      source={{ html }}
      style={{ flex: 1 }}
      startInLoadingState
      renderLoading={renderMapLoading}
      javaScriptEnabled
    />
  );
}
