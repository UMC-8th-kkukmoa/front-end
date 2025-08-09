import React, { useState } from 'react';
import { View, Text, LayoutChangeEvent, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../../design/colors';
import BarcodeModal from './BarcodeModal';
import CouponContainer from '../../assets/images/coupon-container.svg';
import CouponLogo from '../../assets/images/coupon-logo.svg';

interface CouponCardProps {
  title: string;
  shopName: string;
  coupon_qrcode: string;
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 10,
  },
  imageWrapper: {
    position: 'relative',
  },
  textBox: {
    position: 'absolute',
    top: '50%',
    left: 10,
    width: 123,
    padding: 8,
  },
  title: {
    color: colors.light.white,
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 9,
    borderRadius: 14,
    backgroundColor: colors.light.main,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  shopName: {
    marginTop: 8,
    fontSize: 17,
    fontFamily: 'Pretendard-Bold',
    color: colors.light.black,
  },
  button: {
    position: 'absolute',
    top: '50%',
    left: 268,
    transform: [{ translateY: -30 }],
    width: 45,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function CouponCard({ title, shopName, coupon_qrcode }: CouponCardProps) {
  const [textBoxHeight, setTextBoxHeight] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const onTextBoxLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setTextBoxHeight(height);
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.imageWrapper}>
          <CouponContainer width={343} height={187} />
          <View
            onLayout={onTextBoxLayout}
            style={[
              styles.textBox,
              {
                transform: [{ translateY: -textBoxHeight / 2 }],
                flexDirection: 'row',
                alignItems: 'center',
              },
            ]}
          >
            <CouponLogo width={60} height={60} style={{ marginRight: 8 }} />
            <View>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.shopName}>{shopName}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)} />
        </View>
      </View>

      <BarcodeModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        qrValue={coupon_qrcode}
      />
    </>
  );
}
