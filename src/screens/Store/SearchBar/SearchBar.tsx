import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import styles from './SearchBar.style';
import SearchIcon from '../../../assets/images/search-icon.svg';

function SearchBar() {
  const router = useRouter();

  return (
    <View style={styles.searchBarContainer}>
      <TouchableOpacity
        style={styles.searchTouchable}
        activeOpacity={0.8}
        onPress={() => router.push('/store/search?from=stores')}
      >
        <Text style={styles.searchPlaceholder}>매장을 검색해보세요.</Text>
        <SearchIcon />
      </TouchableOpacity>
    </View>
  );
}

export default SearchBar;
