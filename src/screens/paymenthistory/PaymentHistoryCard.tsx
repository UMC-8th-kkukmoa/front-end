import React from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Rectangle from '../../assets/images/Rectangle.png';
import Arrow from '../../assets/images/right-arrow.svg';
import colors from '../../design/colors';
import { PaymentHistoryItem } from '../../types/payment';

interface PaymentHistoryCardProps {
  item: PaymentHistoryItem;
  onPressReview?: (item: PaymentHistoryItem) => void;
}

const styles = StyleSheet.create({
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
    borderWidth: 1,
    borderColor: colors.light.gray1,
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
  nameRow: {
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
    marginRight: 4,
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
    shadowColor: colors.light.shadow,
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  reviewButtonText: {
    color: colors.light.white,
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 12,
    paddingVertical: 13.5,
  },
});

export default function PaymentHistoryCard({ item, onPressReview }: PaymentHistoryCardProps) {
  return (
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
        <TouchableOpacity style={styles.nameRow} onPress={() => {}}>
          <Text style={styles.storeName}>{item.storeName}</Text>
          <Arrow width={12} height={12} style={{ marginTop: 5 }} />
        </TouchableOpacity>
      </View>

      <View style={styles.innerseparator} />

      <View style={styles.amountRow}>
        <Text style={styles.amountLabel}>결제금액</Text>
        <Text style={styles.amountValue}>{item.amount.toLocaleString()}원</Text>
      </View>
      <TouchableOpacity style={styles.reviewButton} onPress={() => onPressReview?.(item)}>
        <Text style={styles.reviewButtonText}>리뷰 쓰기</Text>
      </TouchableOpacity>
    </View>
  );
}
