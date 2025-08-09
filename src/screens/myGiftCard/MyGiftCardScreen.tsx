import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Header from '../../design/component/Header';
import styles from './MyGiftCardScreen.style';
import { getMyGiftcards } from '../../api/voucherApi';
import { MyGiftcard } from '../../types/voucher';

const giftcard1 = require('../../assets/images/giftcard1.png');
const giftcard3 = require('../../assets/images/giftcard3.png');
const giftcard5 = require('../../assets/images/giftcard5.png');
const giftcard10 = require('../../assets/images/giftcard10.png');

export default function MyGiftCardScreen() {
  const router = useRouter();
  const [giftcards, setGiftcards] = useState<MyGiftcard[]>([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const fetchGiftcards = async () => {
      try {
        const data = await getMyGiftcards();
        setGiftcards(data);
        console.log('금액권 목록 조회 성공:', data);
      } catch (error) {
        console.error('금액권 로딩 오류:', JSON.stringify(error, null, 2));
      } finally {
        setLoading(false);
      }
    };

    fetchGiftcards();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scroll}>
        <Header title="내 금액권" onBackPress={() => router.back()} />
        <View style={styles.cardContainer}>
          {loading ? (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator size="large" color="#aaa" />
            </View>
          ) : (
            <FlatList
              data={giftcards}
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
                          item.status === '미사용' ? styles.unused : styles.used,
                        ]}
                      >
                        <Text
                          style={
                            item.status === '미사용'
                              ? styles.statusTextUnused
                              : styles.statusTextUsed
                          }
                        >
                          {item.status === '미사용' ? '사용 전' : '사용 중'}
                        </Text>
                      </View>
                    </View>

                    <Image source={imageSource} style={styles.image} />
                  </TouchableOpacity>
                );
              }}
              // 빈 목록일 때 표시
              ListEmptyComponent={
                <Text style={{ textAlign: 'center', marginTop: 40, color: '#888' }}>
                  사용 가능한 금액권이 없습니다.
                </Text>
              }
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
