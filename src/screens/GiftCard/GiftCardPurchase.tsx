import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Header from '../../design/component/Header';
import colors from '../../design/colors';

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
          <Text style={styles.agreementText}>
            <Text style={{ color: colors.light.main }}>(필수) </Text>
            결제 서비스 이용 약관, 개인정보 처리 동의
          </Text>
          <Icon name="add" size={18} color={colors.light.gray1} style={{ marginLeft: 'auto' }} />
        </View>
        <TouchableOpacity
          style={[
            styles.buyButton,
            !(isAgreed && isPayMethodSelected) && { backgroundColor: colors.light.gray1 },
          ]}
          disabled={!(isAgreed && isPayMethodSelected)}
        >
          <Text style={styles.buyButtonText}>결제하기</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default GiftCardPurchase;
