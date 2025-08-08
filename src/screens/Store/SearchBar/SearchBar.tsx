import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import styles from './SearchBar.style';
import SearchIcon from '../../../assets/images/search-icon.svg';
import KkTextbox from '../../../design/component/KkTextbox';

function SearchBar() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.wrapper}
      activeOpacity={0.8}
      onPress={() => router.push('/store/search?from=stores')}
    >
      <View style={styles.searchBar}>
        <KkTextbox
          label=""
          placeholder="매장을 검색해보세요."
          type="text"
          size="small"
          variant="primary"
          enabled
          error={false}
          value={query}
          onChangeText={setQuery}
          style={styles.textBox}
          editable={false}
        />

        <View style={styles.iconWrapper}>
          <SearchIcon style={{ margin: 5 }} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default SearchBar;
