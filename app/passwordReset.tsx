import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import PasswordResetScreen from '../src/screens/passwordReset/PasswordResetScreen';

export default function ChangePasswordScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PasswordResetScreen />
    </SafeAreaView>
  );
}
