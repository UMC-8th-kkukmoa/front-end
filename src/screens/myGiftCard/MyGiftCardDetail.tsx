import React from 'react';
import { View, Text, Image, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import Header from '../../design/component/Header';
import { getGiftCardDetail } from '../../api/voucherApi';
import styles from './MyGiftCardDetai.style';

const giftcard1 = require('../../assets/images/giftcard1.png');
const giftcard3 = require('../../assets/images/giftcard3.png');
const giftcard5 = require('../../assets/images/giftcard5.png');
const giftcard10 = require('../../assets/images/giftcard10.png');

export default function MyGiftcardDetail() {
  const { qrCodeUuid } = useLocalSearchParams<{ qrCodeUuid: string }>();
  const router = useRouter();

  const {
    data: voucher,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['getGiftCardDetail', qrCodeUuid],
    queryFn: () => getGiftCardDetail(qrCodeUuid!),
    enabled: !!qrCodeUuid,
  });

  // "YYYY-MM-DD" → "YYYY년 MM월 DD일"
  const formatDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split('-');
    return `${year}년 ${month}월 ${day}일`;
  };

  // 금액권 이미지 매핑 함수
  const getGiftcardImage = (name: string) => {
    const amountStr = name.match(/\d+(,\d+)?/)?.[0] ?? '0';
    const amount = parseInt(amountStr.replace(',', ''), 10);

    if (amount <= 10000) return giftcard1;
    if (amount <= 30000) return giftcard3;
    if (amount <= 50000) return giftcard5;
    return giftcard10;
  };

  // "D - 0" 형식으로 변환
  const formatDaysLeft = (daysLeft: string) => {
    return daysLeft.replace(/D-?(\d+)/, 'D - $1');
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#aaa" />
      </View>
    );
  }

  if (isError || !voucher) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>금액권 정보를 불러올 수 없습니다.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scroll}>
        <Header title="내 금액권" onBackPress={() => router.back()} />
        <View style={styles.inner}>
          <View style={styles.header}>
            <Text style={styles.daysLeft}>{formatDaysLeft(voucher.daysLeft)}</Text>
            <View style={[styles.statusBadge, voucher.status === '사용중' && styles.used]}>
              <Text style={[styles.statusText, voucher.status === '사용중' && styles.usedText]}>
                {voucher.status === '사용중' ? '사용 중' : '사용 전'}
              </Text>
            </View>
          </View>
          <Image source={getGiftcardImage(voucher.name)} style={styles.cardImage} />

          <View style={styles.description}>
            <Text style={styles.brand}>꾹모아</Text>
            <Text style={styles.title}>모바일 {voucher.name}권</Text>
          </View>

          <View style={styles.barcode}>
            <Image
              source={{ uri: `data:image/png;base64,${voucher.qrCode}` }}
              style={{ width: 222, height: 140 }}
              resizeMode="contain"
            />
          </View>

          <View style={styles.infoBox}>
            <View style={styles.row}>
              <Text style={styles.label}>사용가능금액</Text>
              <Text style={styles.value}>{voucher.remainingValue.toLocaleString()}원</Text>
            </View>
          </View>

          <View style={styles.bottomRow}>
            <View style={styles.row}>
              <Text style={styles.subLabel}>유효기간</Text>
              <Text style={styles.subValue}>{formatDate(voucher.validDays)}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
