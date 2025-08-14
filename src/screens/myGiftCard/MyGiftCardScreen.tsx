import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import Header from '../../design/component/Header';
import styles from './MyGiftCardScreen.style';
import { getMyGiftCards } from '../../api/voucherApi';
import { MyGiftcard } from '../../types/voucher';
import getGiftcardStatus from './giftcardStatus';

const giftcard1 = require('../../assets/images/giftcard1.png');
const giftcard3 = require('../../assets/images/giftcard3.png');
const giftcard5 = require('../../assets/images/giftcard5.png');
const giftcard10 = require('../../assets/images/giftcard10.png');

export default function MyGiftCardScreen() {
  const router = useRouter();
  const [tab, setTab] = useState<'available' | 'completed'>('available');

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

  const filteredGiftCards = giftCards?.filter((item) => {
    if (tab === 'available') {
      return (item.status === '미사용' || item.status === '사용중') && item.daysLeft >= 0;
    }
    return item.status === '사용됨' || item.daysLeft < 0;
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Header title="내 금액권" onBackPress={() => router.push('/profile')} />

        {/* 탭 바 */}
        <View style={styles.tabContainer}>
          {['available', 'completed'].map((t) => (
            <TouchableOpacity
              key={t}
              style={[styles.tabButton, tab === t && styles.activeTab]}
              onPress={() => setTab(t as 'available' | 'completed')}
            >
              <Text style={[styles.tabText, tab === t && styles.activeTabText]}>
                {t === 'available' ? '사용 가능' : '사용 완료'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.cardContainer}>
          {isLoading && (
            <View
              style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: '50%' }}
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
              data={filteredGiftCards ?? []}
              keyExtractor={(item) => item.qrCodeUuid}
              renderItem={({ item }) => {
                const imageSource = getGiftcardImage(item.amount);
                const {
                  text: statusText,
                  style: statusStyle,
                  textStyle: statusTextStyle,
                } = getGiftcardStatus(tab, item);

                return (
                  <TouchableOpacity
                    style={[styles.card, tab === 'completed' && { opacity: 0.6 }]}
                    onPress={
                      tab === 'available'
                        ? () => router.push(`/myGiftCard/${item.qrCodeUuid}`)
                        : undefined
                    }
                  >
                    <View style={styles.header}>
                      {tab === 'available' && (
                        <Text style={styles.daysLeft}>D - {item.daysLeft}</Text>
                      )}
                      <View style={[styles.statusBadge, statusStyle]}>
                        <Text style={statusTextStyle}>{statusText}</Text>
                      </View>
                    </View>

                    <Image source={imageSource} style={styles.image} />
                  </TouchableOpacity>
                );
              }}
              ListEmptyComponent={
                <Text style={{ textAlign: 'center', marginTop: 40, color: '#888' }}>
                  {tab === 'available'
                    ? '사용 가능한 금액권이 없습니다.'
                    : '사용 완료된 금액권이 없습니다.'}
                </Text>
              }
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
