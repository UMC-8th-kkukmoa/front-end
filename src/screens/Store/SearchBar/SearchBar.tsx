import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import styles from './SearchBar.style';
import SearchBarSvg from '../../../assets/images/search-bar.svg';

function SearchBar() {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.wrapper}
      activeOpacity={0.8}
      onPress={() => router.push('/store/search?from=stores')}
    >
      <SearchBarSvg />
    </TouchableOpacity>
  );
}

export default SearchBar;
