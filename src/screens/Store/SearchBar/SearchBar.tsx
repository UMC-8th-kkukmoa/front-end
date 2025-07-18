import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import KkLoginTextbox from '../../../design/component/KkLoginTextbox';
import styles from './SearchBar.style';
import SearchIcon from '../../../assets/images/store/search-icon.svg';

function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View style={styles.wrapper}>
      <KkLoginTextbox
        label=""
        placeholder="매장을 검색해보세요."
        type="text"
        size="searchbar"
        variant="primary"
        enabled
        error={false}
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.searchBar}
      />
      <TouchableOpacity
        style={styles.iconWrapper}
        activeOpacity={0.5}
        hitSlop={{ top: 20, bottom: 20, left: 10, right: 20 }}
      >
        <SearchIcon />
      </TouchableOpacity>
    </View>
  );
}

export default SearchBar;
