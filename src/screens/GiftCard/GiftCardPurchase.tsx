import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../../design/component/Header';
import colors from '../../design/colors';

import Giftcard1 from '../../assets/images/giftcard1.svg';
import Giftcard3 from '../../assets/images/giftcard3.svg';
import Giftcard5 from '../../assets/images/giftcard5.svg';
import Giftcard10 from '../../assets/images/giftcard10.svg';
import Tosspay from '../../assets/images/tosspay.svg';

import styles from './GiftCardPurchase.styles';

const formatPrice = (amount: number) => `${amount.toLocaleString()}원`;

function GiftCardPurchase() {
  const { title, price, quantity } = useLocalSearchParams();
  const router = useRouter();
  const [isAgreed, setIsAgreed] = useState(false);
  const [isPayMethodSelected, setIsPayMethodSelected] = useState(false);

  const numericPrice = Number(price?.toString().replace(/[^0-9]/g, '') || '0');
  let qtyValue = quantity;
  if (Array.isArray(quantity)) {
    [qtyValue] = quantity;
  }
  const quantityNumber = Number(qtyValue) || 1;
  const total = numericPrice * quantityNumber;

  const getGiftImage = (giftTitle: string | string[] | undefined) => {
    let processedTitle = giftTitle;
    if (Array.isArray(processedTitle)) [processedTitle] = processedTitle;
    if (typeof processedTitle !== 'string') return null;

    if (processedTitle.includes('1만원')) return <Giftcard1 width={164} height={98} />;
    if (processedTitle.includes('3만원')) return <Giftcard3 width={164} height={98} />;
    if (processedTitle.includes('5만원')) return <Giftcard5 width={164} height={98} />;
    if (processedTitle.includes('10만원')) return <Giftcard10 width={164} height={98} />;
    return null;
  };

  return (
    <View style={styles.container}>
      <Header title="결제하기" onBackPress={() => router.back()} />

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>구매상품</Text>
          <View style={styles.productBox}>
            {getGiftImage(title)}
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
    </View>
  );
}

export default GiftCardPurchase;
