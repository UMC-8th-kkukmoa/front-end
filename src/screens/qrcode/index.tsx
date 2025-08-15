import React, { useEffect, useState } from 'react';
import {
  Button,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { Camera, useCameraDevice, useCodeScanner } from 'react-native-vision-camera';
import { useNavigation, useRouter } from 'expo-router';
import LeftArrowIcon from '../../assets/images/left-arrow.svg';
import colors from '../../design/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1,
  },
  title: {
    position: 'absolute',
    top: 50,
    color: colors.light.white,
    fontSize: 18,
    fontWeight: '600',
  },
  dimOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  dim: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  centerTexts: {
    position: 'absolute',
    top: '28%',
    alignItems: 'center',
  },
  shopName: {
    color: '#FF8A3D',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
  },
  instruction: {
    color: colors.light.white,
    fontSize: 16,
  },
  scanBox: {
    position: 'absolute',
  },
  corner: {
    position: 'absolute',
    width: 36,
    height: 36,
    borderColor: '#2E2E2E',
  },
});

export default function QRScannerScreen() {
  const [hasPermission, setHasPermission] = useState(false);
  const [isScanned, setIsScanned] = useState(false);
  const device = useCameraDevice('back');
  const navigation = useNavigation();
  const router = useRouter();
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const minDim = Math.min(screenWidth, screenHeight);
  const cutoutSize = Math.min(minDim * 0.6, 280);
  const boxTop = (screenHeight - cutoutSize) / 2;
  const boxLeft = (screenWidth - cutoutSize) / 2;

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const codeScanner = useCodeScanner({
    codeTypes: ['qr'],
    onCodeScanned: (codes) => {
      if (isScanned) {
        return;
      }

      if (codes.length > 0) {
        const { value } = codes[0];
        if (value) {
          setIsScanned(true);
          // eslint-disable-next-line no-console
          console.log(`QR: ${value}`);
          navigation.goBack();
          router.setParams({
            qrCodeData: value,
          });
        }
      }
    },
  });

  const handleRequestPermission = async () => {
    const status = await Camera.requestCameraPermission();
    if (status !== 'granted') {
      await Linking.openSettings();
    }
    setHasPermission(status === 'granted');
  };

  if (!device) {
    return (
      <View style={styles.container}>
        <Text>Camera not available</Text>
      </View>
    );
  }

  if (!hasPermission) {
    return (
      <View style={styles.container}>
        <Text>No access to camera</Text>
        <Button title="권한 요청" onPress={handleRequestPermission} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera style={StyleSheet.absoluteFill} device={device} isActive codeScanner={codeScanner} />

      <View pointerEvents="none" style={StyleSheet.absoluteFill}>
        <View style={[styles.dim, { left: 0, right: 0, top: 0, height: boxTop }]} />
        <View style={[styles.dim, { top: boxTop, left: 0, width: boxLeft, height: cutoutSize }]} />
        <View
          style={[
            styles.dim,
            { top: boxTop, left: boxLeft + cutoutSize, right: 0, height: cutoutSize },
          ]}
        />
        <View style={[styles.dim, { left: 0, right: 0, top: boxTop + cutoutSize, bottom: 0 }]} />
      </View>

      {/* TODO: Header로 바꿔보기 */}
      <Text style={styles.title}>스탬프 QR 적립</Text>

      <View style={styles.centerTexts}>
        {/* TODO: 실제 매장 이름으로 바꾸기? */}
        <Text style={styles.shopName}>QR코드 스탬프</Text>
        <Text style={styles.instruction}>매장QR을 스캔해주세요.</Text>
      </View>

      <View
        style={[
          styles.scanBox,
          {
            width: cutoutSize,
            height: cutoutSize,
            top: boxTop,
            left: boxLeft,
          },
        ]}
      >
        {/* TODO: 중간에 빈 사각형을 만들기 위해서 4개 사각형을 만듦; 중간에 구멍을 뚫는 건 불가능한 듯 */}
        <View style={[styles.corner, { top: 0, left: 0, borderTopWidth: 8, borderLeftWidth: 8 }]} />
        <View
          style={[styles.corner, { top: 0, right: 0, borderTopWidth: 8, borderRightWidth: 8 }]}
        />
        <View
          style={[styles.corner, { bottom: 0, left: 0, borderBottomWidth: 8, borderLeftWidth: 8 }]}
        />
        <View
          style={[
            styles.corner,
            { bottom: 0, right: 0, borderBottomWidth: 8, borderRightWidth: 8 },
          ]}
        />
      </View>

      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
        <LeftArrowIcon width={24} height={24} color={colors.light.white} />
      </TouchableOpacity>
    </View>
  );
}
