import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, ScrollView, Text, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import * as Keychain from 'react-native-keychain';
import axios from 'axios';
import Header from '../../design/component/Header';
import KkDropdown from '../../design/component/KkDropdown';
import colors from '../../design/colors';
import CouponCard from './MyCouponCard';
import { categoryData } from '../Store/CategoryTabs/CategoryTabs';
import useQRCodeWebSocket from '../../hooks/useQRCodeWebSocket';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light.white,
  },
  headerContainer: {
    backgroundColor: colors.light.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.light.gray1_35,
    zIndex: 10,
  },
  dropdownArea: {
    height: 45,
    paddingTop: 28,
    paddingLeft: 22,
    marginBottom: 10,
  },
  scrollContent: {
    paddingHorizontal: 8,
    paddingBottom: 80,
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    width: '100%',
    paddingVertical: 20,
    alignItems: 'center',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,

    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#ddd',
  },
  sheetText: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'Pretendard-Medium',
    textAlign: 'center',
  },
  emptyText: {
    padding: 20,
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
});

type Coupon = {
  coupon_id: number;
  store_id: number;
  store_image: string;
  store_name: string;
  store_type: string;
  coupon_name: string;
  coupon_qrcode: string;
};

export default function MyCouponListScreen() {
  const router = useRouter();
  const [bottomVisible, setBottomVisible] = useState(false);
  const [value, setValue] = useState<string | null>(null);
  const [coupons, setCoupons] = useState<Coupon[]>([]);

  const items = categoryData.map((cat) => ({
    label: cat.name,
    value: cat.value,
    icon: cat.icon,
  }));

  const fetchCoupons = async (storeType: string) => {
    try {
      const credentials = await Keychain.getGenericPassword({
        service: 'com.kkukmoa.accessToken',
      });

      if (!credentials) {
        Alert.alert('알림', '로그인이 필요합니다.');
        return;
      }

      const token = credentials.password;

      const baseUrl = process.env.EXPO_PUBLIC_BASE_URL || 'https://kkukmoa.shop';
      const url = storeType
        ? `${baseUrl}/v1/stamps/coupons?store-type=${storeType}`
        : `${baseUrl}/v1/stamps/coupons`;

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { data } = response;

      if (data.isSuccess) {
        setCoupons(data.result.coupon_list);
      } else {
        // eslint-disable-next-line no-console
        console.warn('쿠폰 목록 조회 실패:', data.message);
      }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.error('쿠폰 목록 조회 오류:', error.response?.data || error.message);
      } else {
        console.error('쿠폰 목록 조회 오류:', error);
      }
    }
  };

  useEffect(() => {
    fetchCoupons(value || '');
  }, [value]);

  const handleCouponUsed = useCallback((qrInfo: string) => {
    setCoupons((prev) => {
      const updated = prev.filter((coupon) => coupon.coupon_qrcode !== qrInfo);
      if (updated.length !== prev.length) {
        setBottomVisible(true);
        setTimeout(() => setBottomVisible(false), 2000);
      }
      return updated;
    });
  }, []);

  useQRCodeWebSocket(handleCouponUsed);

  return (
    <>
      <SafeAreaView style={styles.container} edges={['top']}>
        {/* eslint-disable-next-line react/style-prop-object */}
        <StatusBar style="dark" />
        <View style={styles.headerContainer}>
          <Header title="내 쿠폰" onBackPress={() => router.back()} shadow={false} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.dropdownArea}>
            <KkDropdown items={items} value={value} onSelect={(val) => setValue(val)} />
          </View>

          {coupons.length === 0 ? (
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.emptyText}>사용 가능한 쿠폰이 없습니다.</Text>
            </View>
          ) : (
            coupons.map((coupon) => (
              <CouponCard
                key={coupon.coupon_id}
                title={coupon.coupon_name}
                shopName={coupon.store_name}
                coupon_qrcode={coupon.coupon_qrcode}
              />
            ))
          )}
        </ScrollView>
      </SafeAreaView>
      {bottomVisible && (
        <View style={styles.bottomSheet}>
          <Text style={styles.sheetText}>사용 처리 되었습니다.</Text>
        </View>
      )}
    </>
  );
}
