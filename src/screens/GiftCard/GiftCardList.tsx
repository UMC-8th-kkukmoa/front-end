import React from 'react';
import { View, StyleSheet, FlatList, Text, Dimensions, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import Header from '../../design/component/Header';
import colors from '../../design/colors';

import Giftcard1 from '../../assets/images/giftcard1.svg';
import Giftcard3 from '../../assets/images/giftcard3.svg';
import Giftcard5 from '../../assets/images/giftcard5.svg';
import Giftcard10 from '../../assets/images/giftcard10.svg';

const { width } = Dimensions.get('window');
const CARD_MARGIN = 17;
const CARD_GAP = 12;
const CARD_WIDTH = (width - CARD_MARGIN * 2 - CARD_GAP) / 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light.white,
  },
  card: {
    width: CARD_WIDTH,
    marginBottom: 24,
    alignItems: 'center',
  },
  cardSvg: {
    width: '100%',
    aspectRatio: 16 / 9,
  },
  textContainer: {
    width: '100%',
    paddingHorizontal: 16,
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
  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: CARD_MARGIN,
  },
  listContent: {
    paddingTop: 22,
  },
});

const giftCards = [
  { id: 1, title: '꾹모아 금액권 1만원권', price: '10,000원' },
  { id: 2, title: '꾹모아 금액권 3만원권', price: '30,000원' },
  { id: 3, title: '꾹모아 금액권 5만원권', price: '50,000원' },
  { id: 4, title: '꾹모아 금액권 10만원권', price: '100,000원' },
];

const renderSvg = (id) => {
  switch (id) {
    case 1:
      return <Giftcard1 style={styles.cardSvg} />;
    case 2:
      return <Giftcard3 style={styles.cardSvg} />;
    case 3:
      return <Giftcard5 style={styles.cardSvg} />;
    case 4:
      return <Giftcard10 style={styles.cardSvg} />;
    default:
      return null;
  }
};

export default function GiftCardListScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Header title="금액권 구매" onBackPress={() => router.back()} />
      <FlatList
        data={giftCards}
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() => router.push(`/giftCard/GiftCardDetail/${item.id}`)}
          >
            {renderSvg(item.id)}
            <View style={styles.textContainer}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardPrice}>{item.price}</Text>
            </View>
          </Pressable>
        )}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
