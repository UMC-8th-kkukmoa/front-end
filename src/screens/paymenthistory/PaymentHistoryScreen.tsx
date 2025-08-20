import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, FlatList, ActivityIndicator, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useInfiniteQuery, InfiniteData } from '@tanstack/react-query';
import colors from '../../design/colors';
import Header from '../../design/component/Header';
import PaymentHistoryCard from './PaymentHistoryCard';
import { PaymentHistoryItem, PaymentHistoryResponse } from '../../types/payment';
import { fetchPaymentHistory } from '../../api/voucherApi';

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
  loading: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default function PaymentHistoryScreen() {
  const router = useRouter();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery<
    PaymentHistoryResponse,
    Error,
    InfiniteData<PaymentHistoryResponse>,
    [_: string],
    string | undefined
  >({
    queryKey: ['paymentHistory'],
    queryFn: ({ pageParam }) => fetchPaymentHistory({ cursor: pageParam }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) =>
      lastPage.result.hasNext ? lastPage.result.nextCursor : undefined,
  });

  const historyData = data?.pages.flatMap((page) => page.result.items) ?? [];

  const renderItem = ({ item }: { item: PaymentHistoryItem }) => (
    <PaymentHistoryCard
      item={item}
      onPressReview={(i) => console.log(`${i.storeName} 리뷰 쓰기 클릭`)}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Header title="결제 내역" onBackPress={() => router.back()} />
        {isLoading ? (
          <ActivityIndicator size="large" style={styles.loading} />
        ) : (
          <FlatList
            data={historyData}
            renderItem={renderItem}
            keyExtractor={(item) => String(item.usageId)}
            contentContainerStyle={styles.listContent}
            onEndReached={() => {
              if (hasNextPage) fetchNextPage();
            }}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
              isFetchingNextPage ? <ActivityIndicator style={styles.loading} /> : null
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
}
