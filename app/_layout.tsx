import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ActivityIndicator, View } from 'react-native';
import useAuthStore from '../src/store/useAuthStore';

const queryClient = new QueryClient();

function AppLayout() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const loadAuth = useAuthStore((state) => state.loadAuth);

  useEffect(() => {
    loadAuth();
  }, []);

  if (isAuthenticated === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={isAuthenticated}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="giftCard/GiftCardList" />
        <Stack.Screen name="giftCard/GiftCardPurchase" />
        <Stack.Screen name="giftCard/GiftCardDetail/[id]" />
        <Stack.Screen name="myCoupon/MyCouponList" />
        <Stack.Screen name="stamp/StampList" />
        <Stack.Screen name="store/[id]" />
        <Stack.Screen name="store/search" />
        <Stack.Screen name="store/[id]/reviews" />
        <Stack.Screen name="store/pickLocation" />
        <Stack.Screen name="store/likeList" />
        <Stack.Screen name="reviewWrite/reviewWrite" />
      </Stack.Protected>

      <Stack.Protected guard={!isAuthenticated}>
        <Stack.Screen name="auth/LoginChoiceScreen" />
        <Stack.Screen name="oauth" />
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
