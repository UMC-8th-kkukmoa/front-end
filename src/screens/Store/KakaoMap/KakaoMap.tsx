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
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={colors.light.main} />
      <Text style={styles.loadingText}>지도 로딩 중...</Text>
    </View>
  );
}

interface KakaoMapProps {
  center?: { lat: number; lng: number } | null;
  zoom?: number;
  mapRef?: React.RefObject<WebView<unknown> | null>;
}

export default function KakaoMap({ center, zoom = 3, mapRef }: KakaoMapProps) {
  const fallbackCenter = { lat: 37.5665, lng: 126.978 };
  const finalCenter = center ?? fallbackCenter;

  const rawHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <script src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=__APP_KEY__&autoload=false"></script>
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
            (function () {
              var map, ready = false;
              var pending = [];

              function handleMessage(msg) {
                try {
                  var data = typeof msg === 'string' ? JSON.parse(msg) : msg;
                  if (data.type === 'MOVE_TO_LOCATION') {
                    var p = data.payload || {};
                    var lat = Number(p.lat), lng = Number(p.lng);
                    if (!isFinite(lat) || !isFinite(lng)) { console.warn('잘못된 좌표:', p); return; }
                    if (!ready) { pending.push({ lat: lat, lng: lng }); return; }
                    map.setCenter(new kakao.maps.LatLng(lat, lng));
                  }
                } catch (e) { console.error('지도 메시지 처리 오류:', e); }
              }

              // RN -> Web 브릿지 (document.message / window.message 둘 다 수신)
              document.addEventListener('message', function (e) { handleMessage(e.data); });
              window.addEventListener('message', function (e) { handleMessage(e.data); });

              // 전역 함수( injectJavaScript 로 직접 호출용 )
              window.KKUKMOA = {
                moveTo: function(lat, lng){ handleMessage({ type:'MOVE_TO_LOCATION', payload:{ lat, lng } }); }
              };

              kakao.maps.load(function () {
                var container = document.getElementById('map');
                map = new kakao.maps.Map(container, {
                  center: new kakao.maps.LatLng(${finalCenter.lat}, ${finalCenter.lng}),
                  level: ${zoom}
                });
                ready = true;

                // RN에 준비완료 알림(원하면 WebView onMessage로 받기)
                if (window.ReactNativeWebView && window.ReactNativeWebView.postMessage) {
                  window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'MAP_READY' }));
                }

                // 대기 중 이동들 처리
                while (pending.length) {
                  var t = pending.shift();
                  map.setCenter(new kakao.maps.LatLng(t.lat, t.lng));
                }
              });
            })();
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
