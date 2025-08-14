import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import * as Keychain from 'react-native-keychain';
import Header from '../../design/component/Header';
import colors from '../../design/colors';
import PaymentModal from '../../design/component/PaymentModal';
import KkCompleteModal from '../../design/component/KkCompleteModal';

import giftcard1 from '../../assets/images/giftcard1.png';
import giftcard3 from '../../assets/images/giftcard3.png';
import giftcard5 from '../../assets/images/giftcard5.png';
import giftcard10 from '../../assets/images/giftcard10.png';
import Tosspay from '../../assets/images/tosspay.svg';

import styles from './GiftCardPurchase.styles';

const formatPrice = (amount: number) => `${amount.toLocaleString()}원`;

function GiftCardPurchase() {
  const { title, price, quantity } = useLocalSearchParams();
  const router = useRouter();
  const [isAgreed, setIsAgreed] = useState(false);
  const [isPayMethodSelected, setIsPayMethodSelected] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentData, setPaymentData] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const priceStr = Array.isArray(price) ? price[0] : price;
  const quantityStr = Array.isArray(quantity) ? quantity[0] : quantity;

  const numericPrice = Number(priceStr?.replace(/[^0-9]/g, '') || '0');
  const quantityNumber = Number(quantityStr) || 1;

  const total = numericPrice * quantityNumber;

  const giftImageMap: Record<number, any> = {
    10000: giftcard1,
    30000: giftcard3,
    50000: giftcard5,
    100000: giftcard10,
  };

  const getGiftImage = (giftPrice: number) => giftImageMap[giftPrice] || null;

  const API_BASE_URL = process.env.EXPO_PUBLIC_BASE_URL || 'https://kkukmoa.shop';

  // 결제 준비 API 호출
  const preparePayment = async () => {
    try {
      const credentials = await Keychain.getGenericPassword({
        service: 'com.kkukmoa.accessToken',
      });

      if (!credentials) {
        Alert.alert('알림', '로그인이 필요합니다.');
        return;
      }

      const token = credentials.password;

      const response = await fetch(`${API_BASE_URL}/v1/payments/prepare`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          orderName: `${title}`,
          amount: total,
          voucherUnitPrice: numericPrice,
          voucherQuantity: quantityNumber,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('결제 준비 실패:', errorData);
        Alert.alert('오류', errorData.message || '결제 준비 중 오류가 발생했습니다.');
        return;
      }

      const result = await response.json();

      setPaymentData({
        orderId: result.orderId,
        orderName: result.orderName,
        amount: result.amount,
      });
      setShowPaymentModal(true);
    } catch (error) {
      console.error('preparePayment 네트워크 오류:', error);
      Alert.alert('오류', '네트워크 오류가 발생했습니다.');
    }
  };

  // 결제 승인 API 호출
  const confirmPayment = async (paymentResult: any) => {
    try {
      const credentials = await Keychain.getGenericPassword({
        service: 'com.kkukmoa.accessToken',
      });

      if (!credentials) {
        Alert.alert('알림', '로그인이 필요합니다.');
        return;
      }

      const token = credentials.password;

      const response = await fetch(`${API_BASE_URL}/v1/payments/confirm`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          paymentKey: paymentResult.paymentKey,
          orderId: paymentResult.orderId,
          amount: paymentResult.amount,
          voucherUnitPrice: numericPrice,
          voucherQuantity: quantityNumber,
        }),
      });

      const result = await response.json();

      if (result.isSuccess) {
        setShowModal(true); // 모달 표시
      } else {
        Alert.alert('오류', '결제 승인 중 오류가 발생했습니다.');
      }
    } catch (error) {
      Alert.alert('오류', '결제 승인 중 네트워크 오류가 발생했습니다.');
    } finally {
      setShowPaymentModal(false);
    }
  };

  const handlePayment = () => {
    if (!(isAgreed && isPayMethodSelected)) {
      return;
    }
    preparePayment();
  };

  const handleCloseModal = () => {
    setShowPaymentModal(false);
    setPaymentData(null); // paymentData도 초기화
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* eslint-disable-next-line react/style-prop-object */}
      <StatusBar style="dark" />
      <View style={styles.headerContainer}>
        <Header title="결제하기" onBackPress={() => router.back()} shadow={false} />
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>구매상품</Text>
          <View style={styles.productBox}>
            {getGiftImage(numericPrice) && (
              <Image
                source={getGiftImage(numericPrice)}
                style={{ width: 164, height: 98, resizeMode: 'contain' }}
              />
            )}

            <View style={styles.productDetails}>
              <Text style={styles.productTitle}>{title}</Text>
              <Text style={styles.productPrice}>{formatPrice(total)}</Text>
              <Text style={styles.productQty}>{quantityNumber}개</Text>
            </View>
          </View>
        </View>

        <View style={styles.paySectionOuter}>
          <View style={styles.paySection}>
            <Text style={styles.payMethodTitle}>결제수단</Text>
            <TouchableOpacity
              style={[
                styles.tosspayButton,
                isPayMethodSelected && { borderColor: colors.light.black, borderWidth: 1 },
              ]}
              onPress={() => setIsPayMethodSelected((prev) => !prev)}
              activeOpacity={0.7}
            >
              <Tosspay width={82} height={20} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.agreementRow}>
          <TouchableOpacity onPress={() => setIsAgreed((prev) => !prev)} activeOpacity={0.8}>
            <Icon
              name={isAgreed ? 'checkmark-circle' : 'checkmark-circle-outline'}
              size={30}
              color={isAgreed ? colors.light.main : colors.light.gray2}
              style={{ marginRight: 8 }}
            />
          </TouchableOpacity>
          <View>
            <Text style={styles.agreementText}>
              <Text style={{ color: colors.light.main }}>(필수) </Text>
              결제 서비스 이용 약관, 개인정보 처리 동의
            </Text>
            <Icon name="add" size={18} color={colors.light.gray1} style={{ marginLeft: 'auto' }} />
          </View>
        </View>
        <TouchableOpacity
          style={[
            styles.buyButton,
            !(isAgreed && isPayMethodSelected) && { backgroundColor: colors.light.gray1 },
          ]}
          disabled={!(isAgreed && isPayMethodSelected)}
          onPress={handlePayment}
        >
          <Text style={styles.buyButtonText}>결제하기</Text>
        </TouchableOpacity>
      </View>

      {paymentData && (
        <PaymentModal
          visible={showPaymentModal}
          onClose={handleCloseModal}
          paymentData={paymentData}
          onPaymentSuccess={confirmPayment}
        />
      )}

      <KkCompleteModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        navigationPath="/giftCard/GiftCardList"
        message="결제가 완료되었습니다."
      />
    </SafeAreaView>
  );
}

export default GiftCardPurchase;
