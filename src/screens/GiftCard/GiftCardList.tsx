import React from 'react';
import { View, StyleSheet, Text, ScrollView, Pressable, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Header from '../../design/component/Header';
import colors from '../../design/colors';

import giftcard1 from '../../assets/images/giftcard1.png';
import giftcard3 from '../../assets/images/giftcard3.png';
import giftcard5 from '../../assets/images/giftcard5.png';
import giftcard10 from '../../assets/images/giftcard10.png';

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
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 17,
    paddingTop: 22,
  },
  card: {
    flexBasis: '48%',
    marginBottom: 24,
    alignItems: 'center',
  },
  cardImage: {
    width: 165,
    height: 99,
    aspectRatio: 16 / 9,
    resizeMode: 'contain',
  },
  textContainer: {
    width: '100%',
    paddingHorizontal: 10,
    marginTop: 8,
    alignItems: 'flex-start',
  },
  cardTitle: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 10,
    color: colors.light.black,
  },
  cardPrice: {
    marginTop: 2,
    fontFamily: 'Pretendard-Bold',
    fontSize: 15,
    color: colors.light.main,
  },
});

interface GiftCard {
  id: number;
  title: string;
  price: string;
  image: any;
}

const giftCards: GiftCard[] = [
  { id: 1, title: '꾹모아 금액권 1만원권', price: '10,000원', image: giftcard1 },
  { id: 2, title: '꾹모아 금액권 3만원권', price: '30,000원', image: giftcard3 },
  { id: 3, title: '꾹모아 금액권 5만원권', price: '50,000원', image: giftcard5 },
  { id: 4, title: '꾹모아 금액권 10만원권', price: '100,000원', image: giftcard10 },
];

export default function GiftCardListScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* eslint-disable-next-line react/style-prop-object */}
      <StatusBar style="dark" />
      <View style={styles.headerContainer}>
        <Header title="금액권 구매" onBackPress={() => router.push('/')} shadow={false} />
      </View>
      <ScrollView contentContainerStyle={styles.gridContainer} showsVerticalScrollIndicator={false}>
        {giftCards.map((item) => (
          <Pressable
            key={item.id}
            style={styles.card}
            onPress={() => router.push(`/giftCard/GiftCardDetail/${item.id}`)}
          >
            <Image source={item.image} style={styles.cardImage} />
            <View style={styles.textContainer}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardPrice}>{item.price}</Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
