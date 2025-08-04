import React from 'react';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ActivityIndicator, View } from 'react-native';
import useAuth from '../src/hooks/useAuth';

const queryClient = new QueryClient();

function AppLayout() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack>
      <Stack.Protected guard={isAuthenticated}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="giftCard/GiftCardList" options={{ headerShown: false }} />
        <Stack.Screen name="giftCard/GiftCardPurchase" options={{ headerShown: false }} />
        <Stack.Screen name="giftCard/GiftCardDetail/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="myCoupon/MyCouponList" options={{ headerShown: false }} />
        <Stack.Screen name="stamp/StampList" options={{ headerShown: false }} />
      </Stack.Protected>

      <Stack.Protected guard={!isAuthenticated}>
        <Stack.Screen name="auth/LoginChoiceScreen" options={{ headerShown: false }} />
        <Stack.Screen name="oauth" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AppLayout />
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
