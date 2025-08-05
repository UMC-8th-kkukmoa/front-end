import React from 'react';
import { WebView } from 'react-native-webview';

export default function KakaoMap() {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <script src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=27fd88ac682debf9375707881ce644ba"></script>
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
            center: new kakao.maps.LatLng(37.5665, 126.9780), // 서울시청 기준
            level: 3
          };
          var map = new kakao.maps.Map(container, options);
        </script>
      </body>
    </html>
  `;

  return <WebView originWhitelist={['*']} source={{ html }} style={{ flex: 1 }} />;
}
