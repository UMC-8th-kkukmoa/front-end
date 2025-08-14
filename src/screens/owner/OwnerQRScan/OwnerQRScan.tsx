import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { Camera, CameraView } from 'expo-camera';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import * as Keychain from 'react-native-keychain';
import axios from 'axios';
import colors from '../../../design/colors';
import QRHeader from '../../../design/component/QRHeader';

const scanAreaSize = 208;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#444' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 25,
    zIndex: 3,
  },
  headerTitle: { fontSize: 16, fontFamily: 'Pretendard-Medium', color: colors.light.white },
  overlayContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2,
  },
  topOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },
  middleContainer: { flexDirection: 'row', height: scanAreaSize },
  sideOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)' },
  scanAreaContainer: {
    width: scanAreaSize,
    height: scanAreaSize,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 20,
  },
  scanText: { color: '#fff', fontFamily: 'Pretendard-Bold', fontSize: 16 },
  scanArea: {
    width: scanAreaSize,
    height: scanAreaSize,
    position: 'relative',
    backgroundColor: 'transparent',
  },
  corner: { position: 'absolute', width: 60, height: 60, borderColor: colors.light.black },
  topLeft: { top: 0, left: 0, borderLeftWidth: 10, borderTopWidth: 10 },
  topRight: { top: 0, right: 0, borderRightWidth: 10, borderTopWidth: 10 },
  bottomLeft: { bottom: 0, left: 0, borderLeftWidth: 10, borderBottomWidth: 10 },
  bottomRight: { bottom: 0, right: 0, borderRightWidth: 10, borderBottomWidth: 10 },
  scannedText: { color: '#00ff00', fontSize: 16, fontFamily: 'Pretendard-Bold' },
});

export default function QrScannerScreen() {
  const router = useRouter();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = async (result: any) => {
    if (scanned) return;
    setScanned(true);

    const qrUuid = result.data;

    try {
      const credentials = await Keychain.getGenericPassword({
        service: 'com.kkukmoa.accessToken',
      });

      if (!credentials) {
        Alert.alert('알림', '로그인이 필요합니다.');
        setScanned(false);
        return;
      }

      const token = credentials.password;

      const API_BASE_URL = process.env.EXPO_PUBLIC_BASE_URL || 'https://kkukmoa.shop';

      const res = await axios.get(`${API_BASE_URL}/v1/owners/qrcode/category`, {
        params: { 'qr-uuid': qrUuid },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.data.isSuccess) {
        Alert.alert('오류', res.data.message || 'QR 코드 조회 실패');
        return;
      }

      const { type, balance } = res.data.result;

      if (type === 'VOUCHER') {
        router.push({
          pathname: '/owner/VoucherPayment',
          params: {
            balance: balance.toString(),
            qrUuid,
          },
        });
      } else {
        Alert.alert('쿠폰', '쿠폰 사용 처리');
      }
    } catch (err: any) {
      Alert.alert('네트워크 오류', 'QR 코드 처리 중 오류가 발생했습니다.');
    } finally {
      setTimeout(() => {
        setScanned(false);
      }, 2000);
    }
  };

  if (hasPermission === null) {
    return (
      <View style={styles.center}>
        <Text>카메라 권한 요청 중...</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View style={styles.center}>
        <Text>카메라 권한이 없습니다.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* eslint-disable-next-line react/style-prop-object */}
      <StatusBar style="dark" />
      <View style={styles.container}>
        <QRHeader title="QR 스캔" onBackPress={() => router.back()} />

        <CameraView
          style={StyleSheet.absoluteFill}
          facing="back"
          onBarcodeScanned={handleBarCodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ['qr'],
          }}
        />

        <View style={styles.overlayContainer}>
          <View style={styles.topOverlay}>
            <Text style={styles.scanText}>QR을 스캔해주세요.</Text>
          </View>

          <View style={styles.middleContainer}>
            <View style={styles.sideOverlay} />
            <View style={styles.scanAreaContainer}>
              <View style={styles.scanArea}>
                <View style={[styles.corner, styles.topLeft]} />
                <View style={[styles.corner, styles.topRight]} />
                <View style={[styles.corner, styles.bottomLeft]} />
                <View style={[styles.corner, styles.bottomRight]} />
              </View>
            </View>
            <View style={styles.sideOverlay} />
          </View>

          <View style={styles.bottomOverlay}>
            {scanned && <Text style={styles.scannedText}>스캔 완료!</Text>}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
