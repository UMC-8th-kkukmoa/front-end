import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Header from '../../design/component/Header';
import GiftCardPurchaseModal from './GiftCardPurchaseModal';
import styles from './GiftCardDetail.styles';

import ShareIcon from '../../assets/images/share-icon.svg';
import giftcard1 from '../../assets/images/giftcard1.png';
import giftcard3 from '../../assets/images/giftcard3.png';
import giftcard5 from '../../assets/images/giftcard5.png';
import giftcard10 from '../../assets/images/giftcard10.png';

const giftCardData = {
  1: {
    title: '꾹모아 금액권 1만원권',
    price: '10,000원',
    image: giftcard1,
  },
  2: {
    title: '꾹모아 금액권 3만원권',
    price: '30,000원',
    image: giftcard3,
  },
  3: {
    title: '꾹모아 금액권 5만원권',
    price: '50,000원',
    image: giftcard5,
  },
  4: {
    title: '꾹모아 금액권 10만원권',
    price: '100,000원',
    image: giftcard10,
  },
};

export default function GiftCardDetailScreen() {
  const [isModalVisible, setModalVisible] = useState(false);
  const router = useRouter();

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

  if (!gift) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>금액권 정보를 찾을 수 없습니다.</Text>
      </View>
    );
  }

  const { image, title, price } = gift;

  return (
    <>
      <SafeAreaView style={styles.container} edges={['top']}>
        {/* eslint-disable-next-line react/style-prop-object */}
        <StatusBar style="dark" />
        <View style={styles.container}>
          <Header title="금액권 구매" onBackPress={() => router.back()} />

          <ScrollView
            style={styles.content}
            contentContainerStyle={[styles.contentContainer, { paddingBottom: 120 }]}
          >
            <Image source={image} style={{ width: 234, height: 140, resizeMode: 'contain' }} />

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
          </ScrollView>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.purchaseButton} onPress={toggleModal}>
            <Text style={styles.purchaseButtonText}>구매하기</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <GiftCardPurchaseModal
        isVisible={isModalVisible}
        onClose={toggleModal}
        title={title}
        price={price}
      />
    </>
  );
}
