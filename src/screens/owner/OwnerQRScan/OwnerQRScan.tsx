import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { Camera, useCameraDevice, useCodeScanner } from 'react-native-vision-camera';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import * as Keychain from 'react-native-keychain';
import axios from 'axios';
import colors from '../../../design/colors';
import QRHeader from '../../../design/component/QRHeader';
import OwnerUseCouponModal from '../OwnerUseCoupon/OwnerUseCouponModal';

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
  processingText: { color: '#ffaa00', fontSize: 16, fontFamily: 'Pretendard-Bold' },
  processingText: { color: '#ffaa00', fontSize: 16, fontFamily: 'Pretendard-Bold' },
});

export default function QrScannerScreen() {
  const router = useRouter();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isScanned, setIsScanned] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [couponModalVisible, setCouponModalVisible] = useState(false);
  const [currentQrUuid, setCurrentQrUuid] = useState<string | null>(null);

  const device = useCameraDevice('back');

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleQRCodeScanned = async (qrValue: string) => {
    if (isScanned || isProcessing) return;

    setIsScanned(true);
    setIsProcessing(true);

    console.log('QR 스캔됨:', qrValue);

    try {
      const credentials = await Keychain.getGenericPassword({
        service: 'com.kkukmoa.accessToken',
      });

      if (!credentials) {
        Alert.alert('알림', '로그인이 필요합니다.');
        return;
      }

      const token = credentials.password;
      const API_BASE_URL = process.env.EXPO_PUBLIC_BASE_URL || 'https://kkukmoa.shop';

      const res = await axios.get(`${API_BASE_URL}/v1/owners/qrcode/category`, {
        params: { 'qr-uuid': qrValue },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        timeout: 10000, // 10초 타임아웃
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
            qrUuid: qrValue,
          },
        });
      } else if (type === 'COUPON') {
        setCurrentQrUuid(qrValue);
        setCouponModalVisible(true);
        // eslint-disable-next-line no-console
        console.log('쿠폰 모달 표시됨');
      } else {
        Alert.alert('알림', '알 수 없는 QR 코드 타입입니다.');
      }
    } catch (err: any) {
      // eslint-disable-next-line no-console
      console.error('QR 처리 오류:', err);
      if (err.code === 'ECONNABORTED') {
        Alert.alert('네트워크 오류', '요청 시간이 초과되었습니다. 다시 시도해주세요.');
      } else {
        Alert.alert('네트워크 오류', 'QR 코드 처리 중 오류가 발생했습니다.');
      }
    } finally {
      setIsProcessing(false);
      // 2초 후 다시 스캔 가능하도록
      setTimeout(() => {
        setIsScanned(false);
      }, 2000);
    }
  };

  const codeScanner = useCodeScanner({
    codeTypes: ['qr'],
    onCodeScanned: (codes) => {
      if (codes.length > 0 && codes[0].value) {
        handleQRCodeScanned(codes[0].value);
      }
    },
  });

  const handleCloseModal = () => {
    setCouponModalVisible(false);
    setCurrentQrUuid(null);
    setIsScanned(false);
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
        <Text>설정에서 카메라 권한을 허용해주세요.</Text>
      </View>
    );
  }

  if (!device) {
    return (
      <View style={styles.center}>
        <Text>카메라를 사용할 수 없습니다.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* eslint-disable-next-line react/style-prop-object */}
      <StatusBar style="dark" />
      <View style={styles.container}>
        <QRHeader title="QR 스캔" onBackPress={() => router.back()} />

        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive
          codeScanner={codeScanner}
        />

        <View style={styles.overlayContainer} pointerEvents="none">
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
            {isProcessing && <Text style={styles.processingText}>처리 중...</Text>}
            {isScanned && !isProcessing && <Text style={styles.scannedText}>스캔 완료!</Text>}
          </View>
        </View>
      </View>

      <OwnerUseCouponModal
        visible={couponModalVisible && !!currentQrUuid}
        message="쿠폰을 사용하시겠습니까?"
        qrUuid={currentQrUuid || ''}
        onClose={handleCloseModal}
        navigationPath="/owner/Dashboard"
      />
    </SafeAreaView>
  );
}
