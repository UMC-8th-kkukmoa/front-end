import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert, SafeAreaView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Keychain from 'react-native-keychain';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import PaymentModal from '../../design/component/PaymentModal';
import KkCompleteModal from '../../design/component/KkCompleteModal';
import Header from '../../design/component/Header';
import colors from '../../design/colors';

import giftcard1 from '../../assets/images/giftcard1.png';
import giftcard3 from '../../assets/images/giftcard3.png';
import giftcard5 from '../../assets/images/giftcard5.png';
import giftcard10 from '../../assets/images/giftcard10.png';
import Tosspay from '../../assets/images/tosspay.svg';

import styles from './GiftCardPurchase.styles';

const formatPrice = (amount: number) => `${amount.toLocaleString()}원`;

export default function GiftCardPurchase() {
  const { title, price, quantity } = useLocalSearchParams();
  const router = useRouter();
  const [isAgreed, setIsAgreed] = useState(false);
  const [isPayMethodSelected, setIsPayMethodSelected] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [paymentToken, setPaymentToken] = useState<string | null>(null);

  const priceNum = Number(Array.isArray(price) ? price[0] : price?.replace(/[^0-9]/g, '') || '0');
  const qtyNum = Number(Array.isArray(quantity) ? quantity[0] : quantity || 1);
  const total = priceNum * qtyNum;

  const giftImageMap: Record<number, any> = {
    10000: giftcard1,
    30000: giftcard3,
    50000: giftcard5,
    100000: giftcard10,
  };

  const API_BASE_URL = process.env.EXPO_PUBLIC_BASE_URL || 'https://kkukmoa.shop';

  const preparePayment = async () => {
    if (!(isAgreed && isPayMethodSelected)) return;

    try {
      const credentials = await Keychain.getGenericPassword({ service: 'com.kkukmoa.accessToken' });
      if (!credentials) {
        Alert.alert('로그인이 필요합니다.');
        return;
      }

      const token = credentials.password;

      await axios.get(`${API_BASE_URL}/v1/payments/toss/view`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { unitPrice: priceNum, quantity: qtyNum },
      });
      // 성공 시 결제 URL 열기
      setPaymentUrl(
        `${API_BASE_URL}/v1/payments/toss/view?unitPrice=${priceNum}&quantity=${qtyNum}`,
      );
      setPaymentToken(token); // 상태로 따로 저장
      setShowPaymentModal(true);
    } catch (err) {
      Alert.alert('오류', '결제 준비 중 네트워크 오류 발생');
    }
  };

  const handlePaymentSuccess = () => {
    setShowPaymentModal(false);
    setPaymentUrl(null);
    setShowCompleteModal(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* eslint-disable-next-line react/style-prop-object */}
      <StatusBar style="dark" />
      <View style={styles.container}>
        <Header title="결제하기" onBackPress={() => router.push('/')} />

        <View style={styles.content}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>구매상품</Text>
            <View style={styles.productBox}>
              {giftImageMap[priceNum] && (
                <Image source={giftImageMap[priceNum]} style={{ width: 164, height: 98 }} />
              )}
              <View style={styles.productDetails}>
                <Text style={styles.productTitle}>{title}</Text>
                <Text style={styles.productPrice}>{formatPrice(total)}</Text>
                <Text style={styles.productQty}>{qtyNum}개</Text>
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
              >
                <Tosspay width={82} height={20} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.agreementRow}>
            <TouchableOpacity onPress={() => setIsAgreed((prev) => !prev)}>
              <Icon
                name={isAgreed ? 'checkmark-circle' : 'checkmark-circle-outline'}
                size={30}
                color={isAgreed ? colors.light.main : colors.light.gray2}
                style={{ marginRight: 8 }}
              />
            </TouchableOpacity>
            <View>
              <Text style={styles.agreementText}>
                <Text style={{ color: colors.light.main }}>(필수) </Text>결제 서비스 이용 약관,
                개인정보 처리 동의
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={[
              styles.buyButton,
              !(isAgreed && isPayMethodSelected) && { backgroundColor: colors.light.gray1 },
            ]}
            disabled={!(isAgreed && isPayMethodSelected)}
            onPress={preparePayment}
          >
            <Text style={styles.buyButtonText}>결제하기</Text>
          </TouchableOpacity>
        </View>

        {/* 웹뷰 결제 모달 */}
        {paymentUrl && paymentToken && (
          <PaymentModal
            visible={showPaymentModal}
            onClose={() => setShowPaymentModal(false)}
            paymentUrl={paymentUrl}
            paymentToken={paymentToken}
            onPaymentSuccess={handlePaymentSuccess}
          />
        )}

        <KkCompleteModal
          visible={showCompleteModal}
          onClose={() => setShowCompleteModal(false)}
          navigationPath="/myGiftCard/MyGiftCardScreen"
          message="결제가 완료되었습니다."
        />
      </View>
    </SafeAreaView>
  );
}
