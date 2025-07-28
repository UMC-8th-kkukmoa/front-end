import { Stack } from 'expo-router';
import React from 'react';
import QRScannerScreen from '../src/screens/qrcode';

export default function QrCodeScreen() {
  return (
    <>
      <Stack.Screen options={{ presentation: 'modal', headerShown: false }} />
      <QRScannerScreen />
    </>
  );
}
