import React, { useState } from 'react';
import { View, TouchableOpacity, StatusBar } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import KkTextbox from '../../../design/component/KkTextbox';
import SearchIcon from '../../../assets/images/search-icon.svg';
import BackIcon from '../../../assets/images/left-arrow.svg';
import styles from './SearchScreen.style';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const router = useRouter();
  const { from } = useLocalSearchParams();

  const handleBack = () => {
    if (from === 'stores') {
      router.replace('/(tabs)/stores');
    } else {
      router.back();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={handleBack}
          style={styles.backButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <BackIcon />
        </TouchableOpacity>

        <View style={styles.searchWrapper}>
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
          />

          <TouchableOpacity style={styles.iconWrapper}>
            <SearchIcon style={{ margin: 5 }} />
          </TouchableOpacity>
        </View>
      </View>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 0.4 }}
        colors={['rgba(108, 49, 49, 0.08)', 'rgba(0,0,0,0)']}
        style={[styles.bottomShadow]}
      />
      {/* 검색 결과가 들어갈 영역 */}
      <View style={styles.body} />
    </SafeAreaView>
  );
}
