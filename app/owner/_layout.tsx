import React from 'react';
import { Stack } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';
import useOwnerAuth from '../../src/hooks/useOwnerAuth';

export default function OwnerLayout() {
  const { isOwner, isPendingOwner } = useOwnerAuth();

  if (isOwner === null || isPendingOwner === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={isOwner}>
        <Stack.Screen name="Dashboard" />
        <Stack.Screen name="VoucherPayment" />
        <Stack.Screen name="VoucherPaymentSuccess" />
      </Stack.Protected>

      <Stack.Protected guard={isPendingOwner}>
        <Stack.Screen name="OwnerJoinShopFormScreen" />
        <Stack.Screen name="PickLocation" />
      </Stack.Protected>

      <Stack.Protected guard={!isOwner && !isPendingOwner}>
        <Stack.Screen name="auth" />
        <Stack.Screen name="join" />
      </Stack.Protected>
    </Stack>
  );
}
