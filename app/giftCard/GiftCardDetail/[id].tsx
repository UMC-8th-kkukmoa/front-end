import React from 'react';
import { Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import GiftCardDetail from '../../../src/screens/GiftCard/GiftCardDetail';

export default function GiftCardDetailPage() {
  const { id } = useLocalSearchParams();

  if (!id || Array.isArray(id)) {
    return <Text>잘못된 상품 ID입니다.</Text>;
  }

  return <GiftCardDetail id={id} />;
}
