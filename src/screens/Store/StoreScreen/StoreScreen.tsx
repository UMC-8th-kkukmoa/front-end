import React, { useState } from 'react';
import { View } from 'react-native';
import styles from './StoreScreen.style';
import StoreBottomSheet from '../StoreBottomSheet/StoreBottomSheet';
import SearchBar from '../SearchBar/SearchBar';
import CategoryTabs from '../CategoryTabs/CategoryTabs';
import MapFloatingButtons from '../MapFloatingButtons/MapFloatingButtons';

function Store() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null); // 중앙 카테고리 관리

  return (
    <View style={styles.container}>
      <View style={styles.mapArea}>
        {/* 지도 컴포넌트 삽입 예정 */}
        <MapFloatingButtons />
      </View>

      <View style={styles.headerArea}>
        <SearchBar />
        <CategoryTabs selected={selectedCategory} onSelect={setSelectedCategory} />
      </View>

      <StoreBottomSheet selectedCategory={selectedCategory} />
    </View>
  );
}

export default Store;
