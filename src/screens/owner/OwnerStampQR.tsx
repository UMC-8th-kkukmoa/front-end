import React from 'react';
import { View, Image, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import apiClient from '../../api/client';
import Header from '../../design/component/Header';
import colors from '../../design/colors';

interface StampQRResponse {
  isSuccess: boolean;
  code: string;
  result: {
    qrcode: string;
    store_name: string;
  };
  message: string;
}

const fetchQRCode = async (): Promise<StampQRResponse['result']> => {
  const { data } = await apiClient.get<StampQRResponse>('/v1/owners/qrcode/stamps');
  if (!data.isSuccess) {
    throw new Error(data.message || 'QR 코드 발급 실패');
  }
  return data.result;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light.white,
    overflow: 'hidden',
  },
  qrWrapper: {
    paddingTop: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrImage: {
    width: 234,
    height: 234,
  },
  errorText: {
    color: colors.light.main,
    fontSize: 16,
  },
});

export default function OwnerStampQR() {
  const router = useRouter();

  const { data, isLoading, error } = useQuery({
    queryKey: ['stampQRCode'],
    queryFn: fetchQRCode,
    refetchInterval: 60000, // 1분마다 새로 요청
    refetchOnWindowFocus: false,
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Header title={data?.store_name || '스탬프 QR'} onBackPress={() => router.back()} />
        <View style={styles.qrWrapper}>
          {isLoading && <ActivityIndicator size="large" color={colors.light.main} />}
          {!!error && error instanceof Error && (
            <Text style={styles.errorText}>{error.message}</Text>
          )}
          {data?.qrcode && (
            <Image
              source={{ uri: `data:image/png;base64,${data.qrcode}` }}
              style={styles.qrImage}
              resizeMode="contain"
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
