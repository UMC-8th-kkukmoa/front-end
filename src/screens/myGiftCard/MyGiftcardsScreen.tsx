import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import colors from '../../design/colors';
import Header from '../../design/component/Header';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 15,
    backgroundColor: colors.light.white,
  },
  card: {
    backgroundColor: '#DCDCDC59',
    borderRadius: 12,
    marginVertical: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginHorizontal: 11,
    marginTop: 15,
    gap: 15,
  },
  daysLeft: {
    fontSize: 14,
    color: '#888',
  },
  statusBadge: {
    paddingHorizontal: 11,
    paddingVertical: 5,
    borderRadius: 16,
    elevation: 4,
  },
  unused: {
    backgroundColor: colors.light.gray1,
  },
  used: {
    backgroundColor: colors.light.sub,
  },
  statusText: {
    color: colors.light.white,
    fontSize: 12,
    lineHeight: 16,
  },
  image: {
    width: 272,
    height: 162,
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 15,
    alignSelf: 'center',
  },
});

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

export default function MyGiftcardsScreen() {
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
                    <Text style={styles.statusText}>
                      {item.status === 'UNUSED' ? '사용 가능' : '사용 중'}
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
