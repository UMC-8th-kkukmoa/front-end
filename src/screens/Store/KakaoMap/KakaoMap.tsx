import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { WebView, WebViewMessageEvent } from 'react-native-webview';
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
  onMessage?: (e: WebViewMessageEvent) => void;
}

export default function KakaoMap({ center, zoom = 3, mapRef, onMessage }: KakaoMapProps) {
  const fallbackCenter = { lat: 37.5665, lng: 126.978 };
  const finalCenter = center ?? fallbackCenter;

  const rawHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <script src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=__APP_KEY__&autoload=false"></script>
        <style>
          html, body, #map { width:100%; height:100%; margin:0; padding:0; }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script>
          (function () {
            var map, ready = false;
            var pending = [];
            var overlays = [];
            var overlayMap = {};
            var selectedId = null; 

            function clearSelection(){
              if (selectedId && overlayMap[selectedId]) {
                var prev = overlayMap[selectedId];
                prev.ov.setContent(makeMarkerContent(prev.category, false, selectedId));
                if (prev.ov.setZIndex) prev.ov.setZIndex(prev.z || 1);
              }
              selectedId = null;
            }

            function postToRN(msg){ 
              if (window.ReactNativeWebView && window.ReactNativeWebView.postMessage) {
                window.ReactNativeWebView.postMessage(JSON.stringify(msg));
              }
            }

            function categoryIconSvg(cat){
              // 필요한 카테고리만 간단히 예시 (원하면 상세 SVG로 교체)
              if(cat==='카페') return \`<svg width="40" height="40" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M4.12481 17.3251C3.89106 17.3251 3.69526 17.2459 3.53741 17.0875C3.37956 16.9291 3.30036 16.7333 3.29981 16.5001C3.29926 16.2669 3.37846 16.0711 3.53741 15.9127C3.69636 15.7543 3.89216 15.6751 4.12481 15.6751H15.6748C15.9086 15.6751 16.1046 15.7543 16.263 15.9127C16.4214 16.0711 16.5004 16.2669 16.4998 16.5001C16.4993 16.7333 16.4201 16.9294 16.2622 17.0883C16.1044 17.2473 15.9086 17.3262 15.6748 17.3251H4.12481ZM6.59981 14.0251C5.69231 14.0251 4.91543 13.702 4.26918 13.0557C3.62293 12.4095 3.29981 11.6326 3.29981 10.7251V4.1251C3.29981 3.67135 3.46151 3.28305 3.78491 2.9602C4.10831 2.63735 4.49661 2.47565 4.94981 2.4751H16.4998C16.9536 2.4751 17.3421 2.6368 17.6655 2.9602C17.9889 3.2836 18.1504 3.6719 18.1498 4.1251V6.6001C18.1498 7.05385 17.9884 7.44242 17.6655 7.76582C17.3427 8.08922 16.9541 8.25065 16.4998 8.2501H14.8498V10.7251C14.8498 11.6326 14.5267 12.4095 13.8804 13.0557C13.2342 13.702 12.4573 14.0251 11.5498 14.0251H6.59981ZM14.8498 6.6001H16.4998V4.1251H14.8498V6.6001Z" fill="white"/></svg>\`
              if(cat==='음식점') return \`<svg width="40" height="40" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M3.08817 2.3231C3.10349 2.13692 3.18998 1.96381 3.32966 1.83977C3.46935 1.71573 3.65147 1.6503 3.83815 1.6571C4.02484 1.6639 4.20172 1.7424 4.33201 1.87628C4.4623 2.01015 4.53597 2.1891 4.5377 2.3759V6.08345C4.5377 6.2202 4.59202 6.35136 4.68872 6.44805C4.78542 6.54475 4.91657 6.59908 5.05332 6.59908C5.19007 6.59908 5.32122 6.54475 5.41792 6.44805C5.51462 6.35136 5.56895 6.2202 5.56895 6.08345V2.26865C5.56895 2.10455 5.63413 1.94717 5.75017 1.83113C5.86621 1.71509 6.02359 1.6499 6.1877 1.6499C6.3518 1.6499 6.50918 1.71509 6.62522 1.83113C6.74126 1.94717 6.80645 2.10455 6.80645 2.26865V6.08345C6.80645 6.2202 6.86077 6.35136 6.95747 6.44805C7.05417 6.54475 7.18532 6.59908 7.32207 6.59908C7.45882 6.59908 7.58997 6.54475 7.68667 6.44805C7.78337 6.35136 7.8377 6.2202 7.8377 6.08345V2.3759C7.83942 2.1891 7.91309 2.01015 8.04338 1.87628C8.17367 1.7424 8.35055 1.6639 8.53724 1.6571C8.72392 1.6503 8.90604 1.71573 9.04573 1.83977C9.18541 1.96381 9.2719 2.13692 9.28722 2.3231C9.3227 2.828 9.4877 5.25515 9.4877 6.5999C9.4877 7.71365 8.93494 8.6987 8.09179 9.29518C7.91359 9.4214 7.8707 9.55505 7.87482 9.6227C7.9763 11.1721 8.2502 15.4125 8.2502 16.0849C8.2502 16.6319 8.0329 17.1565 7.6461 17.5433C7.25931 17.9301 6.7347 18.1474 6.1877 18.1474C5.64069 18.1474 5.11608 17.9301 4.72929 17.5433C4.34249 17.1565 4.1252 16.6319 4.1252 16.0849C4.1252 15.4117 4.3991 11.1721 4.50057 9.6227C4.5047 9.55505 4.4618 9.4214 4.2836 9.29518C3.85221 8.99042 3.50028 8.58656 3.25737 8.11755C3.01447 7.64854 2.88769 7.12808 2.8877 6.5999C2.8877 5.25515 3.0527 2.828 3.08817 2.3231ZM10.7252 6.39365C10.7252 5.13553 11.225 3.92894 12.1146 3.03931C13.0042 2.14969 14.2108 1.6499 15.4689 1.6499C15.633 1.6499 15.7904 1.71509 15.9065 1.83113C16.0225 1.94717 16.0877 2.10455 16.0877 2.26865V9.28115C16.0877 9.5435 16.1751 10.8445 16.2733 12.2858L16.2774 12.3543C16.3847 13.9284 16.5002 15.6403 16.5002 16.0849C16.5002 16.6319 16.2829 17.1565 15.8961 17.5433C15.5093 17.9301 14.9847 18.1474 14.4377 18.1474C13.8907 18.1474 13.3661 17.9301 12.9793 17.5433C12.5925 17.1565 12.3752 16.6319 12.3752 16.0849C12.3752 15.6609 12.4808 13.9309 12.5831 12.3444C12.6342 11.5433 12.6862 10.767 12.725 10.1911L12.744 9.8999H12.1689C11.9793 9.8999 11.7916 9.86256 11.6164 9.79C11.4413 9.71745 11.2821 9.6111 11.1481 9.47704C11.014 9.34297 10.9076 9.18381 10.8351 9.00865C10.7625 8.83349 10.7252 8.64575 10.7252 8.45615V6.39365Z" fill="white"/></svg>\`
              if(cat==='운동/건강') return \`<svg width="40" height="40" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.49017 5.91071C7.5456 5.79977 7.63308 5.70805 7.74127 5.64744C7.84946 5.58683 7.97337 5.56013 8.09692 5.57081C8.22047 5.58148 8.33796 5.62903 8.43416 5.70729C8.53036 5.78555 8.60082 5.89091 8.6364 6.00971L10.0441 10.7029L11.2042 8.38571C11.2556 8.28295 11.3346 8.19653 11.4323 8.13613C11.5301 8.07573 11.6427 8.04373 11.7576 8.04373C11.8725 8.04373 11.9851 8.07573 12.0829 8.13613C12.1806 8.19653 12.2596 8.28295 12.311 8.38571L13.376 10.5188H17.1179C17.675 9.37026 17.9577 8.10796 17.9436 6.83148C17.9192 4.42957 15.9922 2.4751 13.6479 2.4751C11.7882 2.4751 10.5541 3.61746 9.89981 4.44736C9.24703 3.6163 8.01147 2.4751 6.15174 2.4751C3.80745 2.4751 1.88043 4.42957 1.85606 6.83148C1.84605 7.66091 1.9625 8.48701 2.2014 9.28135H5.80485L7.49017 5.91071Z" fill="white"/>
                                        <path d="M12.4402 11.4143L11.7561 10.0461L10.4532 12.6518C10.4018 12.7546 10.3228 12.841 10.225 12.9014C10.1273 12.9617 10.0147 12.9937 9.8998 12.9937C9.88253 12.9937 9.86474 12.9929 9.84644 12.9914C9.72259 12.9811 9.60471 12.9338 9.50814 12.8556C9.41158 12.7773 9.3408 12.6719 9.30503 12.5528L7.89737 7.85962L6.73722 10.1768C6.68607 10.2791 6.60762 10.3651 6.51055 10.4254C6.41348 10.4858 6.3016 10.5181 6.1873 10.5187H2.6817C3.04264 11.2738 3.52307 12.0171 4.123 12.7485C4.84887 13.6333 6.16487 15.0479 9.2041 17.1111C9.40906 17.2516 9.65172 17.3267 9.90019 17.3267C10.1487 17.3267 10.3913 17.2516 10.5963 17.1111C13.6355 15.0479 14.9515 13.6333 15.6774 12.7485C15.9388 12.4303 16.184 12.0991 16.4121 11.7562H12.9936C12.8787 11.7562 12.766 11.7242 12.6683 11.6639C12.5706 11.6035 12.4916 11.5171 12.4402 11.4143ZM17.9436 10.5187H17.1179C16.9122 10.9474 16.6764 11.3609 16.4121 11.7562H17.9436C18.1077 11.7562 18.265 11.691 18.3811 11.575C18.4971 11.4589 18.5623 11.3015 18.5623 11.1374C18.5623 10.9733 18.4971 10.816 18.3811 10.6999C18.265 10.5839 18.1077 10.5187 17.9436 10.5187ZM1.85605 9.2812C1.69195 9.2812 1.53457 9.34639 1.41853 9.46242C1.30249 9.57846 1.2373 9.73584 1.2373 9.89995C1.2373 10.064 1.30249 10.2214 1.41853 10.3375C1.53457 10.4535 1.69195 10.5187 1.85605 10.5187H2.6817C2.49032 10.119 2.32975 9.70533 2.20139 9.2812H1.85605Z" fill="white"/>
                                        </svg>\`
              if(cat==='교육') return \`<svg width="40" height="40" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M6.04263 15.8748C7.41803 15.8748 8.33802 16.3889 8.74392 16.6788C8.89313 16.7615 9.316 17.0101 9.40686 17.0182V4.48906C8.86838 3.48634 7.28544 2.67454 5.64487 2.67454C3.57294 2.67454 1.81639 3.86784 1.42676 4.67151V16.3726C1.42676 16.9196 1.74992 17.1268 2.13956 17.1268C2.45424 17.1268 2.66143 17.0189 2.86049 16.8531C3.34948 16.414 4.50106 15.8748 6.04263 15.8748ZM13.766 15.8751C15.3073 15.8751 16.4511 16.414 16.9482 16.8531C17.1384 17.0104 17.346 17.1264 17.6606 17.1264C18.0503 17.1264 18.3734 16.9196 18.3734 16.3726V4.6708C17.9838 3.86678 16.2354 2.67383 14.1635 2.67383C12.5229 2.67383 10.9399 3.48563 10.4015 4.48836V17.0352C10.4927 17.0267 10.9152 16.77 11.0725 16.6788C11.4703 16.3889 12.3903 15.8751 13.766 15.8751Z" fill="white"/></svg>\`
              if(cat==='미용실') return \`<svg width="40" height="40" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M15.51 5.28C13.9557 3.2076 11.979 2.0625 9.89996 2.0625C7.82096 2.0625 5.84426 3.2076 4.28996 5.28C3.12094 6.83843 1.71101 8.943 1.51631 11.1573C1.41649 12.2991 1.63759 13.4681 2.35699 14.581C3.06731 15.6799 4.22809 16.6691 5.91686 17.5345C6.95554 18.0667 8.08661 17.353 8.23429 16.3111C7.88327 16.0746 7.56148 15.7974 7.27564 15.4853C6.43991 14.5736 5.77414 13.2388 5.77414 11.55C5.77414 8.7219 7.23439 6.81862 8.99164 6.3162C9.22429 6.2502 9.48664 6.4251 9.51469 6.666C9.63113 7.66342 10.1074 8.58411 10.8542 9.25543C11.601 9.92676 12.5671 10.3026 13.5712 10.3125C14.1273 10.3174 14.025 11.187 14.025 11.55C14.025 13.2388 13.36 14.5736 12.5235 15.4853C12.2248 15.8119 11.8965 16.0908 11.5632 16.3127C11.6952 17.3588 12.8155 18.0782 13.855 17.5758C15.6411 16.7145 16.8605 15.7253 17.5989 14.6182C18.3471 13.4945 18.5583 12.3106 18.4296 11.1581C18.1821 8.93887 16.6666 6.8211 15.51 5.28Z" fill="white"/></svg>\`
              return \`<svg width="40" height="40" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M4.12481 17.3251C3.89106 17.3251 3.69526 17.2459 3.53741 17.0875C3.37956 16.9291 3.30036 16.7333 3.29981 16.5001C3.29926 16.2669 3.37846 16.0711 3.53741 15.9127C3.69636 15.7543 3.89216 15.6751 4.12481 15.6751H15.6748C15.9086 15.6751 16.1046 15.7543 16.263 15.9127C16.4214 16.0711 16.5004 16.2669 16.4998 16.5001C16.4993 16.7333 16.4201 16.9294 16.2622 17.0883C16.1044 17.2473 15.9086 17.3262 15.6748 17.3251H4.12481ZM6.59981 14.0251C5.69231 14.0251 4.91543 13.702 4.26918 13.0557C3.62293 12.4095 3.29981 11.6326 3.29981 10.7251V4.1251C3.29981 3.67135 3.46151 3.28305 3.78491 2.9602C4.10831 2.63735 4.49661 2.47565 4.94981 2.4751H16.4998C16.9536 2.4751 17.3421 2.6368 17.6655 2.9602C17.9889 3.2836 18.1504 3.6719 18.1498 4.1251V6.6001C18.1498 7.05385 17.9884 7.44242 17.6655 7.76582C17.3427 8.08922 16.9541 8.25065 16.4998 8.2501H14.8498V10.7251C14.8498 11.6326 14.5267 12.4095 13.8804 13.0557C13.2342 13.702 12.4573 14.0251 11.5498 14.0251H6.59981ZM14.8498 6.6001H16.4998V4.1251H14.8498V6.6001Z" fill="white"/></svg>\`
              }

              function selectedBgSvg() {
                // 한 줄 문자열로(줄바꿈/백틱 이슈 회피)
                return '<svg width="90" height="80" viewBox="0 0 42 50" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M35.1425 34.9408L21 49L6.85751 34.9408C4.06056 32.1601 2.15585 28.6175 1.38423 24.7607C0.612607 20.904 1.00873 16.9064 2.52252 13.2734C4.0363 9.64046 6.59975 6.53534 9.88871 4.35069C13.1777 2.16605 17.0444 1 21 1C24.9556 1 28.8223 2.16605 32.1113 4.35069C35.4003 6.53534 37.9637 9.64046 39.4775 13.2734C40.9913 16.9064 41.3874 20.904 40.6158 24.7607C39.8442 28.6175 37.9394 32.1601 35.1425 34.9408Z" fill="#FF8246" stroke="white" stroke-width="1.18"/></svg>';
              }

              function defaultBgSvg() {
                // 기존 동그란 배경을 한 줄 문자열로(그대로 붙여도 됨)
                return '<svg width="120" height="120" viewBox="0 0 58 57" fill="none" xmlns="http://www.w3.org/2000/svg"><g filter="url(#f0)"><circle cx="28" cy="25" r="16" fill="#FF8246"/><circle cx="28" cy="25" r="16" stroke="#DCDCDC" stroke-width="2.18"/></g><g filter="url(#f1)"><circle cx="28.0002" cy="24.9999" r="14.6789" fill="#FF8246"/><circle cx="28.0002" cy="24.9999" r="14.6789" stroke="white" stroke-width="2"/></g><defs><filter id="f0"><feFlood flood-opacity="0"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dx="1.11423" dy="3.34269"/><feGaussianBlur stdDeviation="5.57116"/><feComposite in2="hardAlpha" operator="out"/><feColorMatrix type="matrix" values="0 0 0 0 0.423016 0 0 0 0 0.193675 0 0 0 0 0.193675 0 0 0 0.15 0"/><feBlend mode="normal" in2="BackgroundImageFix" result="e1"/><feBlend mode="normal" in="SourceGraphic" in2="e1" result="shape"/></filter><filter id="f1"><feFlood flood-opacity="0"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dx="1.02223" dy="3.06669"/><feGaussianBlur stdDeviation="5.11115"/><feComposite in2="hardAlpha" operator="out"/><feColorMatrix type="matrix" values="0 0 0 0 0.423016 0 0 0 0 0.193675 0 0 0 0 0.193675 0 0 0 0.15 0"/><feBlend mode="normal" in2="BackgroundImageFix" result="e2"/><feBlend mode="normal" in="SourceGraphic" in2="e2" result="shape"/></filter></defs></svg>';
              }
                          
              // 배경 핀 SVG + 가운데 아이콘 SVG 겹치기
              function buildMarkerHtml(category, isSelected){
              var bg = isSelected ? selectedBgSvg() : defaultBgSvg();

              var iconTranslate = isSelected ? '64%,40%' : '95%,77%';
              var icon = categoryIconSvg(category);
              return '<div style="position:relative; transform:translate(50%, 50%); cursor:pointer;">'
                  +   '<div style="position:absolute; left:0; top:0;">'+ bg +'</div>'
                  +   '<div style="position:absolute; left:50%; top:50%; transform:translate('+iconTranslate+');">'+ icon +'</div>'
                  + '</div>';
              }
              function makeMarkerContent(category, isSelected, id){
                const wrap = document.createElement('div');
                wrap.innerHTML = buildMarkerHtml(category, isSelected);
                const node = wrap.firstElementChild;

                if (node) {
                  node.addEventListener('click', function(e){
                    // 지도 'click' 리스너로 전파되어 바로 해제되는 걸 방지
                    e.stopPropagation();
                    // 토글
                    selectMarker(String(id));
                    postToRN({ type:'MARKER_CLICK', payload:{ id: String(id) }});
                  });
                }
                return node || wrap.innerHTML; // setContent가 Node/HTML string 모두 받음
              }
            function clearMarkers(){
              Object.keys(overlayMap).forEach(function(id){
                overlayMap[id].ov.setMap(null);
              });
              overlayMap = {};
              selectedId = null;
            }

              function setMarkers(list){
                if(!map) return;
                clearMarkers();

                (list||[]).forEach(function(item){
                  const id = String(item.storeId);
                  const pos = new kakao.maps.LatLng(Number(item.lat), Number(item.lng));

                  const ov = new kakao.maps.CustomOverlay({
                    position: pos,
                    content: makeMarkerContent(item.categoryName, false, id),
                    yAnchor: 1,
                    clickable: true
                  });
                  ov.setMap(map);

                  overlayMap[id] = { ov, category: item.categoryName, pos, z: 1 };
                });
              }

            function handleMessage(msg) {
              try {
                var data = typeof msg === 'string' ? JSON.parse(msg) : msg;
                if (data.type === 'MOVE_TO_LOCATION') {
                  var p = data.payload || {};
                  var lat = Number(p.lat), lng = Number(p.lng);
                  if (!isFinite(lat) || !isFinite(lng)) { console.warn('잘못된 좌표:', p); return; }
                  if (!ready) { pending.push({ lat: lat, lng: lng }); return; }
                  map.setCenter(new kakao.maps.LatLng(lat, lng));
                } else if (data.type === 'SET_MARKERS') {
                  if (!ready) {
                  // 맵 준비 후에 다시 세팅하도록 보류 (간단히 즉시 저장 후 load 이후 처리해도 됨)
                    window.__kkukmoa_markers = data.payload || [];
                  } else {
                    setMarkers(data.payload || []);
                  }
                } else if (data.type === 'CLEAR_MARKERS') {
                  clearMarkers();
                }
              } catch (e) { console.error('지도 메시지 처리 오류:', e, msg); }
            }

            function selectMarker(id){
              if (selectedId === id) { // ✅ 같은 마커 다시 클릭 → 해제
                clearSelection();
                return;
              }

              clearSelection(); // 이전 선택 해제

              const cur = overlayMap[id];
              if (!cur) return;

              cur.ov.setContent(makeMarkerContent(cur.category, true, id));
              if (cur.ov.setZIndex) cur.ov.setZIndex(9999);
              if (cur.pos) map.setCenter(cur.pos); // ✅ 선택 시 센터 이동
              selectedId = id;
            }

            document.addEventListener('message', function (e) { handleMessage(e.data); });
            window.addEventListener('message', function (e) { handleMessage(e.data); });

            // RN에서 injectJavaScript로 직접 호출할 함수들
            window.KKUKMOA = {
              moveTo: function(lat, lng){ handleMessage({ type:'MOVE_TO_LOCATION', payload:{ lat: lat, lng: lng } }); },
              getCenter: function(){
                if (!map) return;
                var c = map.getCenter();
                postToRN({ type: 'CENTER_CHANGED', payload: { lat: c.getLat(), lng: c.getLng() }});
              },
              zoomIn: function(){
                if (!map) return;
                map.setLevel(Math.max(1, map.getLevel() - 1));
              },
              zoomOut: function(){
                if (!map) return;
                map.setLevel(map.getLevel() + 1);
              }
            };

            kakao.maps.load(function () {
              var container = document.getElementById('map');
              map = new kakao.maps.Map(container, {
                center: new kakao.maps.LatLng(${finalCenter.lat}, ${finalCenter.lng}),
                level: ${zoom}
              });
              ready = true;

              // 지도 빈 공간 클릭 → 선택 해제 + RN에 알림
              kakao.maps.event.addListener(map, 'click', function(){
                clearSelection();
                postToRN({ type: 'MAP_BACKGROUND_CLICK' });
              });

              // 지도 이동/줌 종료 시마다 현재 중심 보고
              kakao.maps.event.addListener(map, 'idle', function(){
                var c = map.getCenter();
                postToRN({ type: 'CENTER_CHANGED', payload: { lat: c.getLat(), lng: c.getLng() }});
              });

              // 준비 완료 알림
              postToRN({ type: 'MAP_READY' });

              // 대기 중 이동 처리
              while (pending.length) {
                var t = pending.shift();
                map.setCenter(new kakao.maps.LatLng(t.lat, t.lng));
              }
              // 대기 중 마커 처리
              if (window.__kkukmoa_markers) {
                setMarkers(window.__kkukmoa_markers);
                window.__kkukmoa_markers = null;
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
      onMessage={onMessage}
    />
  );
}
