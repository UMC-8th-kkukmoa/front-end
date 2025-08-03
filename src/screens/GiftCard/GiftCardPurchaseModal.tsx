import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { useRouter } from 'expo-router';

import styles from './GiftCardPurchaseModal.styles';

interface GiftCardPurchaseModalProps {
  isVisible: boolean;
  onClose: () => void;
  title: string;
  price: string;
}

function GiftCardPurchaseModal({ isVisible, onClose, title, price }: GiftCardPurchaseModalProps) {
  const [quantity, setQuantity] = useState(1);

  const numericPrice = Number(price.replace(/[^0-9]/g, '')) || 0;
  const total = numericPrice * quantity;

  if (numericPrice === 0) {
    console.warn('가격 파싱에 실패했습니다:', price);
  }

  const formatPrice = (amount: number) => `${amount.toLocaleString()}원`;

  const router = useRouter();

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      style={{ justifyContent: 'flex-end', margin: 0 }}
      statusBarTranslucent
    >
      <View style={styles.modalContent}>
        <View style={styles.modalHandle} />
        <Text style={styles.modalTitle}>{title}</Text>
        <Text style={styles.modalPrice}>{price}</Text>

        <View style={styles.qtyRow}>
          <Text style={styles.qtyLabel}>구매수량</Text>
          <View style={styles.qtyControl}>
            <TouchableOpacity onPress={() => setQuantity((q) => Math.max(1, q - 1))}>
              <Text style={styles.qtyButton}>-</Text>
            </TouchableOpacity>
            <Text style={[styles.qtyText, { marginHorizontal: 16 }]}>{quantity}</Text>
            <TouchableOpacity onPress={() => setQuantity((q) => q + 1)}>
              <Text style={styles.qtyButton}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>총 상품 금액 ({quantity}개)</Text>
          <Text style={styles.totalPrice}>{formatPrice(total)}</Text>
        </View>

        <TouchableOpacity
          style={styles.modalBuyButton}
          onPress={() => {
            router.push({
              pathname: '/giftCard/GiftCardPurchase',
              params: {
                title,
                price,
                quantity,
              },
            });
          }}
        >
          <Text style={styles.modalBuyText}>구매하기</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

export default GiftCardPurchaseModal;
