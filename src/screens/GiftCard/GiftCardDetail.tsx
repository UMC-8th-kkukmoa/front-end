import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Header from '../../design/component/Header';
import GiftCardPurchaseModal from './GiftCardPurchaseModal';
import styles from './GiftCardDetail.styles';

import ShareIcon from '../../assets/images/share-icon.svg';
import Giftcard1 from '../../assets/images/giftcard1.svg';
import Giftcard3 from '../../assets/images/giftcard3.svg';
import Giftcard5 from '../../assets/images/giftcard5.svg';
import Giftcard10 from '../../assets/images/giftcard10.svg';

const giftCardData = {
  1: {
    title: '꾹모아 금액권 1만원권',
    price: '10,000원',
    Svg: Giftcard1,
  },
  2: {
    title: '꾹모아 금액권 3만원권',
    price: '30,000원',
    Svg: Giftcard3,
  },
  3: {
    title: '꾹모아 금액권 5만원권',
    price: '50,000원',
    Svg: Giftcard5,
  },
  4: {
    title: '꾹모아 금액권 10만원권',
    price: '100,000원',
    Svg: Giftcard10,
  },
};

export default function GiftCardDetailScreen() {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const { id } = useLocalSearchParams();
  const giftId = Number(Array.isArray(id) ? id[0] : id);

  if (Number.isNaN(giftId)) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>올바르지 않은 금액권 ID입니다.</Text>
      </View>
    );
  }

  const gift = giftCardData[giftId];
  const router = useRouter();

  if (!gift) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>금액권 정보를 찾을 수 없습니다.</Text>
      </View>
    );
  }

  const { Svg: GiftImageComponent, title, price } = gift;

  return (
    <>
      <View style={styles.container}>
        <Header title="금액권 구매" onBackPress={() => router.back()} />
        <View style={styles.content}>
          <GiftImageComponent width={234} height={140} />

          <View style={styles.cardRow}>
            <View style={styles.textBox}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.price}>{price}</Text>
            </View>

            <TouchableOpacity
              style={styles.shareIcon}
              accessibilityRole="button"
              accessibilityLabel="공유하기"
            >
              <ShareIcon />
            </TouchableOpacity>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailBox}>
            <View style={styles.detailRow}>
              <Text style={styles.detailTitle}>유효기간</Text>
              <Text style={styles.detailText}>구매일로부터 1년</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailTitle}>사용조건</Text>
              <Text style={styles.detailText}>꾹모아 가맹점에서 상품 결제 시 사용</Text>
            </View>
          </View>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.purchaseButton} onPress={toggleModal}>
            <Text style={styles.purchaseButtonText}>구매하기</Text>
          </TouchableOpacity>
        </View>
      </View>

      <GiftCardPurchaseModal
        isVisible={isModalVisible}
        onClose={toggleModal}
        title={title}
        price={price}
      />
    </>
  );
}
