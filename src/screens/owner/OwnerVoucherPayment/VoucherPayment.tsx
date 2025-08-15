import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Animated, Easing } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import * as Keychain from 'react-native-keychain';
import Header from '../../../design/component/Header';
import colors from '../../../design/colors';
import { KkButton } from '../../../design/component/KkButton';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.light.white },
  content: { flex: 1, paddingHorizontal: 25, paddingVertical: 25 },
  balanceBox: {
    backgroundColor: colors.light.gray1_35,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  balanceLabel: { fontSize: 12, fontFamily: 'Pretendard-Bold', color: colors.light.black },
  balanceAmount: { fontSize: 12, fontFamily: 'Pretendard-Bold', color: colors.light.main },
  input: {
    borderWidth: 1,
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: 'Pretendard-Medium',
    marginBottom: 24,
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.light.white,
    width: '100%',
    paddingTop: 20,
    paddingBottom: 30,
    alignItems: 'center',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    elevation: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  sheetText: { fontSize: 16, fontFamily: 'Pretendard-Medium', color: colors.light.black },
});

export default function VoucherPaymentScreen() {
  const router = useRouter();
  // Changed from useSearchParams to useLocalSearchParams
  const { balance, qrUuid } = useLocalSearchParams<{ balance: string; qrUuid: string }>();

  const [amount, setAmount] = useState<number | null>(null);
  const [sheetMessage, setSheetMessage] = useState('');
  const [bottomVisible, setBottomVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const slideAnim = useRef(new Animated.Value(0)).current;
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showBottomSheet = (message: string) => {
    setSheetMessage(message);
    setBottomVisible(true);

    // Clear any existing timer
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
    slideAnim.stopAnimation();

    // Slide up animation
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();

    // Slide down animation after 3 seconds
    hideTimerRef.current = setTimeout(() => {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }).start(() => {
        setBottomVisible(false);
        hideTimerRef.current = null;
      });
    }, 3000);
  };

  useEffect(() => {
    return () => {
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
        hideTimerRef.current = null;
      }
      slideAnim.stopAnimation();
    };
  }, [slideAnim]);

  const validateInput = (): boolean => {
    if (amount === null || amount === 0) {
      showBottomSheet('결제할 금액을 입력해주세요.');
      return false;
    }

    if (Number.isNaN(amount) || amount <= 0) {
      showBottomSheet('잘못된 금액이 입력되었습니다.');
      return false;
    }

    const numericBalance = parseInt(balance || '0', 10);
    if (amount > numericBalance) {
      showBottomSheet('금액이 잔액을 초과합니다.');
      return false;
    }

    return true;
  };

  const handlePayment = async () => {
    if (!validateInput()) return;
    if (isLoading) return; // Prevent double submission

    setIsLoading(true);

    try {
      // Get token from keychain
      const credentials = await Keychain.getGenericPassword({
        service: 'com.kkukmoa.accessToken',
      });

      if (!credentials) {
        showBottomSheet('로그인이 필요합니다.');
        return;
      }

      const token = credentials.password;
      const API_BASE_URL = process.env.EXPO_PUBLIC_BASE_URL || 'https://kkukmoa.shop';

      // Call voucher partial use API
      const res = await axios.patch(`${API_BASE_URL}/v1/owners/use/voucher/${qrUuid}`, null, {
        params: { amount },
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.isSuccess) {
        // Payment success - navigate to success screen
        router.push('/owner/VoucherPaymentSuccess');
      } else {
        showBottomSheet(res.data.message || '결제 처리 실패');
      }
    } catch (err: any) {
      // eslint-disable-next-line no-console
      console.error('Payment error:', err);

      // Handle specific error cases
      if (err.response?.status === 401) {
        showBottomSheet('로그인이 만료되었습니다. 다시 로그인해주세요.');
      } else if (err.response?.status === 404) {
        showBottomSheet('금액권을 찾을 수 없습니다.');
      } else if (err.response?.status === 400) {
        const errorCode = err.response?.data?.code;
        switch (errorCode) {
          case 'VOUCHER4002':
            showBottomSheet('이미 사용된 금액권입니다.');
            break;
          case 'VOUCHER_INVALID_AMOUNT':
            showBottomSheet('잘못된 금액입니다.');
            break;
          case 'VOUCHER_BALANCE_NOT_ENOUGH':
            showBottomSheet('금액권 잔액이 부족합니다.');
            break;
          default:
            showBottomSheet(err.response?.data?.message || '결제 처리 실패');
        }
      } else {
        showBottomSheet('결제 중 오류가 발생했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleAmountChange = (text: string) => {
    // Remove non-numeric characters
    const cleanedText = text.replace(/[^0-9]/g, '');

    if (cleanedText === '') {
      setAmount(null);
      return;
    }

    const numeric = parseInt(cleanedText, 10);
    setAmount(Number.isNaN(numeric) ? null : numeric);
  };

  const formatAmount = (value: number | null): string => {
    if (value === null) return '';
    return value.toLocaleString('ko-KR');
  };

  const bottomTranslate = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [200, 0],
  });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* eslint-disable-next-line react/style-prop-object */}
      <StatusBar style="dark" />
      <Header title="금액권 QR 결제" onBackPress={() => router.back()} shadow />

      <View style={styles.content}>
        <View style={styles.balanceBox}>
          <Text style={styles.balanceLabel}>사용가능금액</Text>
          <Text style={styles.balanceAmount}>
            {parseInt(balance || '0', 10).toLocaleString('ko-KR')}원
          </Text>
        </View>

        <TextInput
          style={[
            styles.input,
            { borderColor: isFocused ? colors.light.gray2 : colors.light.gray1 },
          ]}
          keyboardType="numeric"
          value={formatAmount(amount)}
          onChangeText={handleAmountChange}
          placeholder="금액 입력"
          placeholderTextColor={colors.light.gray1}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          editable={!isLoading}
        />

        <KkButton
          label={isLoading ? '처리 중...' : '결제하기'}
          type="primary"
          size="large"
          onPress={handlePayment}
          disabled={isLoading}
        />
      </View>

      {bottomVisible && (
        <Animated.View
          style={[styles.bottomSheet, { transform: [{ translateY: bottomTranslate }] }]}
        >
          <Text style={styles.sheetText}>{sheetMessage}</Text>
        </Animated.View>
      )}
    </SafeAreaView>
  );
}
