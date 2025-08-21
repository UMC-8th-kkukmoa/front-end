import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Rectangle from '../../assets/images/Rectangle.png';
import Arrow from '../../assets/images/right-arrow.svg';
import { PaymentHistoryItem } from '../../types/payment';
import styles from './PaymentHistoryCard.style';

interface PaymentHistoryCardProps {
  item: PaymentHistoryItem;
}

export default function PaymentHistoryCard({ item }: PaymentHistoryCardProps) {
  const router = useRouter();

  return (
    <View style={styles.card}>
      <Text style={styles.dateText}>{item.usedAtFormatted}</Text>

      <View style={styles.separator} />

      <View style={styles.row}>
        <Image
          source={item.storeImage ? { uri: item.storeImage } : Rectangle}
          style={styles.storeImage}
        />
        <TouchableOpacity
          style={styles.nameRow}
          onPress={() =>
            router.push({
              pathname: '/store/[id]',
              params: { id: item.storeId },
            })
          }
        >
          <Text style={styles.storeName}>{item.storeName}</Text>
          <Arrow width={12} height={12} style={{ marginTop: 5 }} />
        </TouchableOpacity>
      </View>

      <View style={styles.innerseparator} />

      <View style={styles.amountRow}>
        <Text style={styles.amountLabel}>결제금액</Text>
        <Text style={styles.amountValue}>{item.usedAmount.toLocaleString()}원</Text>
      </View>
      <TouchableOpacity
        style={styles.reviewButton}
        onPress={() =>
          router.push({
            pathname: '/reviewWrite/reviewWrite',
            params: { storeId: String(item.storeId) },
          })
        }
      >
        <Text style={styles.reviewButtonText}>리뷰 쓰기</Text>
      </TouchableOpacity>
    </View>
  );
}
