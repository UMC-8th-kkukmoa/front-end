import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import colors from '../../../design/colors';
import { KkButton } from '../../../design/component/KkButton';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light.white,
    justifyContent: 'space-between',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkCircle: {
    width: 170,
    height: 170,
    marginBottom: 20,
  },
  checkMark: {
    fontSize: 80,
    color: colors.light.white,
  },
  message: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.light.black,
    marginBottom: 80,
  },
  button: {
    width: '100%',
  },
  buttonText: {
    color: colors.light.white,
    fontSize: 16,
    fontWeight: '500',
  },
});

const checkImage = require('../../../assets/images/agree.png');

export default function VoucherPaymentSuccessScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>
        <Image source={checkImage} style={styles.checkCircle} />

        <Text style={styles.message}>결제가 정상 처리 되었습니다.</Text>
      </View>

      <KkButton
        style={styles.button}
        label="대쉬보드로 돌아가기"
        type="primary"
        size="large"
        onPress={() => {
          router.push('owner/Dashboard');
        }}
        shadow
      />
    </View>
  );
}
