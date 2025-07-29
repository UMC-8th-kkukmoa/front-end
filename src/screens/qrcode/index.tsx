import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Button,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { Camera, useCameraDevice, useCodeScanner } from 'react-native-vision-camera';
import { useNavigation } from 'expo-router';
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
});

export default function QRScannerScreen() {
  const [hasPermission, setHasPermission] = useState(false);
  const device = useCameraDevice('back');
  const navigation = useNavigation();
  const [qrFrame, setQrFrame] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);
  const isAnimating = useRef(false);
  const animationProgress = useRef(new Animated.Value(0)).current;
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const codeScanner = useCodeScanner({
    codeTypes: ['qr'],
    onCodeScanned: (codes) => {
      if (codes.length > 0 && !isAnimating.current && codes[0].frame) {
        const { frame, value } = codes[0];

        isAnimating.current = true;
        setQrFrame(frame);
        animationProgress.setValue(0);

        Animated.timing(animationProgress, {
          toValue: 1,
          duration: 400,
          useNativeDriver: false,
        }).start(() => {
          setTimeout(() => {
            Animated.timing(animationProgress, {
              toValue: 0,
              duration: 400,
              useNativeDriver: false,
            }).start(() => {
              setQrFrame(null);
              isAnimating.current = false;
            });
          }, 500);
        });

        // TODO: QR 코드 핸들링
        // eslint-disable-next-line no-console
        console.log(`QR: ${value}`);
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

  const renderOverlay = () => {
    if (!qrFrame) {
      return null;
    }

    const overlayStyle = {
      position: 'absolute' as const,
      backgroundColor: 'rgba(0,0,0,0.5)',
    };

    const holeTop = animationProgress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, qrFrame.y],
    });

    const holeLeft = animationProgress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, qrFrame.x],
    });

    const holeRight = animationProgress.interpolate({
      inputRange: [0, 1],
      outputRange: [screenWidth, qrFrame.x + qrFrame.width],
    });

    const holeBottom = animationProgress.interpolate({
      inputRange: [0, 1],
      outputRange: [screenHeight, qrFrame.y + qrFrame.height],
    });
    const holeHeight = Animated.subtract(holeBottom, holeTop);

    return (
      <View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: 'transparent' }}>
        <Animated.View style={[overlayStyle, { top: 0, left: 0, right: 0, height: holeTop }]} />
        <Animated.View
          style={[
            overlayStyle,
            {
              top: holeTop,
              left: 0,
              width: holeLeft,
              height: holeHeight,
            },
          ]}
        />
        <Animated.View
          style={[
            overlayStyle,
            {
              top: holeTop,
              left: holeRight,
              right: 0,
              height: holeHeight,
            },
          ]}
        />
        <Animated.View
          style={[
            overlayStyle,
            {
              bottom: 0,
              left: 0,
              right: 0,
              top: holeBottom,
            },
          ]}
        />
      </View>
    );
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
      {renderOverlay()}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
        <LeftArrowIcon width={24} height={24} color={colors.light.white} />
      </TouchableOpacity>
    </View>
  );
}
