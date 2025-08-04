import React, { useEffect } from 'react';
import { useRouter } from 'expo-router';
import * as Linking from 'expo-linking';
import { View, ActivityIndicator } from 'react-native';

export default function OAuthRedirectScreen() {
  const router = useRouter();

  useEffect(() => {
    const handleRedirect = async () => {
      const initialUrl = await Linking.getInitialURL();
      console.log('[OAuth Redirect] initialUrl:', initialUrl);

      router.replace('/(tabs)');
    };

    handleRedirect();
  }, [router]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );
}
