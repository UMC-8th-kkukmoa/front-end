import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import colors from '../../design/colors';
import Header from '../../design/component/Header';
import PaymentHistoryCard from './PaymentHistoryCard';
import { PaymentHistoryItem } from '../../types/payment';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light.white,
    overflow: 'hidden',
  },
  listContent: {
    paddingTop: 27,
    paddingHorizontal: 30.5,
  },
});

export default function PaymentHistoryScreen() {
  const router = useRouter();

  // 🔹 더미 데이터
  const paymentHistory: PaymentHistoryItem[] = [
    {
      id: '1',
      date: '2025-08-08',
      storeName: '미진 카페',
      amount: 14200,
    },
    {
      id: '2',
      date: '2025-08-08',
      storeName: '꾹모아 카페 공덕점',
      amount: 14200,
    },
    {
      id: '3',
      date: '2025-08-08',
      storeName: '카페 공덕점',
      amount: 14200,
    },
    {
      id: '4',
      date: '2025-08-08',
      storeName: '카페 공덕점',
      amount: 14200,
    },
    {
      id: '5',
      date: '2025-08-08',
      storeName: '카페 공덕점',
      amount: 14200,
    },
  ];

  const renderItem = ({ item: payitem }: { item: PaymentHistoryItem }) => (
    <PaymentHistoryCard
      item={payitem}
      onPressReview={(i) => console.log(`${i.storeName} 리뷰 쓰기 클릭`)}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header title="결제 내역" onBackPress={() => router.back()} />
      <FlatList
        data={paymentHistory}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}
