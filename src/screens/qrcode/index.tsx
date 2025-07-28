import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Linking, Button, TouchableOpacity } from 'react-native';
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

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const codeScanner = useCodeScanner({
    codeTypes: ['qr'],
    onCodeScanned: (codes) => {
      if (codes.length > 0) {
        const code = codes[0];
        // TODO: QR 코드 핸들링
        // eslint-disable-next-line no-console
        console.log(`QR: ${code.value}`);
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
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
        <LeftArrowIcon width={24} height={24} color={colors.light.white} />
      </TouchableOpacity>
    </View>
  );
}
