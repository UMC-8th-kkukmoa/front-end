import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, StyleSheet, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import colors from '../../design/colors';
import Header from '../../design/component/Header';
import Rectangle from '../../assets/images/Rectangle.png';

interface PaymentHistoryItem {
  id: string;
  date: string;
  storeName: string;
  amount: number;
  imageUrl?: string;
}

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
  card: {
    backgroundColor: colors.light.white,
    borderRadius: 16,
    paddingTop: 12.5,
    paddingHorizontal: 20,
    paddingBottom: 15,
    marginBottom: 24,
    shadowColor: colors.light.shadow,
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  dateText: {
    fontSize: 10,
    color: colors.light.gray2,
    fontFamily: 'Pretendard-Medium',
  },
  separator: {
    height: 1,
    backgroundColor: colors.light.gray1_35,
    marginHorizontal: -20,
    marginTop: 12.5,
    marginBottom: 9,
  },
  innerseparator: {
    height: 1,
    marginTop: 10,
    marginBottom: 14,
    backgroundColor: colors.light.gray1_35,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  storeImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 13,
    backgroundColor: colors.light.gray1,
  },
  storeName: {
    fontSize: 15,
    fontWeight: '600',
    flex: 1,
  },
  amountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  amountLabel: {
    fontSize: 12,
    color: colors.light.black,
    fontFamily: 'Pretendard-SemiBold',
  },
  amountValue: {
    fontSize: 12,
    fontFamily: 'Pretendard-SemiBold',
  },
  reviewButton: {
    marginTop: 8.5,
    backgroundColor: colors.light.main,
    borderRadius: 24,
    alignItems: 'center',
  },
  reviewButtonText: {
    color: colors.light.white,
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 12,
    paddingVertical: 13.5,
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

  const renderItem = ({ item }: { item: PaymentHistoryItem }) => (
    <View style={styles.card}>
      <Text style={styles.dateText}>
        {new Date(item.date).toLocaleDateString('ko-KR', {
          month: 'long',
          day: 'numeric',
          weekday: 'short',
        })}
      </Text>

      <View style={styles.separator} />

      <View style={styles.row}>
        <Image
          source={item.imageUrl ? { uri: item.imageUrl } : Rectangle}
          style={styles.storeImage}
        />
        <Text style={styles.storeName}>{item.storeName}</Text>
      </View>

      <View style={styles.innerseparator} />

      <View style={styles.amountRow}>
        <Text style={styles.amountLabel}>결제금액</Text>
        <Text style={styles.amountValue}>{item.amount.toLocaleString()}원</Text>
      </View>
      <TouchableOpacity
        style={styles.reviewButton}
        onPress={() => {
          console.log(`${item.storeName} 리뷰 쓰기 클릭`);
        }}
      >
        <Text style={styles.reviewButtonText}>리뷰 쓰기</Text>
      </TouchableOpacity>
    </View>
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
