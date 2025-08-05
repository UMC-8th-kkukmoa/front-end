import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import Header from '../../design/component/Header';
import styles from './MyGiftCardScreen.style';

const mockGiftcards = [
  {
    name: '금액권 10,000원권',
    validDays: '2026-07-29',
    status: 'UNUSED',
    qrCodeUuid: 'voucher_f8c9b7a3-xxxx-yyyy',
    daysLeft: 'D-90',
  },
  {
    name: '금액권 30,000원권',
    validDays: '2026-12-01',
    status: 'USED',
    qrCodeUuid: 'voucher_abcd1234-xxxx-yyyy',
    daysLeft: 'D-0',
  },
];

const giftcard1 = require('../../assets/images/giftcard1.png');
const giftcard3 = require('../../assets/images/giftcard3.png');
const giftcard5 = require('../../assets/images/giftcard5.png');
const giftcard10 = require('../../assets/images/giftcard10.png');

export default function MyGiftCardScreen() {
  const router = useRouter();

  // 금액권 이미지 매핑
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

  return (
    <View style={styles.container}>
      <Header title="내 금액권" onBackPress={() => router.back()} />
      <View style={styles.cardContainer}>
        <FlatList
          data={mockGiftcards}
          keyExtractor={(item) => item.qrCodeUuid}
          renderItem={({ item }) => {
            const imageSource = getGiftcardImage(item.name);

            return (
              <TouchableOpacity
                style={styles.card}
                onPress={() => router.push(`/myGiftCard/${item.qrCodeUuid}`)}
              >
                <View style={styles.header}>
                  <Text style={styles.daysLeft}>{formatDaysLeft(item.daysLeft)}</Text>

                  <View
                    style={[
                      styles.statusBadge,
                      item.status === 'UNUSED' ? styles.unused : styles.used,
                    ]}
                  >
                    <Text
                      style={
                        item.status === 'UNUSED' ? styles.statusTextUnused : styles.statusTextUsed
                      }
                    >
                      {item.status === 'UNUSED' ? '사용 전' : '사용 중'}
                    </Text>
                  </View>
                </View>

                <Image source={imageSource} style={styles.image} />
              </TouchableOpacity>
            );
          }}
          // 빈 목록일 때 표시 (임시)
          ListEmptyComponent={
            <Text style={{ textAlign: 'center', marginTop: 40, color: '#888' }}>
              사용 가능한 금액권이 없습니다.
            </Text>
          }
        />
      </View>
    </View>
  );
}
