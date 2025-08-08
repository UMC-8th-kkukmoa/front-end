import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Header from '../../design/component/Header';
import { getGiftcardDetail } from '../../api/voucherApi';
import styles from './MyGiftcardDetail.style';

const giftcard1 = require('../../assets/images/giftcard1.png');
const giftcard3 = require('../../assets/images/giftcard3.png');
const giftcard5 = require('../../assets/images/giftcard5.png');
const giftcard10 = require('../../assets/images/giftcard10.png');

export default function MyGiftcardDetail() {
  const { qrCodeUuid } = useLocalSearchParams<{ qrCodeUuid: string }>();
  const router = useRouter();

  const [voucher, setVoucher] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!qrCodeUuid) return;

    const fetchVoucher = async () => {
      try {
        const data = await getGiftcardDetail(qrCodeUuid);
        setVoucher(data);
      } catch (error) {
        console.error('금액권 상세 조회 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVoucher();
  }, [qrCodeUuid]);

  // const voucher = {
  //   name: "금액권 10,000원권",
  //   value: 5000,
  //   remainingValue: 3000,
  //   validDays: "2026-07-29",
  //   status: "UNUSED",
  //   qrCodeUuid: "f8c9b7a3-1234-5678",
  //   qrCode: "iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAAOXRFWHRTb2Z0d2FyZQBNYXRwbG90bGliIHZlcnNpb24zLjQuMywgaHR0cHM6Ly9tYXRwbG90bGliLm9yZy",
  //   daysLeft: "D-90"
  // };

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

  const formatVoucherTitle = (name: string) => {
    return name.replace(/(\d+),?(\d+)?원권/, (match, p1, p2) => {
      const amount = p2 ? p1 + p2 : p1;
      switch (amount) {
        case '10000':
          return '1만원권';
        case '30000':
          return '3만원권';
        case '50000':
          return '5만원권';
        case '100000':
          return '10만원권';
        default:
          return match;
      }
    });
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#aaa" />
      </View>
    );
  }

  if (!voucher) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>금액권 정보를 불러올 수 없습니다.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Header title="내 금액권" onBackPress={() => router.back()} />
      <View style={styles.inner}>
        <View style={styles.header}>
          <Text style={styles.daysLeft}>{formatDaysLeft(voucher.daysLeft)}</Text>
          <View style={[styles.statusBadge, voucher.status === 'USED' && styles.used]}>
            <Text style={[styles.statusText, voucher.status === 'USED' && styles.usedText]}>
              {voucher.status === 'USED' ? '사용 중' : '사용 전'}
            </Text>
          </View>
        </View>
        <Image source={getGiftcardImage(voucher.name)} style={styles.cardImage} />

        <View style={styles.description}>
          <Text style={styles.brand}>꾹모아</Text>
          <Text style={styles.title}>모바일 {formatVoucherTitle(voucher.name)}</Text>
        </View>

        <Image
          source={{ uri: `data:image/png;base64,${voucher.qrCode}` }}
          style={{ width: 222, height: 140 }}
          resizeMode="contain"
        />

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
  );
}
