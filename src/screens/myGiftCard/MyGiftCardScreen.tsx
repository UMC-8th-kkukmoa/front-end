import React from 'react';
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
import { useQuery } from '@tanstack/react-query';
import Header from '../../design/component/Header';
import styles from './MyGiftCardScreen.style';
import { getMyGiftCards } from '../../api/voucherApi';
import { MyGiftcard } from '../../types/voucher';

const giftcard1 = require('../../assets/images/giftcard1.png');
const giftcard3 = require('../../assets/images/giftcard3.png');
const giftcard5 = require('../../assets/images/giftcard5.png');
const giftcard10 = require('../../assets/images/giftcard10.png');

export default function MyGiftCardScreen() {
  const router = useRouter();

  const getGiftcardImage = (amount: number) => {
    if (amount <= 10000) return giftcard1;
    if (amount <= 30000) return giftcard3;
    if (amount <= 50000) return giftcard5;
    return giftcard10;
  };

  const {
    data: giftCards,
    isLoading,
    isError,
  } = useQuery<MyGiftcard[]>({
    queryKey: ['myGiftCards'],
    queryFn: getMyGiftCards,
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Header title="내 금액권" onBackPress={() => router.back()} />
        <ScrollView style={styles.scroll}>
          <View style={styles.cardContainer}>
            {isLoading && (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: '50%',
                }}
              >
                <ActivityIndicator size="large" color="#aaa" />
              </View>
            )}
            {!isLoading && isError && (
              <View style={{ alignItems: 'center', marginTop: 40 }}>
                <Text style={{ color: '#888', marginBottom: 12 }}>
                  금액권 목록을 불러올 수 없습니다.
                </Text>
              </View>
            )}
            {!isLoading && !isError && (
              <FlatList
                data={giftCards ?? []}
                keyExtractor={(item) => item.qrCodeUuid}
                renderItem={({ item }) => {
                  const imageSource = getGiftcardImage(item.amount);

                  return (
                    <TouchableOpacity
                      style={styles.card}
                      onPress={() => router.push(`/myGiftCard/${item.qrCodeUuid}`)}
                    >
                      <View style={styles.header}>
                        <Text style={styles.daysLeft}>D - {item.daysLeft}</Text>

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
                ListEmptyComponent={
                  <Text style={{ textAlign: 'center', marginTop: 40, color: '#888' }}>
                    사용 가능한 금액권이 없습니다.
                  </Text>
                }
              />
            )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
