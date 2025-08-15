import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Header from '../../design/component/Header';
import colors from '../../design/colors';

import QrIcon from '../../assets/images/qr-icon.svg';
import StampIcon from '../../assets/images/stamp-icon.svg';
import StoreIcon from '../../assets/images/store-icon.svg';
import DollarIcon from '../../assets/images/dollar-icon.svg';
import BellIcon from '../../assets/images/bell-icon.svg';
import GuideIcon from '../../assets/images/guide-icon.svg';

const menuItems = [
  { id: 1, title: 'QR 스캔', icon: QrIcon, route: '/owner/VoucherPayment' },
  { id: 2, title: '스탬프 QR코드', icon: StampIcon, route: '/owner/OwnerStampQR' },
  { id: 3, title: '매장관리', icon: StoreIcon, route: '/store' },
  { id: 4, title: '가게매출', icon: DollarIcon, route: '/sales' },
  { id: 5, title: '알림설정', icon: BellIcon, route: '/alarm-settings' },
  { id: 6, title: '가이드', icon: GuideIcon, route: '/guide' },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light.white,
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 30,
  },
  card: {
    width: 140,
    height: 135,
    backgroundColor: colors.light.white,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardText: {
    marginTop: 12,
    fontSize: 14,
    fontFamily: 'Pretendard-Regular',
    color: colors.light.black,
  },
});

export default function DashboardScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.container}>
        {/* eslint-disable-next-line react/style-prop-object */}
        <StatusBar style="dark" />
        <Header title="대시보드" onBackPress={() => router.back()} shadow />

        <View style={styles.content}>
          <View style={styles.grid}>
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <TouchableOpacity
                  key={item.id}
                  style={styles.card}
                  activeOpacity={0.8}
                  onPress={() => router.push(item.route)}
                >
                  <IconComponent width={40} height={40} />
                  <Text style={styles.cardText}>{item.title}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
