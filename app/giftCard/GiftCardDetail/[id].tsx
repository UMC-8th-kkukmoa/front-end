import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import GiftCardDetail from '../../../src/screens/GiftCard/GiftCardDetail';

export default function GiftCardDetailPage() {
  const { id } = useLocalSearchParams();

  return <GiftCardDetail id={id} />;
}
