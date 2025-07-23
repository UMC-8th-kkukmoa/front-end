import React, { useState } from 'react';
import { View, TouchableOpacity, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import KkLoginTextbox from '../../../design/component/KkLoginTextbox';
import SearchIcon from '../../../assets/images/search-icon.svg';
import BackIcon from '../../../assets/images/left-arrow.svg';
import styles from './SearchScreen.style';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => router.replace('/(tabs)/stores')}
          style={styles.backButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <BackIcon />
        </TouchableOpacity>

        <View style={styles.searchWrapper}>
          <KkLoginTextbox
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
          />
          <TouchableOpacity style={styles.iconWrapper}>
            <SearchIcon />
          </TouchableOpacity>
        </View>
      </View>

      {/* 검색 결과가 들어갈 영역 */}
      <View style={styles.body} />
    </SafeAreaView>
  );
}
