import React from 'react';
import { ErrorBoundaryProps, Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import { Try } from 'expo-router/build/views/Try';
import useAuth from '../src/hooks/useAuth';
import colors from '../src/design/colors';

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
      </Stack.Protected>

      <Stack.Protected guard={!isAuthenticated}>
        <Stack.Screen name="auth/LoginChoiceScreen" />
        <Stack.Screen name="oauth" />
      </Stack.Protected>
    </Stack>
  );
}

function ErrorScreen({ retry }: ErrorBoundaryProps) {
  return (
    <View
      style={{
        backgroundColor: colors.light.main,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <TouchableOpacity onPress={retry}>{/* TODO: retry button */}</TouchableOpacity>
    </View>
  );
}

export default function RootLayout() {
  return (
    <Try catch={ErrorScreen}>
      <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <AppLayout />
        </GestureHandlerRootView>
      </QueryClientProvider>
    </Try>
  );
}
