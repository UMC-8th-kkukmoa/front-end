import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text, Image } from 'react-native';
import Header from '../../design/component/Header';
import StampBoard from './StampBoard';
import StampCompleteModal from './StampCompleteModal';
import CustomDropdown from '../../design/component/KkDropdown';
import colors from '../../design/colors';

type Stamp = {
  id: number;
  isStamped: boolean;
};

type ShopStampData = {
  shopName: string;
  stamps: Stamp[];
};

const presentIcon = require('../../assets/images/present_icon.png');

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
  stampBoardWrapper: {
    paddingHorizontal: 10,
  },
  fixedButton: {
    position: 'absolute',
    bottom: 30,
    left: '50%',
    transform: [{ translateX: -60 }],
    backgroundColor: colors.light.black,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
    elevation: 5,
  },
  buttonText: {
    color: colors.light.white,
    fontSize: 16,
    fontFamily: 'Pretendard-Medium',
  },
  icon: {
    width: 18,
    height: 18,
    marginRight: 8,
    resizeMode: 'contain',
  },
});

export default function StampListScreen() {
  const [value, setValue] = useState<string | null>(null);
  const [items] = useState([
    { label: '음식점', value: 'optionA' },
    { label: '카페', value: 'optionB' },
    { label: '서점', value: 'optionC' },
  ]);

  const [isModalVisible, setModalVisible] = useState(false);

  const handleBack = () => {
    /* eslint-disable no-console */
    console.log('뒤로가기 눌림');
    /* eslint-enable no-console */
  };

  const dummyStampBoards: ShopStampData[] = [
    {
      shopName: '서울카츠',
      stamps: Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        isStamped: i < 10,
      })),
    },
    {
      shopName: '닭한마리 공릉본점',
      stamps: Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        isStamped: i < 5,
      })),
    },
    {
      shopName: '포카포카',
      stamps: Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        isStamped: i < 1,
      })),
    },
    {
      shopName: '후라토 식당',
      stamps: Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        isStamped: i < 7,
      })),
    },
    {
      shopName: '카멜로연남',
      stamps: Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        isStamped: i < 4,
      })),
    },
  ];

  useEffect(() => {
    const hasCompletedShop = dummyStampBoards.some((shop: ShopStampData) =>
      shop.stamps.every((stamp: Stamp) => stamp.isStamped),
    );

    if (hasCompletedShop) {
      setModalVisible(true);
    }
  }, []);

  return (
    <>
      <View style={styles.container}>
        <Header title="스탬프" onBackPress={handleBack} />

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.dropdownArea}>
            <CustomDropdown items={items} value={value} onSelect={(val) => setValue(val)} />
          </View>

          {dummyStampBoards.map((shop) => (
            <View key={shop.shopName} style={styles.stampBoardWrapper}>
              <StampBoard shopName={shop.shopName} stamps={shop.stamps} />
            </View>
          ))}
        </ScrollView>

        <View style={styles.fixedButton}>
          <Image source={presentIcon} style={styles.icon} />
          <Text style={styles.buttonText}>교환하기</Text>
        </View>
      </View>

      <StampCompleteModal visible={isModalVisible} onClose={() => setModalVisible(false)} />
    </>
  );
}
