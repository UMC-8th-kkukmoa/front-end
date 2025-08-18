import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../../design/colors';
import { KkButton } from '../../design/component/KkButton';

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.light.white,
  },
  container: {
    justifyContent: 'space-between',
    marginTop: 210,
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

const checkImage = require('../../assets/images/agree.png');

export default function GiftCardPaymentSuccess() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.iconWrapper}>
          <Image source={checkImage} style={styles.checkCircle} />

          <Text style={styles.message}>결제가 완료되었습니다!</Text>
        </View>

        <KkButton
          style={styles.button}
          label="메인페이지로 돌아가기"
          type="primary"
          size="large"
          onPress={() => router.push('/')}
          shadow
        />
      </View>
    </SafeAreaView>
  );
}
