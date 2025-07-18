import React from 'react';
import { View } from 'react-native';
import styles from './StoreScreen.style';
import StoreBottomSheet from '../StoreBottomSheet/StoreBottomSheet';
import SearchBar from '../SearchBar/SearchBar';
import CategoryTabs from '../CategoryTabs/CategoryTabs';

function Store() {
  return (
    <View style={styles.container}>
      <View style={styles.mapArea}>{/* 지도 컴포넌트 삽입 예정 */}</View>

      <View style={styles.headerArea}>
        <SearchBar />
        <CategoryTabs />
      </View>

      <StoreBottomSheet />
    </View>
  );
}

export default Store;
