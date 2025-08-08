import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, ScrollView, Alert, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import * as Keychain from 'react-native-keychain';
import axios from 'axios';
import Header from '../../design/component/Header';
import StampBoard from './StampBoard';
import StampCompleteModal from './StampCompleteModal';
import KkDropdown from '../../design/component/KkDropdown';
import colors from '../../design/colors';
import { categoryData } from '../Store/CategoryTabs/CategoryTabs';
import { Stamp, ShopStampData, StampApiResponse } from '../../types/stamp';

const TOTAL_STAMPS = 10;

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
    paddingBottom: 40,
  },
  stampBoardWrapper: {
    paddingHorizontal: 10,
    alignItems: 'center',
  },
});

export default function StampListScreen() {
  const router = useRouter();

  const [value, setValue] = useState<string | null>(null);
  const [stampBoards, setStampBoards] = useState<ShopStampData[]>([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleBack = () => {
    router.push('(tabs)/profile');
  };

  const showError = (message: string) => {
    Alert.alert('오류', message);
  };

  const fetchStamps = useCallback(async (storeType?: string | null) => {
    setLoading(true);
    try {
      const credentials = await Keychain.getGenericPassword({
        service: 'com.kkukmoa.accessToken',
      });

      if (!credentials) {
        Alert.alert('알림', '로그인이 필요합니다.');
        return;
      }

      const token = credentials.password;

      const API_BASE_URL = process.env.EXPO_PUBLIC_BASE_URL || 'https://kkukmoa.shop';
      const url =
        storeType && storeType.trim() !== ''
          ? `${API_BASE_URL}/v1/stamps?store-type=${storeType}`
          : `${API_BASE_URL}/v1/stamps`;

      const response = await axios.get<StampApiResponse>(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });

      const { data } = response;

      if (!data.isSuccess || !data.result || !Array.isArray(data.result.stamps)) {
        showError(data.message || '데이터를 불러오는데 실패했습니다.');
        setStampBoards([]);
        return;
      }

      const shopMap: Record<string, Stamp[]> = {};

      data.result.stamps.forEach((stamp) => {
        if (!shopMap[stamp.store_name]) {
          shopMap[stamp.store_name] = [];
        }
        shopMap[stamp.store_name].push({
          id: stamp.id,
          isStamped: stamp.stamp_score > 0,
        });
      });

      const newStampBoards: ShopStampData[] = Object.entries(shopMap).map(([shopName, stamps]) => {
        const stampedCount = stamps.filter((s) => s.isStamped).length;
        const arr: Stamp[] = Array.from({ length: TOTAL_STAMPS }, (_, i) => ({
          id: i + 1,
          isStamped: i < stampedCount,
        }));

        return {
          shopName,
          stamps: arr,
        };
      });

      setStampBoards(newStampBoards);

      const hasCompletedShop = newStampBoards.some((shop) =>
        shop.stamps.every((stamp) => stamp.isStamped),
      );
      setModalVisible(hasCompletedShop);
    } catch (error: any) {
      showError(error?.message || '알 수 없는 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStamps(value);
  }, [value, fetchStamps]);

  const renderContent = () => {
    if (loading) {
      return (
        <View style={{ alignItems: 'center', marginTop: 40 }}>
          <Text>로딩 중...</Text>
        </View>
      );
    }

    if (stampBoards.length === 0 || stampBoards.every((shop) => shop.stamps.length === 0)) {
      return (
        <View style={{ alignItems: 'center', marginTop: 30 }}>
          <Text>등록된 스탬프가 없습니다.</Text>
        </View>
      );
    }

    return stampBoards.map((shop) => (
      <View key={shop.shopName} style={styles.stampBoardWrapper}>
        <StampBoard shopName={shop.shopName} stamps={shop.stamps} />
      </View>
    ));
  };

  const items = categoryData.map((cat) => ({
    label: cat.name,
    value: cat.value,
    icon: cat.icon,
  }));

  return (
    <>
      <SafeAreaView style={styles.container} edges={['top']}>
        {/* eslint-disable-next-line react/style-prop-object */}
        <StatusBar style="dark" />
        <View style={styles.headerContainer}>
          <Header title="스탬프" onBackPress={handleBack} shadow={false} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.dropdownArea}>
            <KkDropdown items={items} value={value} onSelect={(val) => setValue(val)} />
          </View>
          {renderContent()}
        </ScrollView>
      </SafeAreaView>

      <StampCompleteModal visible={isModalVisible} onClose={() => setModalVisible(false)} />
    </>
  );
}
