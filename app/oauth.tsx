import React, { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';
import * as Keychain from 'react-native-keychain';

export default function OAuthRedirectScreen() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const credential = await Keychain.getGenericPassword({
          service: 'com.kkukmoa.accessToken',
        });

        if (credential && credential.password) {
          // 토큰이 저장되어 있으면 홈으로 이동
          router.replace('/(tabs)');
        } else {
          // 없으면 로그인 화면으로 이동
          router.replace('/auth/LoginChoiceScreen');
        }
      } catch (error) {
        console.error('로그인 실패:', error);
        router.replace('/auth/LoginChoiceScreen');
      }
    };

    checkAuth();
  }, [router]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );
}
