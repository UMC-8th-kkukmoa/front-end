import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Modal } from 'react-native';
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
  { id: 1, title: 'QR 스캔', icon: QrIcon, route: '/owner/OwnerQRScan' },
  { id: 2, title: '스탬프 QR코드', icon: StampIcon, route: '/owner/OwnerStampQR' },
  { id: 3, title: '매장관리', icon: StoreIcon, route: null },
  { id: 4, title: '가게매출', icon: DollarIcon, route: null },
  { id: 5, title: '알림설정', icon: BellIcon, route: null },
  { id: 6, title: '가이드', icon: GuideIcon, route: null },
];

type MenuItem = {
  id: number;
  title: string;
  icon: React.FC<{ width: number; height: number }>;
  route: string | null;
};

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
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 25,
    alignItems: 'center',
    maxWidth: '80%',
    width: 'auto',
  },
  modalTitle: {
    fontSize: 16,
    fontFamily: 'Pretendard-Medium',
    marginBottom: 20,
  },
  modalMessage: {
    fontSize: 13,
    fontFamily: 'Pretendard-Medium',
    textAlign: 'center',
    color: colors.light.gray2,
    marginBottom: 25,
  },
  modalButton: {
    alignSelf: 'stretch',
    backgroundColor: colors.light.main,
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 5,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default function DashboardScreen() {
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  const handlePress = (item: MenuItem) => {
    if (!item.route) {
      setVisible(true);
      return;
    }
    router.push(item.route);
  };

  return (
    <>
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.container}>
          {/* eslint-disable-next-line react/style-prop-object */}
          <StatusBar style="dark" />
          <Header title="대시보드" onBackPress={() => router.replace('/')} shadow />

          <View style={styles.content}>
            <View style={styles.grid}>
              {menuItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <TouchableOpacity
                    key={item.id}
                    style={styles.card}
                    activeOpacity={0.8}
                    onPress={() => handlePress(item)}
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

      <Modal
        transparent
        visible={visible}
        animationType="fade"
        onRequestClose={() => setVisible(false)}
        statusBarTranslucent
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>준비 중인 서비스</Text>
            <Text style={styles.modalMessage}>해당 기능은 곧 업데이트될 예정입니다.</Text>
            <TouchableOpacity onPress={() => setVisible(false)} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>확인</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}
