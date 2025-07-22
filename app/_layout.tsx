import { Slot } from 'expo-router';
import React from 'react';

import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
  return (
    <GestureHandlerRootView>
      <Slot />
    </GestureHandlerRootView>
  );
}
