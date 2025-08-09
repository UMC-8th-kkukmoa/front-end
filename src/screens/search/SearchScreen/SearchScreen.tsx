import React, { useState } from 'react';
import { View, TouchableOpacity, StatusBar, FlatList, Text, ActivityIndicator } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import { searchStoresByName } from '../../../api/search';
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

  const {
    data: results,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['stores', 'search', query],
    queryFn: () => searchStoresByName(query, 0, 20),
    enabled: query.trim().length > 0,
  });

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

      {/* 검색 결과가 들어갈 영역 */}
      <View style={styles.body}>
        {isLoading && <ActivityIndicator size="large" />}
        {isError && <Text style={{ color: 'red' }}>검색 중 오류가 발생했습니다.</Text>}

        {!isLoading && !isError && results && results.length > 0 && (
          <FlatList
            data={results}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  paddingVertical: 12,
                  borderBottomWidth: 1,
                  borderColor: '#eee',
                }}
                onPress={() => {
                  // 가게 상세 페이지 이동
                  router.push(`/store/${item.id}`);
                }}
              >
                <Text style={{ fontSize: 16 }}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        )}

        {!isLoading && !isError && query.trim().length > 0 && results?.length === 0 && (
          <Text style={{ textAlign: 'center', color: '#888', marginTop: 20 }}>
            검색 결과가 없습니다.
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
}
