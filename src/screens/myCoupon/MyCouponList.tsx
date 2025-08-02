import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import Header from '../../design/component/Header';
import CustomDropdown from '../../design/component/KkDropdown';
import colors from '../../design/colors';
import CouponCard from './MyCouponCard';
import { categoryData } from '../Store/CategoryTabs/CategoryTabs';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light.white,
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
});

export default function MyCouponListScreen() {
  const [bottomVisible, setBottomVisible] = useState(false);

  const items = categoryData.map((cat) => ({
    label: cat.name,
    value: cat.name.toLowerCase(),
    icon: cat.icon,
  }));
  const [value, setValue] = useState<string | null>(null);

  const handleBack = () => {
    /* eslint-disable no-console */
    console.log('뒤로가기 눌림');
    /* eslint-enable no-console */
  };

  const [coupons, setCoupons] = useState([
    { id: 1, title: '리워드 쿠폰', shopName: '꾹모아카페 성신여대입구점' },
    { id: 2, title: '리워드 쿠폰', shopName: '미진헤어' },
    { id: 3, title: '리워드 쿠폰', shopName: '모아서점 왕십리점' },
  ]);

  const handleUseCoupon = (id: number) => {
    setCoupons((prev) => prev.filter((coupon) => coupon.id !== id));
    setBottomVisible(true);
    setTimeout(() => setBottomVisible(false), 2000);
  };

  return (
    <>
      <View style={styles.container}>
        <Header title="내 쿠폰" onBackPress={handleBack} />

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.dropdownArea}>
            <CustomDropdown items={items} value={value} onSelect={(val) => setValue(val)} />
          </View>

          {coupons.map((coupon) => (
            <CouponCard
              key={coupon.id}
              title={coupon.title}
              shopName={coupon.shopName}
              onUse={() => handleUseCoupon(coupon.id)}
            />
          ))}
        </ScrollView>
      </View>
      {bottomVisible && (
        <View style={styles.bottomSheet}>
          <Text style={styles.sheetText}>사용 처리 되었습니다.</Text>
        </View>
      )}
    </>
  );
}
